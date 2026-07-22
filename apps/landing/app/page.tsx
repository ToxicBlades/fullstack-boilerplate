import { Button } from "@project/design-system/components/ui/button";

export default function Home() {
  return (
    <div className="landing-shell">
      <header className="site-header">
        <a aria-label="Project home" className="wordmark" href="#top">
          <span aria-hidden="true" className="wordmark-mark">
            N
          </span>
          <span>project</span>
        </a>
        <a className="header-link" href="mailto:hello@project.studio">
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <section aria-labelledby="hero-title" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> A new kind of studio
            </p>
            <h1 id="hero-title">
              Make room for
              <br />
              <em>better ideas.</em>
            </h1>
            <p className="hero-description">
              Project is a small, independent studio for thoughtful brands,
              useful products, and the people building them.
            </p>
            <Button asChild className="primary-button" variant="link">
              <a href="mailto:hello@project.studio">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </Button>
          </div>

          <div
            aria-label="Abstract Project signal graphic"
            className="signal"
            role="img"
          >
            <div className="signal-orbit signal-orbit-one" />
            <div className="signal-orbit signal-orbit-two" />
            <div className="signal-core" />
            <span className="signal-label signal-label-top">01 / 03</span>
            <span className="signal-label signal-label-bottom">
              finding the
              <br />
              clear line
            </span>
          </div>
        </section>

        <section aria-label="Project principles" className="manifesto">
          <p className="section-kicker">The short version</p>
          <div className="manifesto-text">
            <p>
              We believe the best work feels <strong>clear, considered,</strong>{" "}
              and a little unexpected.
            </p>
            <span className="manifesto-index">(01)</span>
          </div>
        </section>

        <section aria-labelledby="capabilities-title" className="capabilities">
          <div>
            <p className="section-kicker">What we make</p>
            <h2 id="capabilities-title">
              Useful things,
              <br />
              <em>beautifully clear.</em>
            </h2>
          </div>
          <div className="capability-list">
            <article className="capability-row">
              <span className="row-number">01</span>
              <div>
                <h3>Brand worlds</h3>
                <p>
                  Names, identities, and systems that give good ideas somewhere
                  to go.
                </p>
              </div>
              <span aria-hidden="true" className="row-arrow">
                ↗
              </span>
            </article>
            <article className="capability-row">
              <span className="row-number">02</span>
              <div>
                <h3>Digital products</h3>
                <p>
                  Interfaces that make complex things feel natural from the
                  first click.
                </p>
              </div>
              <span aria-hidden="true" className="row-arrow">
                ↗
              </span>
            </article>
            <article className="capability-row">
              <span className="row-number">03</span>
              <div>
                <h3>Creative direction</h3>
                <p>
                  A sharp point of view for launches, campaigns, and what comes
                  next.
                </p>
              </div>
              <span aria-hidden="true" className="row-arrow">
                ↗
              </span>
            </article>
          </div>
        </section>

        <section aria-labelledby="closing-title" className="closing-cta">
          <p className="section-kicker">The next move</p>
          <h2 id="closing-title">
            Have something
            <br />
            <em>worth making?</em>
          </h2>
          <Button asChild className="primary-button" variant="link">
            <a href="mailto:hello@project.studio">
              Tell us about it <span aria-hidden="true">↗</span>
            </a>
          </Button>
        </section>
      </main>

      <footer className="site-footer">
        <span>Independent / Everywhere</span>
        <span>© {new Date().getFullYear()} Project Studio</span>
      </footer>
    </div>
  );
}
