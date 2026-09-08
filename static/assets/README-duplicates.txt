hero-motif.jpg exists here AND in assets/images/.

The homepage CSS paints it as a background (background:url('/assets/hero-motif.jpg')),
which needs a fixed URL, while company/about.html renders it through the img
shortcode, which needs it in assets/images/ for Hugo Pipes. Keep both in sync.
