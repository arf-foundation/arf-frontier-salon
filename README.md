# ARF AI at Frontier Salon

Five slides for Juan Petter’s seven-minute talk, October 27, 2026, Fabrik Tribeca. Submission target: October 24. Separate repository; the investor pitch is not a dependency and has not been modified.

Open **index.html** in Edge or Chrome. Everything required to present is local, including fonts and the existing 30-second film. Arrow keys move between slides; F toggles fullscreen; N shows notes **on the same screen**. Close notes before projecting. The small bottom control bar becomes visible on hover or keyboard focus. You can also open **output/frontier-salon.pdf** for submission; the PDF uses a still on slide 4, so keep the HTML and assets for playback.

## Talk

| Slide | Timing | Purpose |
|---|---|---|
| 1 | 0:00–0:30 | Runtime action governance |
| 2 | 0:30–1:30 | Production write boundary |
| 3 | 1:30–3:00 | Approve / deny / escalate |
| 4 | 3:00–6:00 | Governed run and demo handoff |
| 5 | 6:00–7:00 | Independently verifiable record |

The timed script is in **speaker-notes.md** and the deck’s Notes view. **demo-runbook.md** provides live handoff and fallback cues. The included film is a visualization of an October 3 run against a **simulated ONTAP cluster**, sourced from the existing frontend. It is not a new live run. The current public dashboard also uses synthetic data. A real connected dashboard must be rehearsed separately before presenting it as live. No infrastructure was mutated to make this deck.

## Reuse and evidence

See **provenance.md** for reused public assets and claim boundaries, and **licenses/** for notices. Reuses the production frontend’s palette, type, logo, poster and film. No private implementation, raw logs, credentials, analytics, backend or investor material is bundled. New presentation material remains reserved to ARF AI; existing third-party licenses retain their scope. This repository and its GitHub Pages site are public; source-level evidence for the deck's claims is kept in ARF's private records, not here.

## Validate and export

Viewing requires no installation. For development, install the pinned `playwright-core` development dependency with `npm install`, with system Microsoft Edge installed, then run `npm run check`. On this workspace the check can reuse the existing frontend dependency through `ARF_PLAYWRIGHT_PATH`, pointing to its `node_modules/playwright-core` directory. The check opens the deck offline, checks all five slides for clipping, tests navigation and notes, checks media metadata and font loading, saves private screenshots under `.build/`, and exports the five-page PDF. It never calls an ARF backend.

Browser printing also produces the deck: choose Save as PDF with background graphics enabled and no headers/footers. The supplied PDF was exported with the repository check script.
