/* Triplets — shared depth/motion behaviours */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Reveal on scroll ---- */
  var reveals = [].slice.call(document.querySelectorAll('.np-reveal'));
  function show(el) { el.classList.add('is-in'); }
  function inView(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    return r.top < vh * 0.92 && r.bottom > 0;
  }
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(show);
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
    // Failsafe 1: anything already in/above the viewport on load is shown
    // immediately — the above-the-fold hero must never wait on an IO callback.
    reveals.forEach(function (el) { if (inView(el)) show(el); });
    // Failsafe 2: reveal on scroll in case IO never fires in this environment.
    window.addEventListener('scroll', function () {
      reveals.forEach(function (el) { if (inView(el)) show(el); });
    }, { passive: true });
    // Failsafe 3: hard backstop — never leave content permanently hidden.
    setTimeout(function () { reveals.forEach(show); }, 1400);
  }

  /* ---- Parallax dark-band backgrounds ---- */
  var layers = [].slice.call(document.querySelectorAll('[data-px]'));
  function speedOf(el) { var s = parseFloat(el.getAttribute('data-px')); return isNaN(s) ? 0.12 : s; }

  /* ---- Count-up ---- */
  var counted = false;
  var countWrap = document.querySelector('[data-tr-counts]');
  function runCounts() {
    if (counted || !countWrap) return;
    var r = countWrap.getBoundingClientRect(), vh = window.innerHeight || 800;
    if (r.top > vh * 0.92 || r.bottom < 0) return;
    counted = true;
    [].forEach.call(countWrap.querySelectorAll('.tr-count'), function (el) {
      var to = parseInt(el.getAttribute('data-to'), 10) || 0;
      if (reduce) { el.textContent = to; return; }
      var t0 = performance.now(), dur = 900;
      (function step(now) {
        var p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step); else el.textContent = to;
      })(performance.now());
    });
  }

  function frame() {
    var vh = window.innerHeight || 800, ww = window.innerWidth || 1200;
    if (!reduce && ww > 767) {
      layers.forEach(function (el) {
        var host = el.closest('.tr-px, .tr-heromotif') || el.parentElement;
        var r = host.getBoundingClientRect();
        var c = r.top + r.height / 2 - vh / 2;
        el.style.transform = 'translate3d(0,' + (c * -speedOf(el)).toFixed(1) + 'px,0)';
      });
    }
    runCounts();
  }

  /* ---- Animated hovering dots ---- */
  [].forEach.call(document.querySelectorAll('[data-tr-dots]'), function (host) {
    var n = parseInt(host.getAttribute('data-tr-dots'), 10) || 26;
    var colors = ['#9FC4D6', '#C8CCD3', '#FFFFFF', '#5C86A0'];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var d = document.createElement('span');
      d.className = 'tr-dot';
      var size = (Math.random() * 4 + 2).toFixed(1);
      var sq = Math.random() > 0.55;
      d.style.width = size + 'px';
      d.style.height = size + 'px';
      d.style.left = (Math.random() * 100).toFixed(2) + '%';
      d.style.top = (Math.random() * 100).toFixed(2) + '%';
      d.style.background = colors[(Math.random() * colors.length) | 0];
      d.style.borderRadius = sq ? '1px' : '50%';
      d.style.setProperty('--dur', (Math.random() * 6 + 6).toFixed(1) + 's');
      d.style.setProperty('--delay', (-Math.random() * 8).toFixed(1) + 's');
      d.style.setProperty('--dx', (Math.random() * 24 - 12).toFixed(0) + 'px');
      d.style.setProperty('--dy', (-Math.random() * 26 - 8).toFixed(0) + 'px');
      d.style.setProperty('--o1', (Math.random() * 0.25 + 0.12).toFixed(2));
      d.style.setProperty('--o2', (Math.random() * 0.35 + 0.5).toFixed(2));
      frag.appendChild(d);
    }
    host.appendChild(frag);
  });

  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { frame(); ticking = false; });
  }
  onScroll();
  [120, 350, 700].forEach(function (t) { setTimeout(onScroll, t); });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
