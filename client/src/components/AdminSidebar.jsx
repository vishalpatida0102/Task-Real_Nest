import { useState } from "react";

export function AdminSidebar({ activeTab, setActiveTab, logout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "projects", label: "Projects", icon: "🎯" },
    { id: "clients", label: "Clients", icon: "👥" },
    { id: "contacts", label: "Contacts", icon: "📧" },
    { id: "subscribers", label: "Subscribers", icon: "📰" }
  ];

  return (
    <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-icon">🏢</span>
          {!isCollapsed && <span className="brand-text">Admin Panel</span>}
        </div>
        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            title={isCollapsed ? tab.label : ""}
          >
            <span className="nav-icon">{tab.icon}</span>
            {!isCollapsed && <span className="nav-label">{tab.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout} title="Logout">
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
