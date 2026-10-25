# Source provenance and claim boundaries

Research date: October 20, 2026. Existing sources were read without modification.

Visual identity, film, poster, logo and fonts come from the public, Apache-2.0 repository arf-foundation/arf-frontend at commit 14519ce59d96620cd624459ccc71b633cf35124d. Each slide's claims were checked against ARF's private source before publication. That evidence is kept in ARF's private records, not in this public repository.

## Assets reused

- `assets/arf-icon.png`: frontend `public/arf-icon.png`, unmodified.
- `assets/governed-run.mp4`: frontend `public/media/arf-how-it-works.mp4`, unmodified.
- `assets/governed-run-poster.png`: frontend `public/media/arf-how-it-works-poster.png`, unmodified.
- Palette/type: frontend `app/globals.css:120` onward and `app/layout.tsx:12`; adapted layout from `scripts/video/index.html`, not the investor deck. Warm canvas #faf9f7, ink #191816, blue #3358e8, purple #7a4be0, dark canvas #0e0d12; green/red/amber decision semantics.
- Latin font subsets: frontend Next build cache `f06bf9da926bae75-s.p.2874ccu1_u7jf.woff2` (Instrument Sans), `9433d1a810498265-s.p.1hij5ex6k3v9q.woff2` (Newsreader italic), `051742360c26797e-s.p.1bkzbscqrt8rl.woff2` (JetBrains Mono). Family mapping verified in generated Next font CSS. OFL notices obtained from google/fonts `ofl/instrumentsans`, `ofl/newsreader`, and `ofl/jetbrainsmono`.
- Browser export approach adapted from frontend `scripts/video/render.mjs`: Playwright with system Edge. The new check renders five slides rather than video frames.

## Claim boundaries

The film is a visualization of an October 3 run against a simulated ONTAP cluster (frontend `scripts/video/data.js`), not a live run. The public dashboard is simulated (frontend `app/dashboard/page.tsx`). The ONTAP demonstration uses configured per-tool risk priors; signatures apply where audit signing is enabled; a valid chain does not prove that nothing was removed from its end.

## Kept out

No investor material, roadmap, pricing, private algorithm source, credentials, raw private logs or new dashboard backend. No new governance engine. No claim that every ARF decision is always signed, that hash chains prove physical truth, or that formal policy checks prove the entire runtime.
