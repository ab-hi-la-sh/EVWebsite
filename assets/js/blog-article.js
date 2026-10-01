/* Article behaviour, ported from initBlogArticle() in the old blog-data.js.
   The parts that built markup (header, meta, author box, related cards) are
   gone -- Hugo renders those. What remains is the genuinely interactive work:
   the table of contents built from the headings, scroll spy, the reading
   progress bar, and the share links. */
(function () {
  var content = document.getElementById('bl-content');
  if (!content) return;

  /* Sticky header height, measured rather than guessed: the global nav plus,
     on layouts that add one (pii-style), the utility bar underneath it. A
     hardcoded offset here was fine while every article shared one fixed nav
     height, but it left TOC clicks landing headings partly behind the bar
     on any layout that stacks a second sticky element under the nav. */
  function headerOffset() {
    var h = 0;
    var nav = document.querySelector('.hp-nav');
    var bar = document.querySelector('.bl-utilbar');
    if (nav) h += nav.getBoundingClientRect().height;
    if (bar) h += bar.getBoundingClientRect().height;
    return h + 20;
  }

  /* Same problem headerOffset() solves, but for CSS: .bl-utilbar and
     .bl-pii-sidebar need to stick exactly below the nav, and the nav's real
     height changes by breakpoint (92px+border desktop vs 80px+border under
     1024px -- see .hp-nav__inner in global.css). A hardcoded top in CSS was
     only ever correct at one width, and being wrong is what made the bar
     stick a few pixels above the nav's actual bottom edge -- the nav's
     higher z-index then cut off that sliver of the bar on scroll. Exposing
     the measured heights as custom properties lets CSS keep ownership of
     the actual positioning while using numbers that are correct at whatever
     width the page is currently at. */
  function syncStickyOffsets() {
    var nav = document.querySelector('.hp-nav');
    var utilbar = document.querySelector('.bl-utilbar');
    document.documentElement.style.setProperty('--bl-nav-h', (nav ? nav.getBoundingClientRect().height : 0) + 'px');
    if (utilbar) document.documentElement.style.setProperty('--bl-bar-h', utilbar.getBoundingClientRect().height + 'px');
  }
  syncStickyOffsets();
  window.addEventListener('resize', syncStickyOffsets);
  window.addEventListener('load', syncStickyOffsets);

  var bar = document.getElementById('bl-progress');
  function progress() {
    if (!bar) return;
    var top = content.offsetTop, h = content.offsetHeight, vh = window.innerHeight;
    var p = (window.scrollY - top + vh * 0.25) / (h - vh * 0.5);
    bar.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
  }

  /* TOC from h2/h3 */
  var heads = [].slice.call(content.querySelectorAll('h2, h3'));
  var tocList = document.getElementById('bl-toc-list');
  var tocListM = document.getElementById('bl-toc-list-m');
  heads.forEach(function (h, i) {
    if (!h.id) {
      h.id = 'sec-' + i + '-' + (h.textContent || '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    var lvl = h.tagName === 'H3' ? 'lvl-3' : 'lvl-2';
    var a = '<a href="#' + h.id + '" class="' + lvl + '" data-tg="' + h.id + '">' + h.textContent + '</a>';
    if (tocList) { var li = document.createElement('li'); li.innerHTML = a; tocList.appendChild(li); }
    if (tocListM) { var li2 = document.createElement('li'); li2.innerHTML = a; tocListM.appendChild(li2); }
  });

  [].forEach.call(document.querySelectorAll('[data-tg]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var t = document.getElementById(a.getAttribute('data-tg'));
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - headerOffset(), behavior: 'smooth' });
      var dm = a.closest('details'); if (dm) dm.open = false;
    });
  });

  function spy() {
    if (!heads.length) return;
    var cur = heads[0].id, y = window.scrollY + headerOffset() + 10;
    heads.forEach(function (h) { if (h.offsetTop <= y) cur = h.id; });
    [].forEach.call(document.querySelectorAll('[data-tg]'), function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-tg') === cur);
    });
  }

  var tick = false;
  window.addEventListener('scroll', function () {
    if (!tick) { tick = true; requestAnimationFrame(function () { progress(); spy(); tick = false; }); }
  }, { passive: true });

  /* share */
  var url = location.href.split('#')[0];
  var title = document.title;
  var li = document.getElementById('sh-li'), x = document.getElementById('sh-x'),
      em = document.getElementById('sh-em'), cp = document.getElementById('sh-cp');
  if (li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
  if (x)  x.href  = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
  if (em) em.href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url);
  if (cp) cp.addEventListener('click', function () {
    var done = function () {
      cp.classList.add('is-copied');
      setTimeout(function () { cp.classList.remove('is-copied'); }, 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done); else done();
  });

  progress(); spy();
})();
