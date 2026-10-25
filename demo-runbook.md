# Demo runbook

Three minutes, 3:00–6:00. Slide 4 covers the switch to a terminal for a live run. The run uses the ARF admission proxy on this laptop in front of a **simulated** ONTAP cluster, so no storage system is touched. The bundled 30-second film is the fallback, labelled recorded/simulated. Do not remove that label.

## Before the talk

- At the 9:30 AM AV check:
  - open the local deck and test fullscreen, HDMI scaling, fonts, video playback and the PDF fallback;
  - charge the laptop and disable notifications;
  - keep notes off the projected display.
- **Rehearse the live run.** Start it with the paced demo command in ARF's private workspace. That command is not in this repository.
  - It prints a line stating the run time, the enterprise revision and that the cluster is simulated.
  - It then shows one scene per Enter. Use a terminal font large enough for the room.
- If the command reports "DEMO FAILED", use the offline fallback below. Do not debug on stage.
- Call it a live run of the proxy against a simulated cluster. Never call it a live ONTAP or production run. In scene 5 the script plays the storage admin, and the approver identity is recorded, not authenticated.
- The demo's ledger is a local, demo-grade file. The record a customer pulls and verifies is the hosted API's audit export, which is a separate surface; slide 5 is about that one.

## Seven scenes, three beats

**3:00–3:20 — Read (scenes 1–2).** The agent sees only the tools ARF has modeled; delete_lun is not even advertised. Show an allowlisted read that adds no ledger entry. Say: "This allowlisted read passes through." Do not generalize this into "all reads are free" or "nothing anywhere is logged."

**3:20–4:00 — Reversible write (scene 3).** create_snapshot shows execution_attempted before the outcome, then snapshot_present from an independent read. Say: "The attempt is recorded before execution. A separate read checks the result."

**4:00–5:10 — Delete boundary (scenes 4–5).**
- delete_volume on app_data waits for an admin, and the approver is told why it cannot be undone.
- The admin approves on a separate channel; the agent has no approve tool.
- The same approval does not delete scratch.
- The retried delete of app_data completes, and a read confirms it.

**5:10–5:30 — Unmodeled tool (scene 6).** delete_lun is refused with zero upstream calls.

**5:30–6:00 — Record (scene 7).** The chain verifies, and an edited entry is refused. A deleted last entry shows only against a head kept outside the file. Move to slide 5 at six minutes.

## Offline fallback

If the live run stalls, say: "I'll use the recorded run against simulated ONTAP so we can inspect the same decisions." Return to slide 4 and play the existing 30-second film once. It begins with the delete, marks the snapshot as earlier in the run, and shows scoped approval and refusal, then tamper detection. Pause as needed to explain the same beats. The film has no spoken narration and needs no network.

Verified historical values in the film's source, frontend `scripts/video/data.js`:
- reads_ledger = 0;
- snapshot.status = completed;
- snapshot.verified.snapshot_present = true;
- delete_pending.status = pending_approval;
- scratch_pending.status = pending_approval;
- refused.status = refused;
- refused_upstream = 0;
- chain_entries = 10;
- edited = "REFUSED: entry 0's hash does not match its content".

These are historical simulated-run values. The live run prints its own values; its ledger has 11 entries because it also completes the approved delete. No raw database name or approval identifier needs to be read out.

The original outline mentioned a 90-second October 3 capture. The reusable film located is 30 seconds. No 90-second capture was verified.
