# Demo runbook

Three minutes, 3:00–6:00. Slide 4 is the cover for switching to the rehearsed dashboard. Its bundled fallback is labeled recorded/simulated. Do not remove that label from the fallback.

## Before the talk

- At the 9:30 AM AV check, open the local deck, test fullscreen, HDMI scaling, fonts, video playback and PDF fallback. Charge the laptop. Disable notifications. Keep notes off the projected display.
- Establish which dashboard is connected to the authorized demo environment. The current frontend dashboard is explicitly simulated; its synthetic events cannot prove a live backend operation.
- Rehearse only the approved environment and operations. This repository does not grant live write or delete authorization. No real delete is needed to show escalation or refusal.
- Prepare visible evidence for allowlisted read, snapshot attempted/outcome, snapshot_present read-back, pending approval bound to target, and unsupported tool upstream count. Hide credentials and identifying infrastructure details.
- If using an API audit bundle, verify signing is enabled and retain the correct public key. Use a synthetic/redacted export appropriate to the audience, with a trusted retained chain head if demonstrating completeness. The bundled film’s local ledger and the API tenant audit bundle are distinct surfaces.

## Three beats

**3:00–3:35 — Read.** Show an allowlisted read and that it adds no proxy governance-ledger entry. Say: “This allowlisted read passes through.” Do not generalize this into “all reads are free” or “nothing anywhere is logged.”

**3:35–4:30 — Reversible write.** Show create_snapshot. Point to execution_attempted before execution, then the completed outcome, then independent snapshot_present read-back. Say: “The attempt is recorded before execution. A separate read checks the result.”

**4:30–5:35 — Delete boundary.** Show pending_approval. Explain that approval for app_data is not authority for scratch. Then show delete_lun refused with zero upstream calls. The refusal can still have a local record. Do not resolve a live destructive approval.

**5:35–6:00 — Record.** Return to the audit entries, then move to slide 5 at six minutes.

## Offline fallback

If a live handoff stalls, say: “I’ll use the recorded run against simulated ONTAP so we can inspect the same decisions.” Return to slide 4 and play the existing 30-second film once. It begins with the delete, marks snapshot as earlier in the run, shows scoped approval and refusal, then tamper detection. Pause as needed to explain the three beats. The film has no spoken narration and requires no network.

Verified historical source values in frontend `scripts/video/data.js`: reads_ledger = 0; snapshot.status = completed; snapshot.verified.snapshot_present = true; delete_pending.status = pending_approval; scratch_pending.status = pending_approval; refused.status = refused; refused_upstream = 0; chain_entries = 10; edited = “REFUSED: entry 0's hash does not match its content”. These are historical simulated-run values, not measurements from the talk laptop today. No raw database name or approval identifier needs to be shown.

The original outline mentioned a 90-second October 3 capture. The located reusable film is 30 seconds. No 90-second capture was verified.
