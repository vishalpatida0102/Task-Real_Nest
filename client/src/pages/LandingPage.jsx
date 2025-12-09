import { useNotification } from "../context/NotificationContext.jsx";
import Topbar from "../components/Topbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Projects from "../components/Projects.jsx";
import Clients from "../components/Clients.jsx";
import Newsletter from "../components/Newsletter.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";

function LandingPage({
  projects,
  clients,
  contactForm,
  setContactForm,
  submitContact,
  newsletterEmail,
  setNewsletterEmail,
  submitSubscriber
}) {
  const { success, error } = useNotification();

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, city } = contactForm;
    
    if (!fullName || !email || !phone || !city) {
      error("Please fill in all fields");
      return;
    }

    try {
      await submitContact(e);
      success("Thank you! We'll be in touch soon.");
    } catch (err) {
      error("Failed to submit. Please try again.");
    }
  };

  const handleSubmitSubscriber = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      error("Please enter a valid email address");
      return;
    }

    try {
      await submitSubscriber(e);
      success("Welcome to our newsletter!");
    } catch (err) {
      error("Subscription failed. Please try again.");
    }
  };

  return (
    <>
      <Topbar />
      <Hero contactForm={contactForm} setContactForm={setContactForm} submitContact={handleSubmitContact} />
      <Features
        items={[
          { title: "Potential ROI", text: "Market-driven pricing strategies that protect your upside." },
          { title: "Design", text: "Interior and staging support that makes every space feel intentional." },
          { title: "Marketing", text: "Campaigns built to reach qualified buyers quickly." }
        ]}
      />
      <Projects projects={projects} />
      <Clients clients={clients} />
      <Newsletter email={newsletterEmail} onChange={setNewsletterEmail} onSubmit={handleSubmitSubscriber} />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;

