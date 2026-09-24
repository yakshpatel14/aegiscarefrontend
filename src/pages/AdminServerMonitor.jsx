import { PLATFORM_DATA } from "../data/platformData";

function AdminServerMonitor() {
  const { serverMetrics } = PLATFORM_DATA.admin;

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">INFRASTRUCTURE</p>
          <h1>Server monitor</h1>
          <p className="page-description">Operational status across CPU, database, MQTT, and robot connectivity.</p>
        </div>
      </div>

      <div className="stats-grid three-up">
        {serverMetrics.map((item) => (
          <div key={item.label} className="kpi-card cyan">
            <div className="kpi-header"><span>{item.label}</span></div>
            <strong>{item.value}{item.label === "CPU" || item.label === "RAM" || item.label === "Disk" || item.label === "Network" ? "%" : ""}</strong>
            <small>{item.status}</small>
          </div>
        ))}
      </div>

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">SERVICE STATUS</p>
              <h3>Control plane</h3>
            </div>
          </div>
          <div className="service-stack">
            <div className="service-row"><div className="service-meta"><span className="service-dot" />API Gateway</div><div className="service-values"><span className="status-badge success">ONLINE</span><strong>99.9%</strong></div></div>
            <div className="service-row"><div className="service-meta"><span className="service-dot" />Database</div><div className="service-values"><span className="status-badge success">ONLINE</span><strong>Healthy</strong></div></div>
            <div className="service-row"><div className="service-meta"><span className="service-dot" />MQTT Broker</div><div className="service-values"><span className="status-badge success">ONLINE</span><strong>Stable</strong></div></div>
            <div className="service-row"><div className="service-meta"><span className="service-dot" />Robot Mesh</div><div className="service-values"><span className="status-badge success">ONLINE</span><strong>186 linked</strong></div></div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">CONNECTED SYSTEMS</p>
              <h3>Robot communication</h3>
            </div>
          </div>
          <div className="info-grid compact-grid">
            <div><span>Connected robots</span><strong>186</strong></div>
            <div><span>Offline robots</span><strong>8</strong></div>
            <div><span>API latency</span><strong>128 ms</strong></div>
            <div><span>Uptime</span><strong>99.94%</strong></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminServerMonitor;
