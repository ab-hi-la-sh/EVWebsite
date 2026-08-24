/* global React */
const EV = window.EnigmaVaultDesignSystem_c6ec97;
const { Button, TextLink } = EV;
const HP = window.HP;
const { HeroArt, StackDiagram, ProductGlyph } = window;

/* ---------- helpers ---------- */
function Reveal({ as = 'div', className = '', delay = 0, style = {}, children, ...rest }) {
  const Tag = as;
  return (
    <Tag className={`hp-reveal ${className}`} style={{ animationDelay: delay ? delay + 'ms' : undefined, ...style }} {...rest}>
      {children}
    </Tag>);

}

function Check({ size = 16 }) {
  return (
    <svg className="hp-check" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>);

}

/* ---------- NavBar ---------- */
function NavBar() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`hp-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="hp-nav__inner">
        <a className="hp-nav__brandlink" href="index.html" aria-label="Enigma Vault home">
          <img className="hp-nav__logo" src={typeof window !== 'undefined' && window.__resources && window.__resources.logoLockup || "assets/logo/lockup-transparent.png"} alt="Enigma Vault" />
        </a>
        <div className="hp-nav__links" dangerouslySetInnerHTML={{ __html: window.renderSiteNavLinks('') }} />
        <div className="hp-nav__actions" dangerouslySetInnerHTML={{ __html: window.renderSiteNavActions('') }} />
      </div>
    </nav>);

}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <header className="hp-hero" id="top">
      <div className="hp-container hp-hero__inner">
        <div className="hp-hero__copy">
          <p className="hp-hero__eyebrow">The trust layer between your data and AI.</p>
          <h1>Nothing fabricated. Nothing leaked. <span className="hp-em">Nothing exposed.</span></h1>
          <p className="hp-hero__sub">{HP.hero.sub}</p>
          <div className="hp-hero__ctas">
            <Button size="lg" arrow href="request-demo.html">{HP.hero.cta1}</Button>
            <Button size="lg" variant="secondary" arrow href={window.AWS_MP}>{HP.hero.cta2}</Button>
          </div>
        </div>
        <div className="hp-hero__art" data-px="-0.04">
          <HeroArt />
        </div>
      </div>
    </header>);

}

/* ---------- Trust bar ---------- */
function TrustBar() {
  return (
    <section className="hp-trust">
      <div className="hp-trust__inner">
        <span className="hp-trust__lead">Certified &amp; audited</span>
        {HP.trust.map((t) =>
        <span className="hp-trust__item" key={t}><Check />{t}</span>
        )}
      </div>
      <p className="hp-trust__sub">{HP.trustSub}</p>
    </section>);

}

/* ---------- Stack centerpiece — Direction A (text left, diagram right) ---------- */
function StackLayer({ layer }) {
  return (
    <div className="hp-layer">
      <div className="hp-layer__tile"><ProductGlyph prod={layer.prod} size={50} /></div>
      <div className="hp-layer__copy">
        <p className="hp-layer__prod"><span>{layer.n}</span>{layer.prod}</p>
        <h3 className="hp-layer__head">{layer.head}</h3>
        <p className="hp-layer__body"><strong className="hp-layer__lead">{layer.lead}</strong> {layer.body}</p>
        <div className="hp-layer__meta">
          <span className="hp-layer__proof"><span>How it works, in one line:</span>{layer.proof}</span>
          <TextLink href={layer.href} size="sm">{layer.link}</TextLink>
        </div>
      </div>
    </div>);

}

function Stack() {
  const s = HP.stack;
  return (
    <section className="hp-section hp-rule-top" id="platform">
      <div className="hp-container">
        <Reveal className="hp-stack__head">
          <h2 className="hp-h2">Three layers of trust. <span className="hp-em">One foundation.</span></h2>
          <p className="hp-lead">{s.intro}</p>
        </Reveal>
        <div className="hp-stack__split">
          <Reveal className="hp-stack__rows">
            {s.layers.map((layer) => <StackLayer key={layer.prod} layer={layer} />)}
          </Reveal>
          <div className="hp-stack__figure">
            <StackDiagram />
            <div className="hp-stack__cap">output at the top · data at the foundation</div>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Reveal, Check, NavBar, Hero, TrustBar, Stack });