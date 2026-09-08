# Enigma Vault — Hugo

Migration of the hand-built static export (`Enigma Website 2 (4).zip`) to Hugo.
Plan: `~/Desktop/enigma-hugo-migration-plan.md`.

    hugo server        # dev
    hugo --gc --minify # production build into public/

## Layout

    data/nav.yml       nav model, ported from the old site-nav.js NAV array
    data/footer.yml    footer model, ported from site-footer.js
    data/home.yml      homepage content (was window.HP in home-data.js)
    data/llms.yml      llms.txt copy; URLs validated against real pages at build
    data/authors.yml   blog authors
    data/blog_backlog.yml  the 13 articles that never had a page
    layouts/baseof.html + partials/   the shell every page shares
    assets/css/        tokens/, global.css (was nopii.css), nav.css, footer.css,
                       per-family sheets, pages/<page>.css for page-scoped blocks
    assets/js/         nav.js, pages/<page>.js
    assets/images/     content images, processed to WebP by Hugo Pipes
    static/assets/     fixed-URL files only: og/, favicons, logo, CSS backgrounds
    layouts/partials/img.html + shortcodes/img.html   responsive <picture>
    scripts/port_page.py   ports one old .html page into content/ + assets/
    scripts/gen_home_art.py  regenerates the homepage SVG art partials

Content pages are .html, not .md: they are designed markup, and Hugo passes
.html content through verbatim. As markdown, Goldmark treated the indented
HTML after a blank line as a code block and escaped it into visible text.

## Migration status

- [x] Phase 1 — shell, nav, footer
- [x] Phase 2 — CSS + image pipeline
- [x] Phase 3 — 26 static pages (index -> Phase 4, blog -> Phase 5)
- [x] Phase 4 — homepage de-React
- [x] Phase 5 — blog
- [x] Phase 6 — SEO + redirects
- [ ] Phase 7 — verification + cutover

## Handover

### Prerequisites

Hugo **extended** v0.161.1 or later — the extended build is required for WebP
encoding in the image pipeline. A non-extended Hugo will fail on `.Process`.

    brew install hugo        # macOS
    hugo version             # must print "+extended"

Python 3 is only needed for the two scripts in `scripts/`, not for building.

### Build

    hugo server              # dev, http://localhost:1313
    hugo --gc --minify       # production build into public/

Netlify is configured in `netlify.toml` (publish `public`, command
`hugo --gc --minify`, `HUGO_VERSION` pinned).

### Where things live

- **Copy** is in `data/` — `home.yml`, `nav.yml`, `footer.yml`, `llms.yml`,
  `authors.yml`. Edit these, not the templates, for wording and link changes.
- **Pages** are `.html` files in `content/`, deliberately not `.md`: they are
  designed markup, and Hugo passes `.html` content through verbatim. Writing
  them as markdown made Goldmark escape the indented HTML into visible text.
- **Page-scoped CSS/JS** live in `assets/css/pages/` and `assets/js/pages/`,
  wired up per page via the `styles:` / `scripts:` frontmatter keys.
- **Images**: `assets/images/` goes through Hugo Pipes (WebP + srcset) via the
  `img` partial/shortcode. `static/assets/` holds only files that need a fixed
  URL — OG images, favicons, and the backgrounds referenced from CSS `url()`.
  `hero-motif.jpg` is deliberately in both; see `static/assets/README-duplicates.txt`.

### Scripts

- `scripts/gen_home_art.py` regenerates the three homepage SVG art partials
  from the same arithmetic the old `home-art.jsx` used. Run it if that art
  needs changing; do not hand-edit the generated partials.
- `scripts/port_page.py` is the one-shot migration tool. The migration is done,
  so it is kept for reference. It needs the original export:
  `EV_EXPORT=~/path/to/site-export python3 scripts/port_page.py <page> <dest>`

### Guard rails already in place

- `layouts/home.llms.txt` fails the build if a link in `data/llms.yml` points at
  a URL this build does not publish.
- `layouts/partials/img.html` warns if an image is missing from `assets/images/`.
- `layouts/partials/head/styles.html` errors on a missing stylesheet.
- CSS bundles go through `partialCached`; see `layouts/partials/css/bundle.html`
  for why a plain `resources.Concat` raced under concurrent page rendering.

### Still open (Phase 7 — cutover)

1. Deploy to a Netlify preview and confirm GTM fires and both HubSpot forms
   (contact, request-demo) submit.
2. Confirm the `Cache-Control` headers land. `netlify dev` does not apply
   `[[headers]]` locally, so these are unverified.
3. Decide on the three `Disallow` paths in `layouts/robots.txt`
   (`/_archive/`, `/export-home/`, `/export-split/`). None of those directories
   exist in this build; they were carried over from the old file unchanged.
4. Point DNS, then submit the sitemap in Search Console.

The site was pre-launch and not indexed at migration time, so the 35 redirect
rules in `netlify.toml` are insurance rather than critical path — but they cover
the complete old URL surface and were each verified 301 → 200 against
`netlify dev`.
