import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contactForm, setContactForm] = useState({ fullName: "", email: "", phone: "", city: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [status, setStatus] = useState("");

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
        setStatus("Unable to reach server");
      }
    };
    load();
  }, []);

  const submitContact = async (e) => {
    e.preventDefault();
    setStatus("Saving contact");
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
      setStatus("Contact saved");
    } catch (err) {
      setStatus("Contact not saved");
    }
  };

  const submitSubscriber = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setStatus("Subscribing");
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
      setStatus("Subscribed");
    } catch (err) {
      setStatus("Subscription failed");
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
      {status && <div className="status floating">{status}</div>}
    </div>
  );
}

export default App;
