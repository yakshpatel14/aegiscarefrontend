import { PLATFORM_DATA } from "../data/platformData";

function AdminAnalytics() {
  const { analytics } = PLATFORM_DATA.admin;

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">INTELLIGENCE</p>
          <h1>Platform analytics</h1>
          <p className="page-description">Operational insights across customer growth, robot health, and utilization.</p>
        </div>
      </div>

      <div className="stats-grid three-up">
        {analytics.map((item) => (
          <div key={item.label} className="kpi-card cyan">
            <div className="kpi-header"><span>{item.label}</span></div>
            <strong>{item.value}</strong>
            <small>Updated live</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAnalytics;
