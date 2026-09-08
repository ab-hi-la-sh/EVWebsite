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
                       per-family sheets, pages/<page>.css for page-scoped blocks
    assets/js/         nav.js, pages/<page>.js
    assets/images/     content images, processed to WebP by Hugo Pipes
    static/assets/     fixed-URL files only: og/, favicons, logo, CSS backgrounds
    layouts/partials/img.html + shortcodes/img.html   responsive <picture>
    scripts/port_page.py   ports one old .html page into content/ + assets/

Content pages are .html, not .md: they are designed markup, and Hugo passes
.html content through verbatim. As markdown, Goldmark treated the indented
HTML after a blank line as a code block and escaped it into visible text.

## Migration status

- [x] Phase 1 — shell, nav, footer
- [x] Phase 2 — CSS + image pipeline
- [x] Phase 3 — 26 static pages (index -> Phase 4, blog -> Phase 5)
- [ ] Phase 4 — homepage de-React
- [ ] Phase 5 — blog
- [ ] Phase 6 — SEO + redirects
- [ ] Phase 7 — verification + cutover
