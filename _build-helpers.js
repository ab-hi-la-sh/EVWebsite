/* Build helpers for the vault product pages. Not shipped to the browser —
   eval'd by the page generator scripts so the shell stays in one place. */
var AWS="https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018";
var DOCS="https://docs.enigmavault.io";
var B="../";
var IC={
 check:'<path d="M20 6 9 17l-5-5"/>',
 hash:'<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
 fingerprint:'<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>',
 shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
 clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
 key:'<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L18.9 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
 route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
 lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 db:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m6.08 10.37-3.5 1.59a1 1 0 0 0 0 1.83l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.48-1.59"/>',
 tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".8" fill="currentColor"/>',
 share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
 trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
 file:'<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h5"/>',
 upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
 activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
 pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 form:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10M7 12h6M7 16h4"/>',
 webhook:'<path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/><path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"/><path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"/>',
 bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
 globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
 scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
 plane:'<path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7L8 11l-2 5 2 2 5-2 3.1 4.1a1 1 0 0 0 1.7-.9"/>',
 server:'<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
 gavel:'<path d="m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
 utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2z"/>',
 home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
 calc:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h．01M12 14h.01M8 18h.01M12 18h.01"/>',
 umbrella:'<path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M2 12a10 10 0 0 1 20 0Z"/>',
 heartPulse:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78a1 1 0 0 0 1.41 0l7.78-7.78a5.5 5.5 0 0 0 0-7.78z"/><path d="M3.5 12h3l1.5-3 3 6 1.5-3h3"/>',
 building:'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
 batch:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/>',
 eye:'<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
 wifi:'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/>',
};
function svg(k,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.6)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>';}
var tick='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.check+'</svg>';
function li(t){return '          <li>'+tick+'<span>'+t+'</span></li>';}
function badge(k,t){return '<span class="vp-badge">'+svg(k,1.8)+t+'</span>';}
function ctaRail(o){return '\n  <!-- CTA rail -->\n  <section class="vp-cta">\n    <div class="vp-cta__inner">\n      <div class="vp-cta__tx"><p class="vp-cta__k">'+o.k+'</p><p class="vp-cta__h">'+o.h+'</p></div>\n      <div class="vp-cta__btns">\n        <a class="np-btn np-btn--primary" href="'+o.h1+'"'+(o.b1?' target="_blank" rel="noopener"':'')+'><span>'+o.l1+'</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>\n        <a class="np-btn np-btn--secondary" href="'+o.h2+'"'+(o.b2?' target="_blank" rel="noopener"':'')+'><span>'+o.l2+'</span></a>\n      </div>\n    </div>\n  </section>\n';}
var VAULTS={
 card:['Card Vault','card-vault.html','Payments without card custody','hero-card.png'],
 data:['Data Vault','data-vault.html','Searchable field encryption','hero-data.png'],
 file:['File Vault','file-vault.html','Encrypted files, expiring access','hero-file.png'],
 customer:['Customer Vault','customer-vault.html','Secure intake, no code','hero-customer.png'],
};
function others(cur){
  var ks=Object.keys(VAULTS).filter(function(k){return k!==cur;});
  return '\n  <!-- The other vaults -->\n  <section class="vp-others">\n    <div class="np-container">\n      <p class="vp-others__h">The other vaults</p>\n      <div class="vp-others__grid">\n'+
    ks.map(function(k){return '        <a class="vp-other" href="'+VAULTS[k][1]+'"><span class="vp-other__art"><img src="'+B+'assets/vault/'+VAULTS[k][3]+'" alt="" loading="lazy"></span><span class="vp-other__tx"><strong>'+VAULTS[k][0]+'</strong><em>'+VAULTS[k][2]+'</em></span></a>';}).join('\n')+
    '\n      </div>\n    </div>\n  </section>\n';
}
function shell(p,body){
  var DS=B+'_ds/enigma-vault-design-system-c6ec97e5-9180-4fd4-ac22-cbb8ea807d04/tokens/';
  var css=['fonts','colors','palette','typography','spacing','base'].map(function(t){return '<link rel="stylesheet" href="'+DS+t+'.css">';}).join('\n');
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+
'<title>'+p.title+'</title>\n<meta name="description" content="'+p.desc+'">\n'+
"<script>document.documentElement.className += ' np-js';<\/script>\n\n"+css+'\n'+
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'+
'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">\n'+
'<link rel="stylesheet" href="'+B+'nopii/nopii.css">\n<link rel="stylesheet" href="vaults.css">\n'+
'<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\n {"@type":"ListItem","position":1,"name":"The Vault","item":"https://www.enigmavault.io/vault/overview.html"},\n {"@type":"ListItem","position":2,"name":"'+p.crumb+'","item":"https://www.enigmavault.io/vault/'+p.file+'"}]}\n<\/script>\n'+
'</head>\n<body>\n\n<header class="hp-nav">\n  <div class="hp-nav__inner">\n    <a class="hp-nav__brandlink" href="'+B+'" aria-label="Enigma Vault home">\n      <img class="hp-nav__logo" src="'+B+'assets/logo/lockup-transparent.png" alt="Enigma Vault">\n    </a>\n    <div class="hp-nav__links" data-site-nav data-base="'+B+'"></div>\n    <div class="hp-nav__actions" data-site-nav-actions data-base="'+B+'"></div>\n  </div>\n</header>\n\n'+
'<main data-screen-label="'+p.crumb+'">\n\n  <!-- SECTION 1 \u00b7 Hero -->\n  <header class="np-hero vp-hero">\n    <div class="np-container np-hero__inner">\n      <div class="np-hero__copy">\n'+
'        <nav class="vp-crumb" aria-label="Breadcrumb"><a href="overview.html">The Vault</a><span class="vp-crumb__sep">/</span><span aria-current="page">'+p.crumb+'</span></nav>\n'+
'        <h1 class="np-h1">'+p.h1+'</h1>\n        <p class="np-lead">'+p.lead+'</p>\n'+
'        <div class="np-hero__ctas">\n          <a class="np-btn np-btn--primary" href="'+p.c1h+'"'+(p.c1b?' target="_blank" rel="noopener"':'')+'><span>'+p.c1+'</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>\n          <a class="np-btn np-btn--secondary" href="'+p.c2h+'"'+(p.c2b?' target="_blank" rel="noopener"':'')+'><span>'+p.c2+'</span></a>\n        </div>\n'+
'        <div class="vp-badges">'+p.badges+'</div>\n      </div>\n'+
'      <div class="np-hero__visual vp-hero__art">\n        <figure class="vp-plate"><img src="'+B+'assets/vault/'+p.art+'" alt=""></figure>\n      </div>\n    </div>\n  </header>\n'+
body+others(p.key)+'\n</main>\n\n<footer class="hp-footer" data-site-footer data-base="'+B+'"></footer>\n\n'+
'<script src="'+B+'site-nav.js"><\/script>\n<script src="'+B+'site-footer.js"><\/script>\n</body>\n</html>\n';
}
