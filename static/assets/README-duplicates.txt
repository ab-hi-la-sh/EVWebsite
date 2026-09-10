hero-motif.jpg exists here AND in assets/images/.

The homepage CSS paints it as a background (background:url('/assets/hero-motif.jpg')),
which needs a fixed URL, while company/about.html renders it through the img
shortcode, which needs it in assets/images/ for Hugo Pipes. Keep both in sync.

vault-dark-panels.jpg, vault-dark-corridor.jpg, vault-dark-wave.jpg,
tr-band-isoplanes.jpg, and tr-hiw-hero.jpg are the same files as
assets/images/vault/dark-panels.jpg, assets/images/vault/dark-corridor.jpg,
assets/images/vault/dark-wave.jpg, assets/images/tr-band-isoplanes.jpg, and
assets/images/tr-hiw-hero.jpg (flattened here, without the vault/ subpath,
matching the tr- prefix already used for other triplets fixed-URL backgrounds).
The vault/triplets page CSS paints each as a background via an inline
background-image:url('/assets/...') on .vp-dark__bg / .tr-bnr__art /
.tr-heromotif__bg, which needs a fixed URL; vault-dark-panels.jpg also still
renders through the img shortcode on vault/use-cases.html, which needs it in
assets/images/ for Hugo Pipes. Keep in sync if the source art changes.
