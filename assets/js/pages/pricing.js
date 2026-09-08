/* pricing.html — page-scoped behaviour */
(function(){
  var tabs = [].slice.call(document.querySelectorAll('.pr-tab'));
  var panels = [].slice.call(document.querySelectorAll('.pr-panel'));
  var VALID = { vault:1, nopii:1, triplets:1 };

  function show(id, push){
    if (!VALID[id]) id = 'vault';
    tabs.forEach(function(t){
      var on = t.getAttribute('data-tab') === id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function(p){ p.classList.toggle('is-active', p.getAttribute('data-panel') === id); });
    if (push && history.replaceState) history.replaceState(null, '', '#' + id);
  }

  tabs.forEach(function(t){
    t.addEventListener('click', function(){ show(t.getAttribute('data-tab'), true); });
  });
  [].slice.call(document.querySelectorAll('[data-jump]')).forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var id = a.getAttribute('data-jump');
      show(id, true);
      var rail = document.querySelector('.pr-rail');
      if (rail) window.scrollTo({ top: rail.offsetTop, behavior: 'smooth' });
    });
  });
  window.addEventListener('hashchange', function(){ show(location.hash.replace('#',''), false); });
  show(location.hash.replace('#','') || 'vault', false);
})();
