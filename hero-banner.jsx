/* global React */
/* Banner-style hero — extended motif image with the porcelain veil, copy on the left.
   Overrides window.Hero so the shared home-app composition renders this instead. */
(function () {
  const EV = window.EnigmaVaultDesignSystem_c6ec97;
  const { Button } = EV;
  const HP = window.HP;

  function BannerHero() {
    const h = HP.hero;
    return (
      <header className="hp-bhero" id="top">
        <div
          className="hp-bhero__art"
          role="img"
          aria-label="Layered translucent panels converging to a mineral-blue focal passage, dissolving into sparse data fragments">
        </div>
        <div className="hp-bhero__veil"></div>
        <div className="hp-container hp-bhero__inner">
          <div className="hp-bhero__copy">
            <span className="hp-bhero__eyebrow" style={{ fontWeight: "400", textTransform: "none", letterSpacing: "0.01em", fontSize: "15px" }}>The trust layer between your data and AI.</span>
            <h1>Nothing fabricated. Nothing leaked. <span className="hp-em">Nothing exposed.</span></h1>
            <p className="hp-bhero__sub">{h.sub}</p>
            <div className="hp-bhero__ctas">
              <Button size="lg" arrow href="request-demo.html">{h.cta1}</Button>
              <Button size="lg" variant="secondary" arrow href={window.AWS_MP} target="_blank" rel="noopener">{h.cta2}</Button>
            </div>
          </div>
        </div>
        <div className="hp-bhero__rail">
          <div className="hp-container hp-bhero__rail-inner">
            <span className="hp-bhero__annot" style={{ fontWeight: "500" }}>TRUST, MADE VISIBLE.</span>
            <div className="hp-bhero__values">
              <span>Clarity</span>
              <span>Control</span>
              <span>Confidence</span>
            </div>
          </div>
        </div>
      </header>);

  }

  window.Hero = BannerHero;
})();