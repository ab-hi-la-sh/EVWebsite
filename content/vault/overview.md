---
title: "Data Tokenization & Encryption API"
metaTitle: "Data Tokenization & Encryption API | Enigma Vault"
description: "Explore Card Vault, Data Vault, File Vault and Customer Vault for payment tokenization, encrypted records, file storage and secure customer intake."
ogImage: "/assets/og/vault-overview.jpg"
ogImageAlt: "Take sensitive data off your books. — Enigma Vault"
styles: ["vaults.css", "pages/vault-overview.css"]
scripts: ["pages/vault-overview.js"]
---

<!-- SECTION 1 · Hero -->
  <header class="np-hero vault-overview-hero">
    <div class="np-container np-hero__inner">
      <div class="np-hero__copy">
        <h1 class="np-h1">Data tokenization that keeps <em>your applications working</em>.</h1>
        <p class="np-lead">Enigma Vault is a data tokenization API that holds your customers&rsquo; most sensitive data, so a breach of your systems exposes nothing worth stealing. Cards, personal data, files, and customer intake, all behind one API, with millions of secrets already encrypted and zero plaintext stored.</p>
        <div class="np-hero__ctas">
          <a class="np-btn np-btn--primary" href="https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018" target="_blank" rel="noopener"><span>Free on AWS Marketplace</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>
          <a class="np-btn np-btn--secondary" href="https://docs.enigmavault.io"><span>Read the docs</span></a>
        </div>
        <p class="np-note"><span class="np-note__dot"></span>PCI DSS Level 1 &middot; SOC 2 Type II &middot; 99.99% uptime SLA &middot; AWS Partner</p>
      </div>
      <div class="np-hero__visual vault-hero">
        <div class="vault-hero__art">
          <img class="vault-hero__img" src="/assets/vault-hero-prism.png" alt="" aria-hidden="true">
        </div>
      </div>
    </div>
  </header>

  <!-- Trust line (PCI DSS / SOC 2) — directly under the hero -->
  <section class="np-section np-proof">
    <div class="np-container">
      <div class="np-stats np-reveal">
        <div class="np-stat"><div class="np-stat__num">PCI DSS L1</div><div class="np-stat__label">the highest level of payment data compliance</div></div>
        <div class="np-stat"><div class="np-stat__num">SOC 2 Type II</div><div class="np-stat__label">audited controls for security and availability</div></div>
        <div class="np-stat"><div class="np-stat__num">99.99%</div><div class="np-stat__label">uptime SLA on a managed, per-tenant platform</div></div>
        <div class="np-stat"><div class="np-stat__num">AWS Partner</div><div class="np-stat__label">procured and billed through AWS Marketplace</div></div>
      </div>
    </div>
  </section>

  <!-- SECTION 2 · The problem -->
  <section class="np-section np-rule-top np-bg-cloud">
    <div class="np-container">
      <div style="max-width:820px"><h2 class="np-h2">The data you hold is the <em>liability you carry</em>.</h2></div>
      <div class="np-cols np-cols--2" style="margin-top:44px">
        <div class="np-col">
          <h3 class="np-col__title">The data problem</h3>
          <p class="np-col__body">Every record of card numbers, personal data, and sensitive files you store is a breach waiting to become someone's headline, and an audit scope that grows every year. The safest data is the data you never hold in the clear.</p>
        </div>
        <div class="np-col">
          <h3 class="np-col__title">The stack problem</h3>
          <p class="np-col__body">Most teams bolt a tokenization vendor to an encrypted-storage tool to a homegrown intake form. Three integrations, three audits, three bills, and the seams between them are where data leaks.</p>
        </div>
      </div>
      <div class="tr-heur--strip" style="margin-top:30px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4-3 6.6-7 9-4-2.4-7-5-7-9V6z"/></svg>
        <p>Enigma Vault is <b>one trust layer, one integration, one compliance boundary</b>.</p>
      </div>
    </div>
  </section>

      <!-- CTA rail -->
  <section class="vp-cta">
    <div class="vp-cta__inner">
      <div class="vp-cta__tx"><p class="vp-cta__k">Free tier</p><p class="vp-cta__h">Free allowances are available for Card Vault, Data Vault, File Vault and NoPII. Customer Vault, Agent Vault and Triplets are priced by engagement. <a href="/pricing/#vault">See Vault pricing</a>.</p></div>
      <div class="vp-cta__btns">
        <a class="np-btn np-btn--primary" href="https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018" target="_blank" rel="noopener"><span>Get started free</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>
        <a class="np-btn np-btn--secondary" href="/pricing/#vault"><span>See pricing</span></a>
      </div>
    </div>
  </section>

  <!-- SECTION 4 · The three vaults -->
  <section class="np-section np-rule-top np-grid">
    <div class="np-container">
      <div style="max-width:760px">
        <h2 class="np-h2">Four vaults. <em>One trust layer</em>.</h2>
        <p class="np-lead">Each vault solves a different shape of the same problem: holding sensitive data so you do not have to. Use one, or use them together through a single integration. Each has its own page with full depth.</p>
      </div>
      <div class="np-cards np-cards--4">
        <article class="np-card np-reveal">
          <div class="np-card__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg></div>
          <h3 class="np-card__title">Card Vault</h3>
          <p class="np-card__body">Accept payments without ever holding a card. Cards are tokenized at capture through hosted forms, Twilio Pay IVR, or the API, then charged through any gateway via signed proxy: Authorize.net, Stripe, Braintree, PayPal, or any REST processor. Luhn-passable tokens, ephemeral CVV with 30-minute auto-purge, and one way in with no way out except through our proxy.</p>
          <p style="margin-top:18px"><a class="np-btn np-btn--secondary np-btn--sm" href="/vault/card-vault/"><span>Explore Card Vault</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a></p>
        </article>
        <article class="np-card np-reveal">
          <div class="np-card__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg></div>
          <h3 class="np-card__title">Data Vault</h3>
          <p class="np-card__body">Encrypt any field. Still search it. AES-256 field-level encryption that stays searchable, deterministic tokens that preserve lookups and joins, batch operations up to 5,000 secrets per request, custom identifiers, and ephemeral key sharing across clients.</p>
          <p style="margin-top:18px"><a class="np-btn np-btn--secondary np-btn--sm" href="/vault/data-vault/"><span>Explore Data Vault</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a></p>
        </article>
        <article class="np-card np-reveal">
          <div class="np-card__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><rect x="9" y="12" width="6" height="5" rx="1"/><path d="M10.5 12v-1.5a1.5 1.5 0 0 1 3 0V12"/></svg></div>
          <h3 class="np-card__title">File Vault</h3>
          <p class="np-card__body">Store any file. Hand out access that expires. Encrypted object storage from kilobytes to 5GB under AES-GCM envelope encryption, with presigned upload and download URLs, real-time file status over WebSocket, and a full audit trail on every touch.</p>
          <p style="margin-top:18px"><a class="np-btn np-btn--secondary np-btn--sm" href="/vault/file-vault/"><span>Explore File Vault</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a></p>
        </article>
        <article class="np-card np-reveal">
          <div class="np-card__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11l-3 3-2-2"/></svg></div>
          <h3 class="np-card__title">Customer Vault</h3>
          <p class="np-card__body">Collect sensitive data without building a thing. A turnkey, branded intake app that replaces fax and email: no-login links, a staff inbox, secure file sharing, e-signatures, custom sensitive fields, WebAuthn passkeys, and enforced MFA. Live the same day, with a full lifecycle API and webhooks when you want them.</p>
          <p style="margin-top:18px"><a class="np-btn np-btn--secondary np-btn--sm" href="/vault/customer-vault/"><span>Explore Customer Vault</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a></p>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION 5 · The API in brief + closing value (sticky-left, scroll-reveal-right) -->
  <section class="np-section np-rule-top np-bg-cloud">
    <div class="np-container vault-stick__grid">
      <div class="vault-stick__left">
        <h2 class="np-h2">One API for <em>every kind</em> of sensitive data.</h2>
        <p class="np-split__body">Developer-first REST API. Two-line integration. Your developers ship in a day, not a quarter.</p>
        <div class="vault-stick__cta">
          <a class="np-btn np-btn--primary" href="https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018" target="_blank" rel="noopener"><span>Try it for free</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>
          <a class="np-btn np-btn--secondary" href="/vault/how-it-works/"><span>How it works</span></a>
        </div>
      </div>
      <div class="vault-stick__right">
        <div class="np-col vault-line"><h3 class="np-col__title">Encryption you do not manage</h3><p class="np-col__body">AES-256-CBC fields with unique per-field initialization vectors, AES-GCM envelope encryption for files, managed KMS, automatic rotation.</p></div>
        <div class="np-col vault-line"><h3 class="np-col__title">Access locked down</h3><p class="np-col__body">OAuth2 machine-to-machine auth, per-tenant IP whitelisting, full audit logging with distributed tracing, CSPRNG tokens with 128-bit entropy.</p></div>
        <div class="np-col vault-line"><h3 class="np-col__title">Sharing without standing access</h3><p class="np-col__body">One-time-use ephemeral keys that expire and self-destruct.</p></div>
        <div class="np-col vault-line"><h3 class="np-col__title">Built to integrate fast</h3><p class="np-col__body">REST v1.13, live Swagger UI at api.enigmavault.io, video walkthroughs, a live card demo, and examples on GitHub.</p></div>
        <div class="np-col vault-line"><h3 class="np-col__title">Your systems stay clean</h3><p class="np-col__body">The sensitive data lives in the vault, not your database.</p></div>
      </div>
    </div>
  </section>

      <!-- CTA rail -->
  <section class="vp-cta">
    <div class="vp-cta__inner">
      <div class="vp-cta__tx"><p class="vp-cta__k">Integration</p><p class="vp-cta__h">Two calls to a token. The Swagger UI is live at api.enigmavault.io.</p></div>
      <div class="vp-cta__btns">
        <a class="np-btn np-btn--primary" href="/vault/how-it-works/"><span>How it works</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>
        <a class="np-btn np-btn--secondary" href="/request-demo/"><span>Request a demo</span></a>
      </div>
    </div>
  </section>

  <!-- SECTION 6 · Proven where the data is heaviest -->
  <section class="np-section np-rule-top">
    <div class="np-container">
      <div style="max-width:820px"><h2 class="np-h2">Proven where <em>the data is heaviest</em>.</h2></div>
      <p class="np-split__body" style="max-width:78ch">Government agencies encrypting tax and justice records. Healthcare teams meeting HIPAA at the field level. Financial platforms tokenizing cards without PCI scope in their codebase. Universities protecting student records through enrollment surges. Law firms, insurers, and enterprises of every size, starting free and scaling on the same certified infrastructure.</p>
      <div class="np-ctas" style="margin-top:30px"><a class="np-btn np-btn--secondary" href="/vault/use-cases/"><span>See the use cases</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a></div>
    </div>
  </section>

  <!-- SECTION 7 · Final CTA -->
  <section class="np-section np-ctaband np-rule-top" id="aws">
    <div class="np-container">
      <div class="np-ctaband__inner">
        <h2 class="np-h2">Start free. Scope shrinks, <em>not your roadmap</em>.</h2>
        <p class="np-ctaband__body">Spin up a vault on AWS Marketplace, move your sensitive data behind it, and watch your breach exposure and audit scope shrink. No contract to start.</p>
        <div class="np-ctaband__ctas">
          <a class="np-btn np-btn--primary" href="https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018" target="_blank" rel="noopener"><span>Free on AWS Marketplace</span><span class="np-btn__arrow" aria-hidden="true">&#8594;</span></a>
          <a class="np-btn np-btn--secondary" href="/pricing/#vault"><span>See pricing</span></a>
        </div>
      </div>
    </div>
  </section>
