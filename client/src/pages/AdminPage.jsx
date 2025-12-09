import { useEffect, useState } from "react";
import AdminLogin from "../components/AdminLogin.jsx";
import AdminForms from "../components/AdminForms.jsx";
import AdminTables from "../components/AdminTables.jsx";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", image: "" });
  const [clientForm, setClientForm] = useState({ name: "", role: "", description: "", image: "" });
  const [status, setStatus] = useState("");
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      try {
        const [p, c, ct, s] = await Promise.all([
          fetch(`${apiBase}/api/projects`),
          fetch(`${apiBase}/api/clients`),
          fetch(`${apiBase}/api/contacts`),
          fetch(`${apiBase}/api/subscribers`)
        ]);
        const [pData, cData, ctData, sData] = await Promise.all([p.json(), c.json(), ct.json(), s.json()]);
        setProjects(pData);
        setClients(cData);
        setContacts(ctData);
        setSubscribers(sData);
      } catch (err) {
        setStatus("Unable to reach server");
      }
    };
    load();
  }, [isAdmin]);

  const submitProject = async (e) => {
    e.preventDefault();
    setStatus("Adding project");
    try {
      const res = await fetch(`${apiBase}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm)
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setProjects((prev) => [saved, ...prev]);
      setProjectForm({ title: "", description: "", image: "" });
      setStatus("Project added");
    } catch (err) {
      setStatus("Project not added");
    }
  };

  const submitClient = async (e) => {
    e.preventDefault();
    setStatus("Adding client");
    try {
      const res = await fetch(`${apiBase}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm)
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setClients((prev) => [saved, ...prev]);
      setClientForm({ name: "", role: "", description: "", image: "" });
      setStatus("Client added");
    } catch (err) {
      setStatus("Client not added");
    }
  };

  const submitAdmin = (e) => {
    e.preventDefault();
    const email = adminForm.email.trim().toLowerCase();
    const password = adminForm.password.trim();
    if (email === "admin@example.com" && password === "admin123") {
      setIsAdmin(true);
      sessionStorage.setItem("admin_auth", "true");
      setStatus("Admin logged in");
    } else {
      setStatus("Invalid admin credentials");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("admin_auth");
  };

  if (!isAdmin) {
    return <AdminLogin form={adminForm} setForm={setAdminForm} onSubmit={submitAdmin} status={status} />;
  }

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div>
          <p className="pill">Dashboard</p>
          <h1>Admin Workspace</h1>
          <p>Manage projects, clients, and review submissions.</p>
        </div>
        <button className="ghost" onClick={logout}>Logout</button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-label">Projects</span>
          <span className="stat-value">{projects.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Clients</span>
          <span className="stat-value">{clients.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Contacts</span>
          <span className="stat-value">{contacts.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Subscribers</span>
          <span className="stat-value">{subscribers.length}</span>
        </div>
      </div>

      <div className="admin-shell">
        <AdminForms
          projectForm={projectForm}
          setProjectForm={setProjectForm}
          submitProject={submitProject}
          clientForm={clientForm}
          setClientForm={setClientForm}
          submitClient={submitClient}
        />
        <AdminTables contacts={contacts} subscribers={subscribers} />
      </div>
      {status && <div className="status">{status}</div>}
    </div>
  );
}

export default AdminPage;

