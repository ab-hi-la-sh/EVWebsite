/* solutions/industries/index.html — page-scoped behaviour */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rv = document.querySelectorAll('.im-rv');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function(e){ e.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function(e){ io.observe(e); });
  }
  var secs = [].slice.call(document.querySelectorAll('.im-sec[id]'));
  var links = {};
  document.querySelectorAll('.im-rail a').forEach(function(a){ links[a.getAttribute('href').slice(1)] = a; });
  if (secs.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        for (var k in links) links[k].classList.remove('is-active');
        var a = links[e.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    secs.forEach(function(s){ spy.observe(s); });
  }
})();
