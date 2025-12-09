import Project from "../models/Project.js";
import Client from "../models/Client.js";

const defaultProjects = [
  {
    title: "Consultation",
    description: "Tailored advisory to guide each purchase and sale decision.",
    image: "https://images.unsplash.com/photo-1570129476768-466b5cec1c58?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Design",
    description: "Modern staging concepts that elevate property appeal.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Marketing & Design",
    description: "Campaigns that connect the right buyers with the right homes.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Consultation & Marketing",
    description: "Pricing, positioning, and negotiation built around data.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
  }
];

const defaultClients = [
  {
    name: "Rowhan Smith",
    role: "VP",
    description: "Their market insight kept us ahead of every offer.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Shipra Kayak",
    role: "Founder",
    description: "We closed faster than expected with clear communication.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "John Lepore",
    role: "CTO",
    description: "Staging and marketing delivered qualified buyers only.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Marry Freeman",
    role: "Designer",
    description: "They simplified every step for our first investment.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Lucy",
    role: "Analyst",
    description: "Transparent process with measurable results.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
  }
];

async function seedDefaults() {
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(defaultProjects);
  }
  const clientCount = await Client.countDocuments();
  if (clientCount === 0) {
    await Client.insertMany(defaultClients);
  }
}

export default seedDefaults;

