/* Enigma Vault home page — content model (copy source: uploads/enigma-website-copy/index.md) */
/* Standalone-asset resolver: in a bundled/offline file window.__resources maps
   original asset paths to blob URLs; live (served) pages fall through to the path. */
window.RS = window.RS || function (p) { return (window.__resources && window.__resources[p]) || p; };
window.AWS_MP = 'https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018';
window.HP = {
  nav: (window.SITE_NAV || []),
  hero: {
    eyebrow: 'The trust layer between your data and AI.',
    title: 'Nothing fabricated. Nothing leaked. Nothing exposed.',
    sub: 'Enigma Vault is the trust layer between your data and AI. Verified answers. Protected prompts. Secured data. Three products, one certified foundation.',
    cta1: 'Request a demo',
    cta2: 'Start free on AWS Marketplace',
  },
  trust: ['PCI DSS Level 1', 'SOC 2 Type II', '99.99% uptime SLA', 'AWS Partner'],
  trustSub: 'AES-256 encryption standard. Millions of secrets encrypted. Zero plaintext stored.',
  stack: {
    title: 'Three layers of trust. One foundation.',
    intro: 'Every AI feature has three places where trust can break: the answer it gives, the prompt it sends, and the data underneath. Each layer is a product you can buy on its own. Together, they share one foundation, one set of keys, and one audit trail.',
    layers: [
      {
        n: '01', prod: 'Triplets',
        head: 'Trust the output.',
        lead: 'Confidently wrong ends here.',
        body: 'Triplets checks every AI answer against evidence you approve, and refuses when the evidence cannot support one. A confident wrong answer never reaches your user, because it never gets generated.',
        proof: 'compile, verify, refuse when unsupported.', link: 'Explore Triplets', href: 'triplets/overview.html',
      },
      {
        n: '02', prod: 'NoPII',
        head: 'Trust the input.',
        lead: 'What the model never sees, it can never leak.',
        body: 'Every prompt is scanned for sensitive data and tokenized before it leaves your environment, then restored in the response. The model reasons normally. The provider never sees a real identifier.',
        proof: 'detect, tokenize, restore.', link: 'Explore NoPII', href: 'nopii/overview.html',
      },
      {
        n: '03', prod: 'The Vault',
        head: 'Trust the data underneath.',
        lead: 'Take sensitive data off your books.',
        body: 'Cards, fields, files, and customer records are tokenized and encrypted on certified infrastructure. Your systems hold tokens that still work. The real values live in the vault.',
        proof: 'capture, vault, reference.', link: 'Explore the Vault', href: 'vault/overview.html',
      },
    ],
  },
  proof: {
    title: 'Proof, not promises.',
    sub: 'Each layer earns trust with a hard fact, measured on your own data.',
    items: [
      { prod: 'Triplets', value: '0', unit: 'confidently wrong answers, by design', body: 'The system refuses rather than fabricates. Refusals are logged and reported, so \u201Cwrong but confident\u201D is engineered out rather than merely reduced.' },
      { prod: 'NoPII', value: '35+', unit: 'categories of sensitive data tokenized', body: 'Before prompts leave your environment, validated against a published 109-test benchmark, across 9+ LLM providers. Live in under five minutes.' },
      { prod: 'The Vault', value: 'AES-256', unit: 'encryption with per-tenant key isolation', body: 'Full audit logging, on PCI DSS Level 1 and SOC 2 Type II infrastructure. Free to start on AWS Marketplace.' },
    ],
  },
  who: {
    title: 'Built for teams shipping AI they have to stand behind.',
    body: 'For the people who own the consequences when AI gets it wrong:',
    personas: [
      { icon: 'cpu', text: 'Heads of AI and platform, whose product cannot give a confident wrong answer.' },
      { icon: 'git-branch', text: 'Engineering and compliance, who cannot let customer data leave the building.' },
      { icon: 'lock', text: 'CISOs, who answer for every record at rest.' },
    ],
  },
  industry: {
    title: 'The same three exposures, in every regulated industry.',
    intro: 'Healthcare, financial services, legal, insurance, and every other regulated sector carry the same three liabilities: wrong answers, leaked identifiers, and stored data. The acronyms change. The exposures do not.',
    sectors: [
      ['Healthcare', 'assets/industries/healthcare.png', 'solutions/industries/index.html#healthcare'],
      ['Financial services', 'assets/industries/financial.png', 'solutions/industries/index.html#financial-services'],
      ['Legal', 'assets/industries/legal.png', 'solutions/industries/index.html#legal'],
      ['Insurance', 'assets/industries/insurance.png', 'solutions/industries/index.html#insurance'],
    ],
    cta: 'Find your industry', ctaHref: 'solutions/industries/index.html',
  },
  compete: {
    title: 'You can\u2019t build your way out of this. Or prompt your way out of it.',
    blocks: [
      { h: 'The build trap.', body: 'Stitch together a reliability library, a redaction proxy, a token vault, and the glue between them. Three integrations, three audits, three bills, and the seams are where trust leaks.' },
      { h: 'The prompt trap.', body: 'Prompt it, fine-tune it, force it deterministic. A prompt is a request, not a constraint, and a model cannot police its own output.' },
    ],
    resolveLead: 'Trust has to be enforced as infrastructure, outside the application and outside the model.',
    resolveStrong: 'That is what the trust layer is.',
  },
  resources: {
    title: 'Go deeper before you have to.',
    featured: { tag: 'Featured whitepaper', title: 'The trust stack.', body: 'A reference architecture for teams putting regulated AI into production: where each layer sits, what it enforces, and how the three compose on one foundation.' },
    postsLead: 'Also on the blog:',
    posts: [
      { tag: 'Blog', title: 'Tokenizing prompts: the NoPII benchmark, explained.' },
      { tag: 'Blog', title: 'Why a confident wrong answer is a liability, not a bug.' },
      { tag: 'Blog', title: 'Build vs. buy: the real cost of the stitched-together stack.' },
      { tag: 'Blog', title: 'Starting on AWS Marketplace: the Vault in an afternoon.' },
    ],
    all: 'Browse all resources', allHref: 'resources/blog.html',
  },
  closing: {
    title: 'Start with the layer you cannot afford to get wrong.',
    body: 'Pick the exposure that is most urgent today. Add the next layer when you need it. The foundation, the keys, and the audit trail are already there.',
    cta1: 'Request a demo',
    cta2: 'Start free on AWS Marketplace',
  },
  footer: {
    columns: [
      { title: 'Product', links: [['Triplets', 'triplets/overview.html'], ['NoPII', 'nopii/overview.html'], ['The Vault', 'vault/overview.html']] },
      { title: 'Platform', links: [['Overview', 'platform/overview.html'], ['Data Security', 'platform/data-security.html'], ['Integrations', 'platform/integrations.html']] },
      { title: 'Industries', links: [['All industries', 'solutions/industries/index.html'], ['Healthcare', 'solutions/industries/index.html#healthcare'], ['Financial services', 'solutions/industries/index.html#financial-services'], ['Legal', 'solutions/industries/index.html#legal'], ['Insurance', 'solutions/industries/index.html#insurance']] },
      { title: 'Resources', links: [['Blogs', 'resources/blog.html'], ['Docs', 'resources/docs.html'], ['AWS Marketplace', 'https://aws.amazon.com/marketplace/seller-profile?id=c77b8db1-5511-48b7-8ce5-9a8d4a1a8018']] },
      { title: 'Company', links: [['About', 'company/about.html'], ['Request a demo', 'request-demo.html'], ['Login', 'login.html']] },
    ],
    tagline: 'The trust layer for AI and data. Clarity. Control. Confidence.',
    legal: '© 2026 Enigma Vault. All rights reserved.',
    policies: [['Security Policy', 'https://www.enigmavault.io/compliance/Enigma+Vault+Security+Policy.pdf'], ['Privacy Policy', 'https://www.enigmavault.io/compliance/Enigma+Vault+Privacy+Policy.pdf'], ['Status Page', 'https://enigmavault.statuspage.io/']],
    social: [['LinkedIn', 'https://www.linkedin.com/company/enigma-vault/'], ['X', 'https://x.com/NoPII_HQ']],
  },
  PROD: { T: 'Triplets', N: 'NoPII', V: 'Vault' },
};
