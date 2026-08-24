/* global React */
const EV2 = window.EnigmaVaultDesignSystem_c6ec97;
const { Button: Btn, TextLink: TLink, Card, Icon } = EV2;
const { ResourceArt, ClosingArt } = window;
const HP2 = window.HP;
const Reveal2 = window.Reveal;

/* ---------- Proof ---------- */
function Proof() {
  const p = HP2.proof;
  return (
    <section className="hp-section hp-bg-dark" id="proof">
      <div className="hp-container">
        <Reveal2>
          <p className="hp-proof__eyebrow">Proof</p>
          <h2 className="hp-h2"><span className="hp-em">Proof,</span> not promises.</h2>
          <p className="hp-lead">{p.sub}</p>
        </Reveal2>
        <div className="hp-grid3">
          {p.items.map((it, i) => (
            <Reveal2 key={it.prod} delay={i * 90}>
              <Card padding="marketing" hover style={{ height: '100%' }}>
                <p className="hp-proofcard__prod">{it.prod}</p>
                <div className="hp-proofcard__val">{it.value}{it.unit ? <span>{it.unit}</span> : null}</div>
                <div className="hp-proofcard__rule" />
                <p className="hp-proofcard__body">{it.body}</p>
              </Card>
            </Reveal2>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Who ---------- */
function Who() {
  const w = HP2.who;
  return (
    <section className="hp-section hp-rule-top" id="who">
      <div className="hp-container hp-who">
        <Reveal2>
          <h2 className="hp-h2">Built for teams shipping AI they have to <span className="hp-em">stand behind.</span></h2>
          <p className="hp-who__body">{w.body}</p>
        </Reveal2>
        <Reveal2 className="hp-personas" delay={80}>
          {w.personas.map((per) => (
            <div className="hp-persona" key={per.text}>
              <div className="hp-persona__ic"><Icon name={per.icon} size={22} color="var(--ev-mineral-blue)" /></div>
              <div className="hp-persona__txt">{per.text}</div>
            </div>
          ))}
        </Reveal2>
      </div>
    </section>
  );
}

/* ---------- Industry ---------- */
function Industry() {
  const ind = HP2.industry;
  return (
    <section className="hp-section hp-rule-top hp-bg-cloud" id="industries">
      <div className="hp-container">
        <Reveal2>
          <h2 className="hp-h2">The same three exposures, in <span className="hp-em">every regulated industry.</span></h2>
          <p className="hp-lead">{ind.intro}</p>
        </Reveal2>
        <Reveal2 className="hp-sectors" delay={80}>
          {ind.sectors.map((s) => (
            <a className="hp-sector" href={s[2]} key={s[0]}>
              <span className="hp-sector__ic"><img src={window.RS(s[1])} alt="" loading="lazy" /></span>
              <span className="hp-sector__name">{s[0]}</span>
            </a>
          ))}
        </Reveal2>
        <Reveal2 className="hp-ind__cta"><Btn variant="secondary" arrow href={ind.ctaHref}>{ind.cta}</Btn></Reveal2>
      </div>
    </section>
  );
}

/* ---------- Compete ---------- */
function Compete() {
  const c = HP2.compete;
  return (
    <section className="hp-section hp-rule-top" id="compete">
      <div className="hp-container">
        <Reveal2>
          <h2 className="hp-h2" style={{ maxWidth: '18ch' }}>You <span className="hp-em">can’t build</span> your way out of this. Or <span className="hp-em">prompt</span> your way out of it.</h2>
        </Reveal2>
        <div className="hp-compete__grid">
          {c.blocks.map((b, i) => (
            <Reveal2 key={b.h} delay={i * 90}>
              <Card padding="marketing" hover style={{ height: '100%' }}>
                <div className="hp-cb__head">
                  <span className="hp-cb__x">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </span>
                  <h3 className="hp-cb__h">{b.h}</h3>
                </div>
                <p className="hp-cb__body">{b.body}</p>
              </Card>
            </Reveal2>
          ))}
        </div>
        <Reveal2 className="hp-resolve" delay={60}>
          <span className="hp-resolve__tick">↳</span>
          <p>{c.resolveLead} <strong>{c.resolveStrong}</strong></p>
        </Reveal2>
      </div>
    </section>
  );
}

/* ---------- Resources ---------- */
function Resources() {
  const r = HP2.resources;
  return (
    <section className="hp-section hp-rule-top hp-bg-cloud" id="resources">
      <div className="hp-container">
        <Reveal2><h2 className="hp-h2"><span className="hp-em">Go deeper</span> before you have to.</h2></Reveal2>
        <div className="hp-res">
          <Reveal2>
            <Card padding="flush" hover className="hp-resfeat" style={{ overflow: 'hidden' }}>
              <div className="hp-resfeat__art"><ResourceArt style={{ width: '78%', height: 'auto' }} /></div>
              <div className="hp-resfeat__body">
                <span className="hp-tag"><span className="hp-tag__dot" />{r.featured.tag}</span>
                <h3 className="hp-resfeat__title">{r.featured.title}</h3>
                <p className="hp-resfeat__desc">{r.featured.body}</p>
              </div>
            </Card>
          </Reveal2>
          <Reveal2 delay={80}>
            <p className="hp-reslist__lead">{r.postsLead}</p>
            <div className="hp-reslist">
              {r.posts.map((post) => (
                <Card key={post.title} padding="flush" hover className="hp-respost">
                  <div className="hp-respost__meta"><span className="hp-respost__tag">{post.tag}</span></div>
                  <h4 className="hp-respost__title">{post.title}</h4>
                </Card>
              ))}
            </div>
            <div className="hp-res__all"><TLink href={r.allHref}>{r.all}</TLink></div>
          </Reveal2>
        </div>
      </div>
    </section>
  );
}

/* ---------- Closing ---------- */
function Closing() {
  const c = HP2.closing;
  return (
    <section className="hp-closing hp-bg-dark" id="get-started">
      <ClosingArt className="hp-closing__art" />
      <div className="hp-closing__inner">
        <Reveal2 as="h2">Start with the layer you <span className="hp-em">cannot afford to get wrong.</span></Reveal2>
        <Reveal2 className="hp-closing__body" as="p" delay={60}>{c.body}</Reveal2>
        <Reveal2 className="hp-closing__ctas" delay={120}>
          <Btn size="lg" arrow href="request-demo.html">{c.cta1}</Btn>
          <Btn size="lg" variant="secondary" arrow href={window.AWS_MP} target="_blank" rel="noopener">{c.cta2}</Btn>
        </Reveal2>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function SiteFooter() {
  const f = HP2.footer;
  return (
    <footer className="hp-footer">
      <div className="hp-container">
        <div className="hp-footer__grid">
          <div>
            <a className="hp-footer__logolink" href="./" aria-label="Enigma Vault home"><img className="hp-footer__logo" src={(typeof window !== 'undefined' && window.__resources && window.__resources.logoLockup) || "assets/logo/lockup-transparent.png"} alt="Enigma Vault" /></a>
            <p className="hp-footer__brandtag">{f.tagline}</p>
          </div>
          {f.columns.map((col) => (
            <div className="hp-footer__col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map((l) => { const lbl = Array.isArray(l) ? l[0] : l; const href = Array.isArray(l) ? l[1] : '#'; const ext = /^https?:/.test(href); return <li key={lbl}><a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener' : undefined}>{lbl}</a></li>; })}</ul>
            </div>
          ))}
        </div>
        <div className="hp-footer__bottom">
          <div className="hp-footer__legal">
            <span>{f.legal}</span>
            <nav className="hp-footer__policies">{(f.policies || []).map((s) => <a href={s[1]} target="_blank" rel="noopener" key={s[0]}>{s[0]}</a>)}</nav>
          </div>
          <div className="hp-footer__social">{f.social.map((s) => <a href={s[1]} target="_blank" rel="noopener" key={s[0]}>{s[0]}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Proof, Who, Industry, Compete, Resources, Closing, SiteFooter });
