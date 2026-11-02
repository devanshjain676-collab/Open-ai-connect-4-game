# FOUR — The Ultimate Connect 4 Experience

A complete, dependency-free browser Connect 4 game. This is a static Site: no account, paid API, analytics, external font, image download, or backend is required to play locally.

## Play

Choose **Local 1v1** for two people on one device, or **Play vs computer** for Easy, Medium, or Hard. Set names, swap colors, choose a match format, and start. Click or tap a column; with keyboard focus on the board, use Left/Right and Enter/Space. Escape pauses or closes a dialog.

Online 1v1 is visibly unavailable. No multiplayer backend is configured; no rooms, players, or synchronization are simulated. Optional background music is not included. Original sound effects use the Web Audio API and begin only after a user gesture.

## Precise rules and state

- Seven columns, six rows; gravity; horizontal, vertical, and both diagonal wins.
- All completed four-cell windows are highlighted. Overlapping or multiple winning lines award just one win.
- A win is checked before a full-board draw, including the 42nd move.
- A single match ends after one round, including a tied round. Best-of-3/5/7 requires 2/3/4 wins. First-to-10 requires 10 wins. Draws never contribute a win or use a decisive round in a series.
- Starting seats alternate after every completed round when enabled, including draws. Restarting an unfinished round retains its opener and round number.
- New round preserves series scores. Restart match creates a new match with zero series scores. Prior completed rounds remain in device statistics; incomplete matches do not count as completed matches.
- Unlimited undo is available only within the current round, including its terminal move. It reverses affected win, draw, match-completion and statistics records. In computer mode, it removes the latest human move plus the computer response when present. An opening computer move alone cannot be undone.
- Moves are committed synchronously. A separate animation lock prevents duplicate inputs; cancellable animation and worker epochs prevent stale callbacks after reset. Pause suspends the animation and stops AI work until resumed.
- The board is an SVG with masked circular openings. Disc animations run behind the face; previews, rings and winning lines are distinct layers.

## Computer opponents

Easy uses mostly random legal moves with occasional tactical wins/blocks. Medium takes immediate wins, blocks immediate losses, and searches four plies with occasional close-score alternatives. Hard uses iterative-deepening minimax with alpha-beta pruning, center-first move ordering, transposition caching, playable threats and multi-threat evaluation, up to nine plies within a roughly 620 ms search budget. Search runs in a module Web Worker. Browser environments without workers receive a disclosed, shallow main-thread fallback. Hard is not advertised as unbeatable.

## Persistence and accessibility

Player preferences, settings, the current match and an idempotent completed-round event ledger are saved locally. Saved matches are reconstructed by replaying legal moves, rejecting impossible, corrupt, duplicate or post-terminal data. Storage failures fall back to memory and display a notice. Statistics belong to the current browser/device, not a person or cloud account.

Three themes, volume/mute, animation speed, move previews, optional winning lines, restart confirmation, high contrast, disc symbols, reduced motion, keyboard controls, live move announcements and focus-trapped dialogs are included. Red discs use a dot; yellow discs use a diamond. The browser's reduced-motion preference is respected by default.

## Source

- `dist/engine.js`: pure rules, series, undo, replay validation and statistics.
- `dist/ai.js`, `dist/ai-worker.js`: search and off-thread execution.
- `dist/board.js`: SVG board, disc material and icons.
- `dist/app.js`: screens, input, dialogs, animation coordination and lifecycle.
- `dist/audio.js`: original synthesized effects.
- `dist/storage.js`: persistence and validation.
- `dist/style.css`: responsive appearance and motion.

Serve `dist` with any local static HTTP server (ES modules and workers require HTTP). Run `npm test` or `node --test tests/*.test.js`; no dependency installation is needed.

## Verification

35 automated tests cover wins in all directions, full columns, draws, a last-cell win, multiple lines, undo, all match formats, alternating starts, score/statistics reversal, saved-state validation, AI tactics/legality, and 200 random-game invariant checks. Browser QA covered local play, a winning result, undoing a win, round advancement, refresh/resume, pause during a drop, double-click protection, keyboard input, restart during a drop, hard AI with swapped colors, computer undo, settings and responsive phone/tablet layouts. No application console errors were observed.
