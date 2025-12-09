function Clients({ clients }) {
  return (
    <section className="clients" id="clients">
      <div className="section-head">
        <h2>Happy Clients</h2>
        <p>Stories from partners who trusted us with their move.</p>
      </div>
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
    </section>
  );
}

export default Clients;

