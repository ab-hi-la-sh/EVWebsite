/* Blog landing filter, ported from initBlogLanding() in the old blog-data.js.
   The old controller RENDERED the cards from a JS array, so the listing did
   not exist without JavaScript. Hugo renders the cards now; this only filters
   what is already in the DOM, so the articles are readable (and crawlable)
   with JS off. Load-more works the same way, over real elements. */
(function () {
  var chips  = document.getElementById('bl-chips');
  var search = document.getElementById('bl-search');
  if (!chips && !search) return;

  var clear   = document.getElementById('bl-clear');
  var empty   = document.getElementById('bl-empty');
  var reset   = document.getElementById('bl-reset');
  var featSec = document.getElementById('bl-featured-sec');
  var archSec = document.getElementById('bl-archive-sec');
  var featCt  = document.getElementById('bl-feat-count');
  var archCt  = document.getElementById('bl-arch-count');
  var moreBtn = document.getElementById('bl-more-btn');
  var more    = document.getElementById('bl-more');

  var cards = [].slice.call(document.querySelectorAll('#bl-featured .bl-card'));
  var rows  = [].slice.call(document.querySelectorAll('#bl-archive .bl-row'));
  var ARCH_STEP = 4;
  var state = { q: '', cat: 'All', archShown: ARCH_STEP };

  function matches(el) {
    if (state.cat !== 'All' && el.getAttribute('data-cat') !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    return !q || (el.getAttribute('data-search') || '').indexOf(q) !== -1;
  }

  function render() {
    var nFeat = 0, nArch = 0;
    cards.forEach(function (c) {
      var on = matches(c);
      c.style.display = on ? '' : 'none';
      if (on) nFeat++;
    });
    var shown = 0;
    rows.forEach(function (r) {
      var on = matches(r);
      if (on) { nArch++; shown++; }
      r.style.display = on && shown <= state.archShown ? '' : 'none';
    });

    if (featSec) featSec.style.display = nFeat ? '' : 'none';
    if (archSec) archSec.style.display = nArch ? '' : 'none';
    if (featCt) featCt.textContent = nFeat + (nFeat === 1 ? ' article' : ' articles');
    if (archCt) archCt.textContent = nArch + ' more';
    if (more) more.style.display = nArch > state.archShown ? '' : 'none';
    if (empty) empty.classList.toggle('is-on', nFeat === 0 && nArch === 0);
    if (clear) clear.style.display = state.q ? '' : 'none';
  }

  if (chips) {
    [].forEach.call(chips.children, function (b) {
      b.addEventListener('click', function () {
        state.cat = b.getAttribute('data-cat');
        state.archShown = ARCH_STEP;
        [].forEach.call(chips.children, function (x) { x.classList.toggle('is-active', x === b); });
        render();
      });
    });
  }
  if (search) search.addEventListener('input', function () { state.q = search.value; state.archShown = ARCH_STEP; render(); });
  if (clear) clear.addEventListener('click', function () { search.value = ''; state.q = ''; render(); search.focus(); });
  if (moreBtn) moreBtn.addEventListener('click', function () { state.archShown += ARCH_STEP; render(); });
  if (reset) reset.addEventListener('click', function () {
    state.q = ''; state.cat = 'All'; state.archShown = ARCH_STEP;
    if (search) search.value = '';
    if (chips) [].forEach.call(chips.children, function (x, i) { x.classList.toggle('is-active', i === 0); });
    render();
  });

  render();
})();
