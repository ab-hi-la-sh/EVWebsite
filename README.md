# Enigma Vault website

Static site, no build step. Publish the whole folder as-is (`netlify.toml` sets
`publish = "."`). Canonical domain: **https://www.enigmavault.io**

## Pages (29)

| Path | Page |
|---|---|
| `index.html` | Home |
| `platform/overview.html` · `platform/data-security.html` · `platform/integrations.html` | Platform |
| `triplets/overview.html` · `how-it-works.html` · `use-cases.html` · `faqs.html` | Triplets |
| `nopii/overview.html` · `how-it-works.html` · `use-cases.html` · `faqs.html` | NoPII |
| `vault/overview.html` · `how-it-works.html` · `use-cases.html` · `faqs.html` | The Vault |
| `vault/card-vault.html` · `data-vault.html` · `file-vault.html` · `customer-vault.html` | Vault products |
| `solutions/industries/index.html` | Industries |
| `resources/blog.html` · `article.html` · `docs.html` | Resources |
| `pricing.html` · `request-demo.html` · `contact.html` · `company/about.html` · `login.html` | Company |

## Shared files

- `site-nav.js`, `site-footer.js` — nav and footer injected into every page via `data-site-nav` / `data-site-footer` hooks. `data-base` sets the relative path prefix.
- `_ds/…` — design-system tokens, `styles.css`, component bundle, self-hosted Inter and Geist webfonts.
- `home-*.jsx`, `hero-banner.jsx` — the React homepage, transpiled in the browser by Babel. `index.html` carries a static hero (`.hp-boot`) that React replaces on mount, so the H1 and primary links are in the served HTML.
- Per-page CSS/JS sits next to its pages (`triplets/tr-pages.css`, `nopii/nopii.css`, `solutions/industries/ind-glow.css`, …).

## SEO

Every page carries a `<!-- SEO -->` block: unique title (≤60 chars) and description
(≤160), `rel=canonical`, `robots`, full Open Graph and Twitter card tags, favicon
links, and `theme-color`. `login.html` is `noindex, follow`; everything else is
`index, follow`.

- `sitemap.xml` — 28 indexable URLs. `robots.txt` points to it.
- `assets/og/<slug>.jpg` — one 1200×630 branded share image per page.
- `assets/favicon.svg` + `favicon-32.png` / `favicon-16.png` / `apple-touch-icon.png` / `icon-192.png` / `icon-512.png` — built from the logo aperture motif. `site.webmanifest` references the two large icons.

To change the domain, search and replace `https://www.enigmavault.io` across the
HTML files and `sitemap.xml`.

## Forms

`contact.html` and `request-demo.html` post to Netlify Forms (`data-netlify="true"`).
They need no server; form submissions appear in the Netlify dashboard.
