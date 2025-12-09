import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { ToastContainer } from "./components/Toast.jsx";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AppContent() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contactForm, setContactForm] = useState({ fullName: "", email: "", phone: "", city: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  useEffect(() => {
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
        console.error("Failed to load data", err);
      }
    };
    load();
  }, []);

  const submitContact = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiBase}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setContacts((prev) => [saved, ...prev]);
      setContactForm({ fullName: "", email: "", phone: "", city: "" });
    } catch (err) {
      console.error("Failed to save contact", err);
    }
  };

  const submitSubscriber = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      const res = await fetch(`${apiBase}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setSubscribers((prev) => {
        const exists = prev.find((s) => s.email === saved.email);
        return exists ? prev : [saved, ...prev];
      });
      setNewsletterEmail("");
    } catch (err) {
      console.error("Failed to subscribe", err);
    }
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              projects={projects}
              clients={clients}
              contactForm={contactForm}
              setContactForm={setContactForm}
              submitContact={submitContact}
              newsletterEmail={newsletterEmail}
              setNewsletterEmail={setNewsletterEmail}
              submitSubscriber={submitSubscriber}
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;
