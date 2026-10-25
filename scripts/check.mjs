// Browser capture/export pattern reused from arf-frontend/scripts/video/render.mjs.
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.ARF_PLAYWRIGHT_PATH||'playwright-core');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await fs.mkdir(path.join(root,'.build'),{recursive:true});
await fs.mkdir(path.join(root,'output'),{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 const errors=[];const external=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.route(/^https?:/,route=>{external.push(route.request().url());return route.abort();});
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('.slide').count(),5);
 for(let i=0;i<5;i++){
   await page.evaluate(i=>show(i),i);
   const bounds=await page.locator('.slide.active').evaluate(s=>{
     const b=s.getBoundingClientRect();
     return [...s.querySelectorAll('h1,h2,h3,p,footer,header,.decision,.demo-beats')].filter(e=>{
       const r=e.getBoundingClientRect();return r.width&&r.height&&(r.left<b.left-1||r.right>b.right+1||r.top<b.top-1||r.bottom>b.bottom+1);
     }).map(e=>e.textContent);
   });
   assert.deepEqual(bounds,[],`Clipped slide ${i+1}`);
   await page.screenshot({path:path.join(root,'.build',`slide-${i+1}.png`)});
 }
 await page.evaluate(()=>show(0));await page.keyboard.press('ArrowRight');
 assert.equal(await page.locator('#counter').textContent(),'2 / 5');
 await page.keyboard.press('End');assert.equal(await page.locator('#counter').textContent(),'5 / 5');
 await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#counter').textContent(),'5 / 5');
 await page.keyboard.press('Home');await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#counter').textContent(),'1 / 5');
 await page.keyboard.press('n');assert.equal(await page.locator('#notes').isVisible(),true);
 await page.keyboard.press('n');assert.equal(await page.locator('#notes').isVisible(),false);
 await page.evaluate(()=>show(3));
 await page.waitForFunction(()=>document.querySelector('video').readyState>=1);
 const duration=await page.locator('video').evaluate(v=>v.duration);
 assert.ok(duration>=29&&duration<=31,`Unexpected recording duration ${duration}`);
 await page.locator('video').evaluate(async v=>{v.muted=true;await v.play();});
 await page.waitForFunction(()=>document.querySelector('video').currentTime>0);
 await page.evaluate(()=>show(4));assert.equal(await page.locator('video').evaluate(v=>v.paused),true);
 const fonts=await page.evaluate(()=>['Instrument Sans','Newsreader','JetBrains Mono'].map(f=>[f,document.fonts.check(`${f==='Newsreader'?'italic ':''}24px "${f}"`)]));
 assert.ok(fonts.every(([,loaded])=>loaded),`Font load ${JSON.stringify(fonts)}`);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[],'Unexpected network dependency');
 await page.pdf({path:path.join(root,'output','frontier-salon.pdf'),printBackground:true,preferCSSPageSize:true});
 await page.setViewportSize({width:1280,height:720});await page.evaluate(()=>show(2));
 await page.screenshot({path:path.join(root,'.build','projector-1280.png')});
 const result={slides:5,offline:true,fonts,duration,navigation:'pass',notes:'pass',mediaPlayback:'pass',mediaPauseOnExit:'pass',clipping:'pass',pageErrors:errors,networkRequests:external};
 await fs.writeFile(path.join(root,'.build','validation.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
