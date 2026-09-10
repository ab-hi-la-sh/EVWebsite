/* platform/overview.html — page-scoped behaviour.
   Staggered reveal of the .pf-stmt statement band. Hardened over the original
   single-IntersectionObserver version: a passive scroll fallback + an on-load
   in-view check guarantee the reveal fires in every browser and scroll state,
   so the text can never get stuck at opacity:0 if the observer misses. The
   animation itself (CSS transition + stagger) is unchanged. */
(function(){
  var s=document.querySelector('.pf-stmts'); if(!s) return;
  var shown=false;
  function reveal(){
    if(shown) return; shown=true;
    s.classList.add('is-shown');
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  }
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ reveal(); return; }
  function inView(){
    var r=s.getBoundingClientRect();
    var vh=window.innerHeight||document.documentElement.clientHeight||800;
    return r.top < vh*0.85 && r.bottom > 0;
  }
  function onScroll(){ if(inView()) reveal(); }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ reveal(); io.disconnect(); } });
    },{threshold:0.4});
    io.observe(s);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  if(inView()) reveal();
})();
