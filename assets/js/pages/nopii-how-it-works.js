/* nopii/how-it-works.html — page-scoped behaviour */
(function(){
  var sec = document.querySelector('[data-parallax]');
  if (!sec) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var bg = sec.querySelector('[data-parallax-bg]');
  var txt = sec.querySelector('[data-parallax-text]');
  var ticking = false;
  function upd(){
    var r = sec.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    var c = r.top + r.height / 2 - vh / 2;
    if (bg) bg.style.transform = 'translate3d(0,' + (c * -0.12).toFixed(1) + 'px,0)';
    if (txt) txt.style.transform = 'translate3d(0,' + (c * 0.05).toFixed(1) + 'px,0)';
    ticking = false;
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(upd); } }
  upd();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
