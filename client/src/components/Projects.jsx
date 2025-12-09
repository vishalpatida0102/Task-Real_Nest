import { useState } from "react";

function Projects({ projects }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.querySelector(".cards");
    const scrollAmount = 320; // Card width + gap
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollPosition + scrollAmount);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="section-head">
        <h2>Our Projects</h2>
        <p>Work crafted with strategy, care, and measurable results.</p>
      </div>
      <div className="carousel-wrapper">
        <button className="arrow-btn left-arrow" onClick={() => scroll("left")} aria-label="Scroll left">
          ❮
        </button>
        <div className="cards">
          {projects.map((item) => (
            <div key={item._id} className="card">
              <img src={item.image} alt={item.title} />
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button type="button" className="ghost">Read More</button>
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

export default Projects;

