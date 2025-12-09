export function AdminDashboard({ projects, clients, contacts, subscribers }) {
  const stats = [
    { id: "projects", label: "Projects", value: projects.length, icon: "🎯", color: "blue" },
    { id: "clients", label: "Happy Clients", value: clients.length, icon: "👥", color: "purple" },
    { id: "contacts", label: "Contact Forms", value: contacts.length, icon: "📧", color: "orange" },
    { id: "subscribers", label: "Subscribers", value: subscribers.length, icon: "📰", color: "green" }
  ];

  const recentContacts = contacts.slice(0, 5);
  const recentSubscribers = subscribers.slice(0, 5);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your admin dashboard</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className={`stat-box stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-row">
        <div className="dashboard-section">
          <h2>Recent Contacts</h2>
          <div className="list-container">
            {recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div key={contact._id} className="list-item">
                  <div className="list-avatar">👤</div>
                  <div className="list-content">
                    <div className="list-title">{contact.fullName}</div>
                    <div className="list-subtitle">{contact.email}</div>
                  </div>
                  <div className="list-meta">{contact.phone}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">No contacts yet</div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Subscribers</h2>
          <div className="list-container">
            {recentSubscribers.length > 0 ? (
              recentSubscribers.map((subscriber) => (
                <div key={subscriber._id} className="list-item">
                  <div className="list-avatar">📧</div>
                  <div className="list-content">
                    <div className="list-title">{subscriber.email}</div>
                    <div className="list-subtitle">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No subscribers yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
