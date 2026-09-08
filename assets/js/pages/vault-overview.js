/* vault/overview.html — page-scoped behaviour */
(function(){
  var items = document.querySelectorAll('.vault-line');
  if(!items.length) return;
  if(!('IntersectionObserver' in window)){items.forEach(function(i){i.classList.add('is-in');});return;}
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{threshold:0.4,rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(i){io.observe(i);});
})();
