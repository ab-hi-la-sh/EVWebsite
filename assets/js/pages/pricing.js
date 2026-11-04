/* pricing.html — page-scoped behaviour */
(function(){
  var tabs = [].slice.call(document.querySelectorAll('.pr-tab'));
  var panels = [].slice.call(document.querySelectorAll('.pr-panel'));
  var VALID = { vault:1, nopii:1, triplets:1 };

  // A hash can name a tab (#triplets) or an element inside one (#pr-form);
  // resolve the latter to the panel that contains it.
  function panelFor(hash){
    if (VALID[hash]) return hash;
    var el = hash && document.getElementById(hash);
    var panel = el && el.closest('.pr-panel');
    return panel ? panel.getAttribute('data-panel') : 'vault';
  }

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

  // The rail docks under the sticky site header; scroll so it lands exactly
  // there, with the chosen product's pricing starting right below it.
  var rail = document.querySelector('.pr-rail');
  var sentinel = document.querySelector('.pr-rail-sentinel');
  function navH(){ var n = document.querySelector('.hp-nav'); return n ? n.getBoundingClientRect().height : 0; }
  function toRail(){
    if (!sentinel) return;
    var y = sentinel.getBoundingClientRect().top + window.scrollY - navH();
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
  }
  // Dock under the header: the rail's sticky offset tracks the header's real
  // height, and .is-stuck (compact style) follows the scroll position.
  function past(){ return sentinel && sentinel.getBoundingClientRect().top <= navH() + 1; }
  if (rail && sentinel){
    var sync = function(){
      document.documentElement.style.setProperty('--pr-nav-h', Math.round(navH()) + 'px');
      rail.classList.toggle('is-stuck', past());
    };
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      show(t.getAttribute('data-tab'), true);
      if (past()) toRail();
    });
  });
  [].slice.call(document.querySelectorAll('[data-jump]')).forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      show(a.getAttribute('data-jump'), true);
      toRail();
    });
  });
  window.addEventListener('hashchange', function(){ show(panelFor(location.hash.replace('#','')), false); });
  show(panelFor(location.hash.replace('#','')), false);
})();

/* Vault pricing ledger: product tabs + monthly/annual toggle (vault-pricing shortcode). */
(function(){
  var root = document.querySelector('[data-vpp]');
  if (!root) return;
  var tabs = [].slice.call(root.querySelectorAll('[data-vpp-tab]'));
  var panels = [].slice.call(root.querySelectorAll('[data-vpp-panel]'));
  var bills = [].slice.call(root.querySelectorAll('[data-vpp-bill]'));

  function select(key, focus){
    tabs.forEach(function(t){
      var on = t.getAttribute('data-vpp-tab') === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach(function(p){ p.classList.toggle('is-active', p.getAttribute('data-vpp-panel') === key); });
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ select(t.getAttribute('data-vpp-tab')); });
    t.addEventListener('keydown', function(e){
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length].getAttribute('data-vpp-tab'), true);
    });
  });

  bills.forEach(function(b){
    b.addEventListener('click', function(){
      var annual = b.getAttribute('data-vpp-bill') === 'annual';
      root.classList.toggle('is-annual', annual);
      bills.forEach(function(x){ var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    });
  });

  // Deep link: /pricing/#vpp-data-vault opens that product.
  var m = location.hash.match(/^#vpp-([a-z-]+)$/);
  select(m && root.querySelector('[data-vpp-panel="' + m[1] + '"]') ? m[1] : tabs[0].getAttribute('data-vpp-tab'));
  root.classList.add('is-ready');
})();
