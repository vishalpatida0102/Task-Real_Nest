function Projects({ projects }) {
  return (
    <section className="projects" id="projects">
      <div className="section-head">
        <h2>Our Projects</h2>
        <p>Work crafted with strategy, care, and measurable results.</p>
      </div>
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
    </section>
  );
}

export default Projects;

