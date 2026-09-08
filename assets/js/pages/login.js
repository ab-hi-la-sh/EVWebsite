/* login.html — page-scoped behaviour */
(function(){
  var tiles = document.querySelectorAll('.lg-tile');
  function toggle(tile){
    var open = tile.classList.contains('is-open');
    tiles.forEach(function(t){ t.classList.remove('is-open'); });
    if (!open) tile.classList.add('is-open');
  }
  tiles.forEach(function(tile){
    tile.addEventListener('click', function(){ toggle(tile); });
    tile.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(tile); }
    });
  });
})();
