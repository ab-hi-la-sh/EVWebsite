/* Article behaviour, ported from initBlogArticle() in the old blog-data.js.
   The parts that built markup (header, meta, author box, related cards) are
   gone -- Hugo renders those. What remains is the genuinely interactive work:
   the table of contents built from the headings, scroll spy, the reading
   progress bar, and the share links. */
(function () {
  var content = document.getElementById('bl-content');
  if (!content) return;

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
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
      var dm = a.closest('details'); if (dm) dm.open = false;
    });
  });

  function spy() {
    if (!heads.length) return;
    var cur = heads[0].id, y = window.scrollY + 110;
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
