function Features({ items }) {
  return (
    <section className="sub-hero" id="about">
      <div className="sub-text">
        <h2>Why choose us?</h2>
        <p>We blend advisory, design, and marketing to move properties with speed and care.</p>
      </div>
      <div className="features">
        {items.map((item) => (
          <div key={item.title} className="feature-card">
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;

