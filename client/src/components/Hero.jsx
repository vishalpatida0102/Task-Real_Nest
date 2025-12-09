function Hero({ contactForm, setContactForm, submitContact }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="tag">Consultation, Design & Marketing</p>
        <h1>Not your average realtor</h1>
        <p className="lead">From valuation to closing, we build a journey that keeps you informed and confident.</p>
        <div className="hero-actions">
          <a href="#projects" className="primary">View Projects</a>
          <a href="#about" className="ghost">Learn More</a>
        </div>
      </div>
      <div className="hero-card" id="contact">
        <h3>Get a free consultation</h3>
        <form className="contact-form" onSubmit={submitContact}>
          <input placeholder="Full Name" value={contactForm.fullName} onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })} />
          <input placeholder="Email Address" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
          <input placeholder="Mobile Number" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
          <input placeholder="City" value={contactForm.city} onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })} />
          <button type="submit">Get Quick Quote</button>
        </form>
      </div>
    </section>
  );
}

export default Hero;

