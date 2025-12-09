function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand">Real Nest</div>
          <p>Guiding every transaction with clarity and care.</p>
        </div>
        <div className="footer-links">
          <a href="#projects">Projects</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
          <a href="#admin">Admin</a>
        </div>
        <div className="footer-actions">
          <p>Need a walkthrough?</p>
          <a className="primary" href="#contact">Book now</a>
        </div>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Real Nest</span>
        <span>Design + Marketing</span>
      </div>
    </footer>
  );
}

export default Footer;

