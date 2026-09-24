hero-motif exists here as .webp AND in assets/images/ as .jpg.

The homepage CSS paints it as a background (background:url('/assets/hero-motif.webp')),
which needs a fixed URL, while company/about.html renders it through the img
shortcode, which needs the .jpg in assets/images/ for Hugo Pipes to process.
Keep both in sync.

The fixed-URL backgrounds here are .webp rather than .jpg because nothing in
static/ goes through Hugo Pipes -- the client's compressed export supplies the
WebP, and it is ~60% smaller across these eight files. proof-bg-j.webp and
tr-prism-bg-j.webp carry the -j suffix from that export, which distinguishes
the JPEG-sourced render from the PNG-sourced proof-bg.webp / tr-prism-bg.webp
that nopii/triplets CSS still uses.

vault-dark-panels.webp, vault-dark-corridor.webp, vault-dark-wave.webp,
tr-band-isoplanes.webp, and tr-hiw-hero.webp are the same renders as
assets/images/vault/dark-panels.jpg, assets/images/vault/dark-corridor.jpg,
assets/images/vault/dark-wave.jpg, assets/images/tr-band-isoplanes.jpg, and
assets/images/tr-hiw-hero.jpg (flattened here, without the vault/ subpath,
matching the tr- prefix already used for other triplets fixed-URL backgrounds).
The vault/triplets page CSS paints each as a background via an inline
background-image:url('/assets/...') on .vp-dark__bg / .tr-bnr__art /
.tr-heromotif__bg, which needs a fixed URL; dark-panels also still renders
through the img shortcode in vault/_index.html, which needs the .jpg in
assets/images/ for Hugo Pipes. Keep in sync if the source art changes.
