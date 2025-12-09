import { useState } from "react";

function Clients({ clients }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.querySelector(".client-grid");
    const scrollAmount = 280; // Client card width + gap
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollPosition + scrollAmount);
    }
  };

  return (
    <section className="clients" id="clients">
      <div className="section-head">
        <h2>Happy Clients</h2>
        <p>Stories from partners who trusted us with their move.</p>
      </div>
      <div className="carousel-wrapper">
        <button className="arrow-btn left-arrow" onClick={() => scroll("left")} aria-label="Scroll left">
          ❮
        </button>
        <div className="client-grid">
          {clients.map((item) => (
            <div key={item._id} className="client-card">
              <img src={item.image} alt={item.name} />
              <p className="client-quote">{item.description}</p>
              <div className="client-meta">
                <span className="client-name">{item.name}</span>
                <span className="client-role">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-btn right-arrow" onClick={() => scroll("right")} aria-label="Scroll right">
          ❯
        </button>
      </div>
    </section>
  );
}

export default Clients;

