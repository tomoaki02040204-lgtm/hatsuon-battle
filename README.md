# Pronunciation Battle / 発音バトル

Static edition for GitHub Pages, extracted from the uploaded Replit project.

## Files
- index.html: app interface
- app.js: bilingual word game, speech recognition, scoring and language switching
- style.css: design
- favicon.svg: icon

The bilingual three-step guide was added to the start screen.

## Publish
Upload the four application files to the root of a GitHub repository. In Settings > Pages, select Deploy from a branch, main, /(root). Wait for deployment and open the Pages URL.

## Notes
- Speech recognition requires browser support, microphone permission and a secure HTTPS context. iOS Safari and other browsers can differ; test on the target iPhone.
- Recognition compares recognized text to the expected word; it is NOT a phonetic/IPA-based pronunciation quality assessment.
- This static package excludes Replit server, database, Git history and agent notes.
- No comprehensive secrets audit or live browser test has been performed.
