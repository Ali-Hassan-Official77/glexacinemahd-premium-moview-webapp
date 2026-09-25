import Link from "next/link";

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function FilmIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M17 3v18" />
      <path d="M3 7h4" />
      <path d="M3 12h4" />
      <path d="M3 17h4" />
      <path d="M17 7h4" />
      <path d="M17 12h4" />
      <path d="M17 17h4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="brand-symbol small">
                <span>G</span>
              </span>

              <span className="brand-name">
                Glexa<span>Ginema</span>
              </span>
            </Link>

            <p>
              Premium movie discovery built around real catalog data,
              official artwork and a focused browsing experience.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="footer-label">Explore</div>

            <div className="footer-links">
              <Link href="/">Discover</Link>
              <Link href="/genres">Genres</Link>
              <Link href="/watchlist">Watchlist</Link>
              <Link href="/search">Search</Link>
            </div>
          </div>

          {/* Data */}
          <div>
            <div className="footer-label">Data</div>

            <div className="footer-links">
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
              >
                <span>The Movie Database</span>
                <ExternalLinkIcon />
              </a>

              <a
                href="https://developer.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
              >
                <span>TMDB Developer Docs</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="footer-label">Product</div>

            <div className="footer-links">
              <span>
                <FilmIcon />
                Live catalog
              </span>

              <span>
                <HeartIcon />
                Local watchlist
              </span>

              <span>
                <GithubIcon />
                Production-ready UI
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} GlexaGinema.
          </span>

          <span>
            This product uses the TMDB API but is not endorsed or certified
            by TMDB.
          </span>

          <span className="footer-powered">
            Powered by{" "}
            <a
              href="https://silverloft.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="silverloft-link"
            >
              SilverLoft
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}