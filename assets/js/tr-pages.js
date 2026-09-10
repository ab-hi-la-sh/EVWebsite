/* Triplets pages — interactive behaviours: faces explorer, pipeline stepper,
   partition bar growth. Loaded after triplets-fx.js. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Tabsets: [data-tabs] with [data-tab] buttons and [data-pane] panes ---- */
  [].forEach.call(document.querySelectorAll('[data-tabs]'), function (host) {
    var btns = [].slice.call(host.querySelectorAll('[data-tab]'));
    var panes = [].slice.call(host.querySelectorAll('[data-pane]'));
    if (!btns.length) return;
    var timer = null;
    function select(i, userDriven) {
      btns.forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
      panes.forEach(function (p, j) { p.classList.toggle('is-on', j === i); });
      if (userDriven && timer) { clearInterval(timer); timer = null; }
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i, true); });
      b.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
        var n = (i + d + btns.length) % btns.length;
        btns[n].focus(); select(n, true);
      });
    });
    select(0);
    /* auto-advance only for tabsets that ask for it, and only while visible */
    if (host.hasAttribute('data-autoplay') && !reduce && 'IntersectionObserver' in window) {
      var every = parseInt(host.getAttribute('data-autoplay'), 10) || 3600;
      var idx = 0, visible = false;
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { visible = e.isIntersecting; });
      }, { threshold: 0.4 }).observe(host);
      timer = setInterval(function () {
        if (!visible || !timer) return;
        idx = (idx + 1) % btns.length;
        select(idx);
      }, every);
      host.addEventListener('mouseenter', function () { visible = false; });
      host.addEventListener('mouseleave', function () { visible = true; });
    }
  });

  /* ---- Partition bar: grow segments once in view ---- */
  var bars = [].slice.call(document.querySelectorAll('.tr-pbar'));
  if (bars.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.classList.add('is-in'); });
    } else {
      var bo = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); bo.unobserve(e.target); } });
      }, { threshold: 0.4 });
      bars.forEach(function (b) { bo.observe(b); });
      setTimeout(function () { bars.forEach(function (b) { b.classList.add('is-in'); }); }, 1600);
    }
  }
})();
