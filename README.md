# Enigma Vault — Hugo

Migration of the hand-built static export (`Enigma Website 2 (4).zip`) to Hugo.
Plan: `~/Desktop/enigma-hugo-migration-plan.md`.

    hugo server        # dev
    hugo --gc --minify # production build into public/

## Layout

    data/nav.yml       nav model, ported from the old site-nav.js NAV array
    data/footer.yml    footer model, ported from site-footer.js
    layouts/baseof.html + partials/   the shell every page shares
    assets/css/        tokens/, global.css (was nopii.css), nav.css, footer.css,
                       pages/<page>.css for page-scoped blocks
    assets/js/         nav.js, pages/<page>.js
    scripts/port_page.py   ports one old .html page into content/ + assets/

## Migration status

- [x] Phase 1 — shell, nav, footer
- [ ] Phase 2 — CSS + image pipeline
- [ ] Phase 3 — 28 static pages
- [ ] Phase 4 — homepage de-React
- [ ] Phase 5 — blog
- [ ] Phase 6 — SEO + redirects
- [ ] Phase 7 — verification + cutover
