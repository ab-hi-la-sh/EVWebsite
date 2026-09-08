/* Nav behaviour, ported from site-nav.js.
   Everything that file did to *build* markup now happens at build time in
   layouts/partials/nav*.html. What's left is the two interactive bits:
   the mobile burger panel, and the site-wide one-open-at-a-time accordion. */
(function () {
  function installBurger() {
    document.addEventListener('click', function (e) {
      var header = document.querySelector('.hp-nav');
      if (!header) return;
      var panel = header.querySelector('.hp-mnav');
      if (!panel) return;
      var btn = e.target.closest && e.target.closest('[data-nav-burger]');

      if (btn) {
        e.preventDefault();
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        return;
      }
      if (panel.classList.contains('is-open') && !e.target.closest('.hp-mnav')) {
        panel.classList.remove('is-open');
        var b = header.querySelector('[data-nav-burger]');
        if (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Open menu'); }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.querySelector('.hp-mnav.is-open');
      if (!panel) return;
      panel.classList.remove('is-open');
      var b = document.querySelector('[data-nav-burger]');
      if (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Open menu'); b.focus(); }
    });
  }

  /* Within any group of sibling <details>, opening one closes the rest. */
  function installAccordions() {
    document.addEventListener('toggle', function (e) {
      var d = e.target;
      if (!d || d.tagName !== 'DETAILS' || !d.open) return;
      var parent = d.parentElement;
      if (!parent) return;
      var sibs = parent.children;
      for (var i = 0; i < sibs.length; i++) {
        if (sibs[i] !== d && sibs[i].tagName === 'DETAILS' && sibs[i].open) sibs[i].open = false;
      }
    }, true);
  }

  function mount() { installAccordions(); installBurger(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
