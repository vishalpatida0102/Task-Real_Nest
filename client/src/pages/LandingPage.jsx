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
  return (
    <>
      <Topbar />
      <Hero contactForm={contactForm} setContactForm={setContactForm} submitContact={submitContact} />
      <Features
        items={[
          { title: "Potential ROI", text: "Market-driven pricing strategies that protect your upside." },
          { title: "Design", text: "Interior and staging support that makes every space feel intentional." },
          { title: "Marketing", text: "Campaigns built to reach qualified buyers quickly." }
        ]}
      />
      <Projects projects={projects} />
      <Clients clients={clients} />
      <Newsletter email={newsletterEmail} onChange={setNewsletterEmail} onSubmit={submitSubscriber} />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;

