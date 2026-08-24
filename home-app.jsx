/* global React, ReactDOM */
function HomeApp() {
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = [...document.querySelectorAll('.hp-reveal')];

    if (reduce) {
      reveals.forEach((el) => el.classList.add('in'));
    }

    function checkReveals() {
      if (reduce) return;
      const vh = window.innerHeight || 800;
      reveals.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
      });
    }

    // Parallax
    const pxEls = [...document.querySelectorAll('[data-px]')];
    function applyPx() {
      const vh = window.innerHeight || 1;
      pxEls.forEach((el) => {
        const f = parseFloat(el.dataset.px) || 0;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(center * f).toFixed(1)}px, 0)`;
      });
    }

    // Stack: layers converge as the section scrolls down
    const isoEls = [...document.querySelectorAll('.hp-isoL')];
    function applyStack() {
      const fig = document.querySelector('.hp-stack__figure');
      if (!fig || !isoEls.length) return;
      const sec = fig.closest('section');
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      let prog = (-r.top) / Math.max(1, r.height - vh);
      prog = Math.max(0, Math.min(1, prog));
      prog = prog * prog * (3 - 2 * prog); // smoothstep easing
      const conv = 78 * prog;
      isoEls.forEach((g) => {
        const dep = parseFloat(g.getAttribute('data-depth')) || 0;
        g.style.transform = `translateY(${(-dep * conv).toFixed(2)}px)`;
      });
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { checkReveals(); if (!reduce) { applyPx(); applyStack(); } ticking = false; });
      }
    }

    if (!reduce) { applyPx(); applyStack(); }
    checkReveals();
    const timers = [0, 120, 300, 650].map((t) => setTimeout(() => { checkReveals(); if (!reduce) { applyPx(); applyStack(); } }, t));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const { NavBar, Hero, TrustBar, Stack, Proof, Who, Industry, Compete, Resources, Closing, SiteFooter } = window;
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <Hero />
        <TrustBar />
        <Stack />
        <Proof />
        <Who />
        <Industry />
        <Compete />
        <Resources />
        <Closing />
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomeApp />);
