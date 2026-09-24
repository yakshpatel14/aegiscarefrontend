import { PLATFORM_DATA } from "../data/platformData";

function UserAlertsPage() {
  const { alerts } = PLATFORM_DATA.user;

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">SAFETY</p>
          <h1>Alerts & events</h1>
          <p className="page-description">Recent safety status and important care notifications.</p>
        </div>
      </div>

      <div className="alert-stack">
        {alerts.map((alert) => (
          <div key={alert.title} className={`alert-item ${alert.severity === "Low" ? "success" : alert.severity === "Info" ? "info" : "warning"}`}>
            <div className="alert-icon">!</div>
            <div>
              <strong>{alert.title}</strong>
              <p>{alert.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAlertsPage;
