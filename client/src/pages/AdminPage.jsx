import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import { AdminSidebar } from "../components/AdminSidebar.jsx";
import { AdminDashboard } from "../components/AdminDashboard.jsx";
import AdminForms from "../components/AdminForms.jsx";
import AdminTables from "../components/AdminTables.jsx";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminPage() {
  const { success, error, info } = useNotification();
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", image: "" });
  const [clientForm, setClientForm] = useState({ name: "", role: "", description: "", image: "" });
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [activeTab, setActiveTab] = useState("dashboard");

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
        error("Unable to load dashboard data");
      }
    };
    load();
  }, [isAdmin, error]);

  const submitProject = async (e) => {
    e.preventDefault();
    
    if (!projectForm.title || !projectForm.description || !projectForm.image) {
      error("Please fill in all project fields");
      return;
    }

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
      success("Project added successfully!");
    } catch (err) {
      error("Failed to add project. Please try again.");
    }
  };

  const submitClient = async (e) => {
    e.preventDefault();
    
    if (!clientForm.name || !clientForm.role || !clientForm.description || !clientForm.image) {
      error("Please fill in all client fields");
      return;
    }

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
      success("Client added successfully!");
    } catch (err) {
      error("Failed to add client. Please try again.");
    }
  };

  const submitAdmin = (e) => {
    e.preventDefault();
    const email = adminForm.email.trim().toLowerCase();
    const password = adminForm.password.trim();
    if (email === "admin@example.com" && password === "admin123") {
      setIsAdmin(true);
      sessionStorage.setItem("admin_auth", "true");
      success("Admin logged in successfully!");
    } else {
      error("Invalid email or password");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("admin_auth");
    success("Logged out successfully!");
  };

  if (!isAdmin) {
    return <AdminLogin form={adminForm} setForm={setAdminForm} onSubmit={submitAdmin} />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
      
      <main className="admin-main">
        {activeTab === "dashboard" && (
          <AdminDashboard
            projects={projects}
            clients={clients}
            contacts={contacts}
            subscribers={subscribers}
          />
        )}

        {activeTab === "projects" && (
          <div className="admin-content-section">
            <div className="section-header">
              <h1>Projects Management</h1>
              <p>Add and manage your projects</p>
            </div>
            <AdminForms
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              submitProject={submitProject}
              clientForm={clientForm}
              setClientForm={setClientForm}
              submitClient={() => {}}
              showClientForm={false}
            />
          </div>
        )}

        {activeTab === "clients" && (
          <div className="admin-content-section">
            <div className="section-header">
              <h1>Clients Management</h1>
              <p>Add and manage your clients</p>
            </div>
            <AdminForms
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              submitProject={() => {}}
              clientForm={clientForm}
              setClientForm={setClientForm}
              submitClient={submitClient}
              showProjectForm={false}
            />
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="admin-content-section">
            <div className="section-header">
              <h1>Contact Submissions</h1>
              <p>View all contact form submissions</p>
            </div>
            <AdminTables contacts={contacts} subscribers={[]} showSubscribers={false} />
          </div>
        )}

        {activeTab === "subscribers" && (
          <div className="admin-content-section">
            <div className="section-header">
              <h1>Newsletter Subscribers</h1>
              <p>Manage newsletter subscribers</p>
            </div>
            <AdminTables contacts={[]} subscribers={subscribers} showContacts={false} />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPage;

