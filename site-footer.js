/* =====================================================================
   Enigma Vault — universal site footer.
   SINGLE SOURCE OF TRUTH for the footer. Edit FOOTER below and every
   page (the React home reads the same model via home-data.js) updates.

   Static pages: put
     <footer class="hp-footer" data-site-footer data-base="../"></footer>
   and load this file before </body>. The renderer fills it in,
   prefixing every root-relative href with data-base.
   ===================================================================== */
(function () {
  var AWS = 'https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018';
  var FOOTER = {
    tagline: 'The trust layer for AI and data. Clarity. Control. Confidence.',
    columns: [
      { title: 'Products', links: [
        ['Triplets', 'triplets/overview.html'],
        ['NoPII', 'nopii/overview.html'],
        ['The Vault', 'vault/overview.html'],
        ['Pricing', 'pricing.html'],
      ] },
      { title: 'Vaults', links: [
        ['Card Vault', 'vault/card-vault.html'],
        ['Data Vault', 'vault/data-vault.html'],
        ['File Vault', 'vault/file-vault.html'],
        ['Customer Vault', 'vault/customer-vault.html'],
      ] },
      { title: 'Platform', links: [
        ['Overview', 'platform/overview.html'],
        ['Data Security', 'platform/data-security.html'],
        ['Integrations', 'platform/integrations.html'],
      ] },
      { title: 'Industries', links: [
        ['All industries', 'solutions/industries/index.html'],
        ['Healthcare', 'solutions/industries/index.html#healthcare'],
        ['Financial services', 'solutions/industries/index.html#financial-services'],
        ['Legal', 'solutions/industries/index.html#legal'],
        ['Insurance', 'solutions/industries/index.html#insurance'],
      ] },
      { title: 'Developers', links: [
        ['API docs', 'https://docs.enigmavault.io'],
        ['Swagger UI', 'https://api.enigmavault.io'],
        ['AWS Marketplace', AWS],
        ['Postman collection', 'https://docs.enigmavault.io'],
        ['Status page', 'https://enigmavault.statuspage.io/'],
      ] },
      { title: 'Company', links: [
        ['About', 'company/about.html'],
        ['Blog', 'resources/blog.html'],
        ['Docs', 'resources/docs.html'],
        ['Request a demo', 'request-demo.html'],
        ['Login', 'login.html'],
      ] },
    ],
    legal: '\u00A9 2026 Enigma Vault. All rights reserved.',
    policies: [
      ['Security Policy', 'https://www.enigmavault.io/compliance/Enigma+Vault+Security+Policy.pdf'],
      ['Privacy Policy', 'https://www.enigmavault.io/compliance/Enigma+Vault+Privacy+Policy.pdf'],
    ],
    social: [
      ['LinkedIn', 'https://www.linkedin.com/company/enigma-vault/'],
      ['X', 'https://x.com/NoPII_HQ'],
    ],
  };
  window.SITE_FOOTER = FOOTER;

  /* ---- self-contained styles (token-based; identical on every page) ---- */
  var CSS = '\
.hp-footer{background:var(--surface-page);border-top:1px solid var(--border-hairline);padding:72px 0 36px;}\
.hp-footer__inner{max-width:1280px;margin:0 auto;padding:0 64px;}\
.hp-footer__grid{display:grid;grid-template-columns:1.35fr repeat(6,minmax(0,1fr));gap:26px;}\
.hp-footer__brandtag{font-family:var(--ev-font-sans);font-size:14px;color:var(--text-secondary);margin-top:18px;max-width:250px;line-height:1.55;}\
.hp-footer__logolink{display:inline-block;line-height:0;}\
.hp-footer__logo{height:58px;width:auto;max-width:none;object-fit:contain;display:block;}\
.hp-footer__col h4{font-family:var(--ev-font-sans);font-size:12px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:var(--ev-slate);margin:0 0 16px;}\
.hp-footer__col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;}\
.hp-footer__col a{font-family:var(--ev-font-sans);font-size:14px;color:var(--ev-ink);text-decoration:none;}\
.hp-footer__col a:hover{color:var(--ev-mineral-blue);text-decoration:underline;text-underline-offset:3px;}\
.hp-footer__bottom{font-family:var(--ev-font-sans);display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:52px;padding-top:26px;border-top:1px solid var(--border-hairline);font-size:12px;color:var(--text-secondary);}\
.hp-footer__legal{display:flex;align-items:center;gap:22px;flex-wrap:wrap;}\
.hp-footer__policies{display:flex;align-items:center;gap:18px;flex-wrap:wrap;}\
.hp-footer__policies a{color:var(--ev-slate);text-decoration:none;}\
.hp-footer__policies a:hover{color:var(--ev-mineral-blue);text-decoration:underline;text-underline-offset:3px;}\
.hp-footer__social{display:flex;gap:18px;}\
.hp-footer__social a{color:var(--ev-slate);text-decoration:none;}\
.hp-footer__social a:hover{color:var(--ev-mineral-blue);}\
@media (max-width:1200px){.hp-footer__grid{grid-template-columns:1fr repeat(3,minmax(0,1fr));row-gap:38px;}}\
@media (max-width:1023px){.hp-footer__inner{padding:0 32px;}.hp-footer__grid{grid-template-columns:1fr 1fr 1fr;row-gap:38px;}}\
@media (max-width:600px){.hp-footer__inner{padding:0 20px;}.hp-footer__grid{grid-template-columns:1fr;}}';
  function injectCSS() {
    if (document.getElementById('ev-site-footer-css')) return;
    var s = document.createElement('style');
    s.id = 'ev-site-footer-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function isAbs(h) { return !h || h.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(h); }
  function p(base, h) { return isAbs(h) ? h : base + h; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function ext(h) { return /^https?:/.test(h); }
  function logo(base) { return p(base, 'assets/logo/lockup-transparent.png'); }

  function link(base, pair) {
    var h = pair[1], t = ext(h) ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + p(base, h) + '"' + t + '>' + esc(pair[0]) + '</a>';
  }

  function render(base) {
    var cols = FOOTER.columns.map(function (c) {
      var items = c.links.map(function (lk) { return '<li>' + link(base, lk) + '</li>'; }).join('');
      return '<div class="hp-footer__col"><h4>' + esc(c.title) + '</h4><ul>' + items + '</ul></div>';
    }).join('');
    var policies = FOOTER.policies.map(function (lk) { return link(base, lk); }).join('');
    var social = FOOTER.social.map(function (lk) { return link(base, lk); }).join('');
    return '<div class="hp-footer__inner">' +
      '<div class="hp-footer__grid">' +
        '<div><a class="hp-footer__logolink" href="' + (base || './') + '" aria-label="Enigma Vault home"><img class="hp-footer__logo" src="' + logo(base) + '" alt="Enigma Vault"></a>' +
        '<p class="hp-footer__brandtag">' + esc(FOOTER.tagline) + '</p></div>' +
        cols +
      '</div>' +
      '<div class="hp-footer__bottom">' +
        '<div class="hp-footer__legal"><span>' + esc(FOOTER.legal) + '</span>' +
          '<nav class="hp-footer__policies">' + policies + '</nav></div>' +
        '<div class="hp-footer__social">' + social + '</div>' +
      '</div>' +
    '</div>';
  }
  window.renderSiteFooter = render;

  function mount() {
    injectCSS();
    var nodes = document.querySelectorAll('[data-site-footer]');
    for (var i = 0; i < nodes.length; i++) {
      var base = nodes[i].getAttribute('data-base') || '';
      nodes[i].innerHTML = render(base);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
