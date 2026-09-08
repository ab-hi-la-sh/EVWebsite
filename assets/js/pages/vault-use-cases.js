/* vault/use-cases.html — page-scoped behaviour */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rv = document.querySelectorAll('.vu-rv');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function(e){ e.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
  rv.forEach(function(e){ io.observe(e); });
})();
