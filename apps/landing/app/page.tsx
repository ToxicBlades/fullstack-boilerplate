export default function Home() {
  return (
    <div className="landing-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Northline home">
          <span className="wordmark-mark" aria-hidden="true">N</span>
          <span>northline</span>
        </a>
        <a className="header-link" href="mailto:hello@northline.studio">
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> A new kind of studio</p>
            <h1 id="hero-title">Make room for<br /><em>better ideas.</em></h1>
            <p className="hero-description">
              Northline is a small, independent studio for thoughtful brands,
              useful products, and the people building them.
            </p>
            <a className="primary-button" href="mailto:hello@northline.studio">
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="signal" aria-label="Abstract Northline signal graphic" role="img">
            <div className="signal-orbit signal-orbit-one" />
            <div className="signal-orbit signal-orbit-two" />
            <div className="signal-core" />
            <span className="signal-label signal-label-top">01 / 03</span>
            <span className="signal-label signal-label-bottom">finding the<br />clear line</span>
          </div>
        </section>

        <section className="manifesto" aria-label="Northline principles">
          <p className="section-kicker">The short version</p>
          <div className="manifesto-text">
            <p>We believe the best work feels <strong>clear, considered,</strong> and a little unexpected.</p>
            <span className="manifesto-index">(01)</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Independent / Everywhere</span>
        <span>© {new Date().getFullYear()} Northline Studio</span>
      </footer>
    </div>
  );
}
