import { Activity, Cpu, Gauge, HardDrive, ShieldCheck, Signal, Zap } from "lucide-react";

function AdminDashboard() {
  const serverStats = [
    { label: "Server load", value: "42%", detail: "Normal capacity", tone: "teal", icon: Gauge },
    { label: "CPU usage", value: "38%", detail: "Stable output", tone: "blue", icon: Cpu },
    { label: "Memory", value: "61%", detail: "Balanced", tone: "violet", icon: Zap },
    { label: "Network health", value: "96%", detail: "Low latency", tone: "green", icon: Signal },
    { label: "API uptime", value: "99.94%", detail: "Peak performance", tone: "mint", icon: ShieldCheck },
    { label: "Disk health", value: "72%", detail: "Healthy", tone: "amber", icon: HardDrive },
  ];

  const serviceStatus = [
    { name: "API gateway", value: "99.9%", state: "Healthy" },
    { name: "Database cluster", value: "Online", state: "Healthy" },
    { name: "Messaging queue", value: "Stable", state: "Watching" },
    { name: "Robot mesh", value: "186 linked", state: "Active" },
  ];

  return (
    <div className="role-page-shell admin-dashboard-shell">
      <div className="page-hero admin-hero light-hero">
        <div>
          <p className="eyebrow">AEGISCORE CONTROL CENTER</p>
          <h1>AegisCore Admin</h1>
          <p className="page-description">Live server performance, health signals, and platform access in one clean operational view.</p>
        </div>
        <div className="hero-actions">
          <button type="button" className="primary-action">Open overview</button>
          <button type="button" className="secondary-action">Export report</button>
        </div>
      </div>

      <div className="server-stat-grid">
        {serverStats.map(({ label, value, detail, tone, icon: Icon }) => (
          <div key={label} className={`server-stat-card ${tone}`}>
            <div className="server-stat-header">
              <span>{label}</span>
              <Icon size={15} />
            </div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>

      <div className="admin-split-grid">
        <section className="light-panel">
          <div className="panel-header-row">
            <div>
              <p className="section-label">SYSTEM STATUS</p>
              <h3>Server access</h3>
            </div>
            <span className="status-pill success">Healthy</span>
          </div>

          <div className="service-stack">
            {serviceStatus.map((service) => (
              <div className="service-row" key={service.name}>
                <div className="service-meta">
                  <span className="service-dot" />
                  <span>{service.name}</span>
                </div>
                <div className="service-values">
                  <span className="status-badge success">{service.state}</span>
                  <strong>{service.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="light-panel">
          <div className="panel-header-row">
            <div>
              <p className="section-label">LIVE FEED</p>
              <h3>Operational notes</h3>
            </div>
            <span className="status-pill warning">Live</span>
          </div>

          <div className="alert-stack">
            <div className="alert-item success">
              <div className="alert-icon"><Activity size={14} /></div>
              <div>
                <strong>System health</strong>
                <p>All infrastructure layers are operating within expected thresholds.</p>
              </div>
            </div>
            <div className="alert-item info">
              <div className="alert-icon"><ShieldCheck size={14} /></div>
              <div>
                <strong>Access control</strong>
                <p>Authentication remains stable and no security alerts are active.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
