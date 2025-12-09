import { Link } from "react-router-dom";

function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">Real Nest</div>
      <nav className="nav-links">
        <a href="#projects">Projects</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
        <Link to="/admin">Admin</Link>
      </nav>
      <a className="cta" href="#contact">Get Quote</a>
    </header>
  );
}

export default Topbar;

