/* Homepage scroll effects, ported from the single useEffect in home-app.jsx
   and the one useState in home-parts1.jsx's NavBar.

   The maths is copied verbatim rather than reimplemented: the parallax factor,
   the 0.92 viewport reveal threshold, the smoothstep easing and the 78px
   convergence are all hand-tuned values. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = [].slice.call(document.querySelectorAll('.hp-reveal'));

  if (reduce) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  function checkReveals() {
    if (reduce) return;
    var vh = window.innerHeight || 800;
    reveals.forEach(function (el) {
      if (el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  }

  /* Parallax */
  var pxEls = [].slice.call(document.querySelectorAll('[data-px]'));
  function applyPx() {
    var vh = window.innerHeight || 1;
    pxEls.forEach(function (el) {
      var f = parseFloat(el.dataset.px) || 0;
      var r = el.getBoundingClientRect();
      var center = r.top + r.height / 2 - vh / 2;
      el.style.transform = 'translate3d(0, ' + (center * f).toFixed(1) + 'px, 0)';
    });
  }

  /* Stack: layers converge as the section scrolls */
  var isoEls = [].slice.call(document.querySelectorAll('.hp-isoL'));
  function applyStack() {
    var fig = document.querySelector('.hp-stack__figure');
    if (!fig || !isoEls.length) return;
    var sec = fig.closest('section');
    if (!sec) return;
    var r = sec.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    var prog = (-r.top) / Math.max(1, r.height - vh);
    prog = Math.max(0, Math.min(1, prog));
    prog = prog * prog * (3 - 2 * prog); // smoothstep easing
    var conv = 78 * prog;
    isoEls.forEach(function (g) {
      var dep = parseFloat(g.getAttribute('data-depth')) || 0;
      g.style.transform = 'translateY(' + (-dep * conv).toFixed(2) + 'px)';
    });
  }

  /* NavBar scrolled state (was a useState in home-parts1.jsx) */
  var nav = document.querySelector('.hp-nav');
  function navScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        checkReveals();
        navScroll();
        if (!reduce) { applyPx(); applyStack(); }
        ticking = false;
      });
    }
  }

  if (!reduce) { applyPx(); applyStack(); }
  checkReveals();
  navScroll();
  [0, 120, 300, 650].forEach(function (t) {
    setTimeout(function () {
      checkReveals();
      if (!reduce) { applyPx(); applyStack(); }
    }, t);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
