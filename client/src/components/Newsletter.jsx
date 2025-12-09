function Newsletter({ email, onChange, onSubmit }) {
  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <div>
          <p className="tag">Stay Updated</p>
          <h3>Subscribe for market tips and listings</h3>
        </div>
        <form className="newsletter-form" onSubmit={onSubmit}>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => onChange(e.target.value)} />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;

