/* platform/overview.html — page-scoped behaviour */
(function(){
  var s=document.querySelector('.pf-stmts'); if(!s) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)){ s.classList.add('is-shown'); return; }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ s.classList.add('is-shown'); io.unobserve(e.target); } });
  },{threshold:0.4});
  io.observe(s);
})();
