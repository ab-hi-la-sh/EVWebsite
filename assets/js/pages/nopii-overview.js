/* nopii/overview.html — page-scoped behaviour */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = [].slice.call(document.querySelectorAll('.np-reveal'));
  if (reduce) { els.forEach(function(e){ e.classList.add('in'); }); return; }
  function check(){
    var vh = window.innerHeight || 800;
    els.forEach(function(e){
      if (e.classList.contains('in')) return;
      var r = e.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) e.classList.add('in');
    });
  }
  check();
  [0,120,300,650].forEach(function(t){ setTimeout(check, t); });
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
})();
/* Scroll-driven tilt for the hero banner visual (rotateX 16deg -> 0, scale 1.03 -> 1) */
(function(){
  var wrap = document.querySelector('[data-scroll-tilt]');
  if (!wrap) return;
  var card = wrap.querySelector('.np-scroll__card');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { card.style.transform = 'none'; return; }
  var ticking = false;
  function update(){
    var r = wrap.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    var p = (vh - r.top) / (vh * 0.9);
    p = Math.max(0, Math.min(1, p));
    var rot = (16 * (1 - p)).toFixed(2);
    var sc = (1.03 - 0.03 * p).toFixed(3);
    card.style.transform = 'rotateX(' + rot + 'deg) scale(' + sc + ')';
    ticking = false;
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
/* Admin console tab switching */
(function(){
  var tabs = [].slice.call(document.querySelectorAll('.np-tab'));
  var panels = [].slice.call(document.querySelectorAll('.np-tabpanel'));
  if (!tabs.length) return;
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      var id = t.getAttribute('data-tab');
      tabs.forEach(function(x){ var on = x === t; x.classList.toggle('is-active', on); x.setAttribute('aria-selected', on ? 'true' : 'false'); });
      panels.forEach(function(p){ p.classList.toggle('is-active', p.getAttribute('data-panel') === id); });
    });
  });
})();
