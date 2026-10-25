import fs from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const source=await fs.readFile(new URL('talk.js',root),'utf8');
const notes=vm.runInNewContext(source.split('const slides =')[0]+'\nnotes;');
const titles=['Governing agent actions at runtime','Agents with write access','Approve / deny / escalate','A governed run','A record you can verify'];
await fs.writeFile(new URL('speaker-notes.md',root),'# Frontier Salon · timed speaker notes\n\nJuan Petter, ARF AI · October 27, 2026 · Fabrik Tribeca\n\n'+notes.map(([time,text],i)=>`## Slide ${i+1} — ${titles[i]}\n\n${time}\n\n${text.replaceAll('\n','\n\n')}\n`).join('\n'));
