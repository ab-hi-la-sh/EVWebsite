/* =====================================================================
   Enigma Vault — universal site navigation.
   SINGLE SOURCE OF TRUTH for the main nav (structure, panel CSS, and the
   right-hand actions block), so every page carries an identical nav.

   Static pages:
     <div class="hp-nav__links" data-site-nav data-base="../"></div>
     <div class="hp-nav__actions" data-site-nav-actions data-base="../"></div>
   plus <script src="../site-nav.js"></script> before </body>.

   React home (index.html): renderSiteNavLinks('') / renderSiteNavActions('').

   Also installs the site-wide accordion behavior: within any group of
   sibling <details>, opening one closes the rest.
   ===================================================================== */
(function () {
  var AWS = 'https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018';
  var NAV = [
    { label: 'Platform', topHref: 'platform/overview.html', rich: [
      { label: 'Overview', href: 'platform/overview.html', icon: 'assets/nav/plat-overview.jpg', desc: 'The platform that powers the Enigma Vault suite' },
      { label: 'Data Security', href: 'platform/data-security.html', icon: 'assets/nav/plat-security.jpg', desc: 'Protecting your data. We take it seriously' },
      { label: 'Integrations', href: 'platform/integrations.html', icon: 'assets/nav/plat-integrations.jpg', desc: 'Wide ecosystem of partners and products' },
    ] },
    { label: 'Triplets', topHref: 'triplets/overview.html', tag: 'Trust the output', icon: 'assets/nav/triplets.jpg', links: [
      ['Overview', 'triplets/overview.html'],
      ['How it works', 'triplets/how-it-works.html'],
      ['Use cases', 'triplets/use-cases.html'],
      ['FAQs', 'triplets/faqs.html'],
    ] },
    { label: 'NoPII', topHref: 'nopii/overview.html', tag: 'Trust the input', icon: 'assets/nav/nopii.jpg', links: [
      ['Overview', 'nopii/overview.html'],
      ['How it works', 'nopii/how-it-works.html'],
      ['Use cases', 'nopii/use-cases.html'],
      ['FAQs', 'nopii/faqs.html'],
    ] },
    { label: 'The Vault', topHref: 'vault/overview.html', tag: 'Trust the data', icon: 'assets/nav/vault.jpg', links: [
      ['Overview', 'vault/overview.html'],
      ['How it works', 'vault/how-it-works.html'],
      ['Use cases', 'vault/use-cases.html'],
      ['FAQs', 'vault/faqs.html'],
    ], group: { title: 'The four vaults', links: [
      ['Card Vault', 'vault/card-vault.html'],
      ['Data Vault', 'vault/data-vault.html'],
      ['File Vault', 'vault/file-vault.html'],
      ['Customer Vault', 'vault/customer-vault.html'],
    ] } },
    { label: 'Pricing', topHref: 'pricing.html' },
    { label: 'Industries', topHref: 'solutions/industries/index.html', industries: [
      { label: 'Healthcare', href: 'solutions/industries/index.html#healthcare', icon: 'assets/industries/healthcare.png', desc: 'Safe AI answers, protected PHI' },
      { label: 'Financial services', href: 'solutions/industries/index.html#financial-services', icon: 'assets/industries/financial.png', desc: 'AI features without the scope' },
      { label: 'Legal', href: 'solutions/industries/index.html#legal', icon: 'assets/industries/legal.png', desc: 'Protect privilege, ground every answer' },
      { label: 'Insurance', href: 'solutions/industries/index.html#insurance', icon: 'assets/industries/insurance.png', desc: 'Accurate coverage answers, secured claims' },
    ] },
    { label: 'Resources', resources: [
      { label: 'Blog', href: 'resources/blog.html', icon: 'assets/nav/res-blogs.png', desc: 'Perspectives, trends & updates' },
      { label: 'Docs', href: 'resources/docs.html', icon: 'assets/nav/res-docs.png', desc: 'Product documentation & APIs' },
    ] },
  ];
  window.SITE_NAV = NAV;
  window.AWS_MP = window.AWS_MP || AWS;

  /* ---- panel styles for the product dropdowns ---- */
  var CSS = '\
.hp-nav__item--rel{position:relative;}\
.hp-prod{position:absolute;top:calc(100% + 8px);left:0;background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:12px;box-shadow:0 16px 40px rgba(42,51,64,0.12);padding:14px;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .2s ease-out,transform .2s ease-out,visibility .2s;z-index:60;min-width:252px;}\
.hp-prod--wide{min-width:452px;}\
.hp-prod::before{content:"";position:absolute;top:-8px;left:0;right:0;height:8px;}\
.hp-nav__item:hover .hp-prod,.hp-nav__item:focus-within .hp-prod{opacity:1;visibility:visible;transform:none;}\
.hp-prod__head{display:flex;align-items:center;gap:11px;padding:0 4px 12px;margin-bottom:10px;border-bottom:1px solid var(--border-hairline);}\
.hp-prod__ic{width:38px;height:38px;border-radius:9px;overflow:hidden;flex:none;background:var(--ev-warm-cloud);border:1px solid var(--border-hairline);}\
.hp-prod__ic img{width:100%;height:100%;object-fit:cover;display:block;mix-blend-mode:multiply;}\
.hp-prod__ht{display:flex;flex-direction:column;gap:3px;min-width:0;}\
.hp-prod__name{font-family:var(--ev-font-sans);font-size:14px;font-weight:600;color:var(--ev-mineral-blue);}\
.hp-prod__tag{font-family:var(--ev-font-sans);font-size:10.5px;font-weight:400;letter-spacing:0.06em;text-transform:uppercase;color:var(--ev-slate);}\
.hp-prod__cols{display:grid;grid-template-columns:1fr;gap:14px;}\
.hp-prod--wide .hp-prod__cols{grid-template-columns:1fr 1fr;}\
.hp-prod__colh{font-family:var(--ev-font-sans);font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--ev-slate);margin:0 0 8px;padding:0 11px;}\
.hp-prod__links{display:flex;flex-direction:column;gap:2px;}\
.hp-prod__links a{padding:9px 11px;border-radius:8px;font-family:var(--ev-font-sans);font-size:13.5px;color:var(--ev-ink);text-decoration:none;transition:background .12s ease-out,color .12s ease-out;}\
.hp-prod__links a:hover{background:var(--ev-warm-cloud);color:var(--ev-mineral-blue);}\
.hp-prod__div{border-left:1px solid var(--border-hairline);padding-left:14px;}\
.hp-nav__burger{display:none;appearance:none;background:transparent;border:1px solid var(--ev-cool-stone);border-radius:6px;width:40px;height:40px;padding:0;cursor:pointer;align-items:center;justify-content:center;color:var(--ev-ink);transition:border-color .15s ease-out,background .15s ease-out;}\
.hp-nav__burger:hover{border-color:var(--ev-silver);background:var(--ev-warm-cloud);}\
.hp-nav__burger svg{width:20px;height:20px;}\
.hp-nav__burger .x{display:none;}\
.hp-nav__burger[aria-expanded="true"] .x{display:block;}\
.hp-nav__burger[aria-expanded="true"] .b{display:none;}\
.hp-mnav{display:none;position:absolute;top:100%;left:0;right:0;background:var(--surface-card);border-top:1px solid var(--border-hairline);border-bottom:1px solid var(--border-hairline);box-shadow:0 18px 40px rgba(42,51,64,.12);max-height:calc(100vh - 92px);overflow-y:auto;z-index:210;}\
.hp-mnav.is-open{display:block;}\
.hp-mnav__inner{padding:14px 32px 28px;}\
.hp-mnav__grp{border-bottom:1px solid var(--border-hairline);padding:14px 0;}\
.hp-mnav__grp:last-child{border-bottom:0;}\
.hp-mnav__h{font-family:var(--ev-font-sans);font-size:10.5px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--ev-slate);margin:0 0 10px;}\
.hp-mnav__links{display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;}\
.hp-mnav__links a{font-family:var(--ev-font-sans);font-size:15px;color:var(--ev-ink);text-decoration:none;padding:10px 10px;border-radius:8px;}\
.hp-mnav__links a:hover{background:var(--ev-warm-cloud);color:var(--ev-mineral-blue);}\
.hp-mnav__links a.is-top{font-weight:600;color:var(--ev-mineral-blue);grid-column:1 / -1;}\
.hp-mnav__cta{display:flex;gap:12px;flex-wrap:wrap;padding-top:20px;}\
@media (max-width:1023px){.hp-nav__burger{display:inline-flex;}.hp-mnav__inner{padding:12px 32px 26px;}.hp-nav__contact{display:none;}}\
.hp-nav__contact{font-family:var(--ev-font-sans);font-size:14px;font-weight:500;color:#fff;background:var(--ev-mineral-blue);border:1px solid var(--ev-mineral-blue);text-decoration:none;padding:8px 14px;border-radius:6px;transition:background .15s ease-out,border-color .15s ease-out;}\
.hp-nav__contact:hover{background:#0C3348;border-color:#0C3348;color:#fff;}\
.hp-nav__actions{gap:12px;}\
@media (max-width:600px){.hp-mnav__links{grid-template-columns:1fr;}.hp-mnav__inner{padding:10px 20px 24px;}}';
  function injectCSS() {
    if (document.getElementById('ev-site-nav-css')) return;
    var s = document.createElement('style');
    s.id = 'ev-site-nav-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  window.SITE_NAV_CSS = CSS;

  /* ---- helpers ---- */
  function isAbs(h) { return !h || h.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(h); }
  function p(base, h) { return isAbs(h) ? h : base + h; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var caret = '<span class="hp-nav__caret" aria-hidden="true">&#9662;</span>';

  function linkList(base, links) {
    return '<div class="hp-prod__links">' + links.map(function (lk) {
      return '<a href="' + p(base, lk[1]) + '">' + esc(lk[0]) + '</a>';
    }).join('') + '</div>';
  }
  function prodPanel(base, item) {
    var wide = !!item.group;
    var cols = '<div>' + (wide ? '<p class="hp-prod__colh">The product</p>' : '') + linkList(base, item.links) + '</div>';
    if (wide) cols += '<div class="hp-prod__div"><p class="hp-prod__colh">' + esc(item.group.title) + '</p>' + linkList(base, item.group.links) + '</div>';
    return '<div class="hp-prod' + (wide ? ' hp-prod--wide' : '') + '">' +
      '<div class="hp-prod__head"><span class="hp-prod__ic"><img src="' + p(base, item.icon) + '" alt="" loading="lazy"></span>' +
      '<span class="hp-prod__ht"><span class="hp-prod__name">' + esc(item.label) + '</span><span class="hp-prod__tag">' + esc(item.tag) + '</span></span></div>' +
      '<div class="hp-prod__cols">' + cols + '</div></div>';
  }
  function richItem(base, r) {
    return '<a class="hp-mega__item" href="' + p(base, r.href) + '"><span class="hp-mega__ic"><img src="' + p(base, r.icon) + '" alt="" loading="lazy"></span><span class="hp-mega__itxt"><strong>' + esc(r.label) + '</strong><em>' + esc(r.desc) + '</em></span></a>';
  }
  function megaPanel(base, item) {
    if (item.links) return prodPanel(base, item);
    if (item.rich) return '<div class="hp-mega hp-mega--row hp-mega--platform">' + item.rich.map(function (r) { return richItem(base, r); }).join('') + '</div>';
    if (item.industries) return '<div class="hp-mega hp-mega--row hp-mega--industries">' + item.industries.map(function (r) { return richItem(base, r); }).join('') + '<a class="hp-mega__item hp-mega__item--all" href="' + p(base, 'solutions/industries/index.html') + '">All industries &#8594;</a></div>';
    if (item.resources) return '<div class="hp-mega hp-mega--row hp-mega--platform hp-mega--resources">' + item.resources.map(function (r) { return richItem(base, r); }).join('') + '</div>';
    return '';
  }
  function renderLinks(base) {
    return NAV.map(function (item) {
      var hasMenu = !!(item.links || item.rich || item.industries || item.resources);
      var rel = item.links ? ' hp-nav__item--rel' : '';
      var top = '<a class="hp-nav__link" href="' + p(base, item.topHref || '#') + '">' + esc(item.label) + (hasMenu ? caret : '') + '</a>';
      return '<div class="hp-nav__item' + rel + '">' + top + megaPanel(base, item) + '</div>';
    }).join('');
  }
  function renderActions(base) {
    return '<a class="hp-nav__login" href="' + p(base, 'login.html') + '">Login</a>' +
      '<a class="hp-nav__contact" href="' + p(base, 'contact.html') + '">Contact</a>' +
      '<button class="hp-nav__burger" type="button" data-nav-burger data-base="' + base + '" aria-expanded="false" aria-label="Open menu">' +
        '<svg class="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        '<svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>';
  }

  /* ---- mobile panel, built from the same NAV array ---- */
  function renderMobile(base) {
    var groups = NAV.map(function (item) {
      var links = [];
      if (item.topHref) links.push('<a class="is-top" href="' + p(base, item.topHref) + '">' + esc(item.label) + ' overview</a>');
      if (item.links) links = links.concat(item.links.map(function (lk) { return '<a href="' + p(base, lk[1]) + '">' + esc(lk[0]) + '</a>'; }));
      if (item.group) links = links.concat(item.group.links.map(function (lk) { return '<a href="' + p(base, lk[1]) + '">' + esc(lk[0]) + '</a>'; }));
      ['rich', 'industries', 'resources'].forEach(function (k) {
        if (item[k]) links = links.concat(item[k].map(function (r) { return '<a href="' + p(base, r.href) + '">' + esc(r.label) + '</a>'; }));
      });
      if (!links.length) return '';
      return '<div class="hp-mnav__grp"><p class="hp-mnav__h">' + esc(item.label) + '</p><div class="hp-mnav__links">' + links.join('') + '</div></div>';
    }).join('');
    return '<div class="hp-mnav__inner">' + groups +
      '<div class="hp-mnav__cta">' +
        '<a class="np-btn np-btn--primary np-btn--sm" href="' + p(base, 'request-demo.html') + '"><span>Request a demo</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>' +
        '<a class="np-btn np-btn--secondary np-btn--sm" href="' + p(base, 'login.html') + '"><span>Login</span></a>' +
        '<a class="np-btn np-btn--secondary np-btn--sm" href="' + p(base, 'contact.html') + '"><span>Contact</span></a>' +
      '</div></div>';
  }
  window.renderSiteNavLinks = renderLinks;
  window.renderSiteNavActions = renderActions;
  window.renderSiteNavMobile = renderMobile;

  /* Delegated so it works whether the header is static HTML or React-rendered. */
  function installBurger() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-nav-burger]');
      var header = document.querySelector('.hp-nav');
      if (!header) return;
      var panel = header.querySelector('.hp-mnav');
      if (btn) {
        e.preventDefault();
        if (!panel) {
          panel = document.createElement('div');
          panel.className = 'hp-mnav';
          panel.innerHTML = renderMobile(btn.getAttribute('data-base') || '');
          header.appendChild(panel);
        }
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        return;
      }
      if (panel && panel.classList.contains('is-open') && !e.target.closest('.hp-mnav')) {
        panel.classList.remove('is-open');
        var b = header.querySelector('[data-nav-burger]');
        if (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Open menu'); }
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.querySelector('.hp-mnav.is-open');
      if (!panel) return;
      panel.classList.remove('is-open');
      var b = document.querySelector('[data-nav-burger]');
      if (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Open menu'); b.focus(); }
    });
  }

  /* ---- site-wide accordion: one open at a time within a group ---- */
  function installAccordions() {
    document.addEventListener('toggle', function (e) {
      var d = e.target;
      if (!d || d.tagName !== 'DETAILS' || !d.open) return;
      var parent = d.parentElement;
      if (!parent) return;
      var sibs = parent.children;
      for (var i = 0; i < sibs.length; i++) {
        if (sibs[i] !== d && sibs[i].tagName === 'DETAILS' && sibs[i].open) sibs[i].open = false;
      }
    }, true);
  }

  function mount() {
    injectCSS();
    var nodes = document.querySelectorAll('[data-site-nav]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = renderLinks(nodes[i].getAttribute('data-base') || '');
    }
    var acts = document.querySelectorAll('[data-site-nav-actions]');
    for (var j = 0; j < acts.length; j++) {
      acts[j].innerHTML = renderActions(acts[j].getAttribute('data-base') || '');
    }
    installAccordions();
    installBurger();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
