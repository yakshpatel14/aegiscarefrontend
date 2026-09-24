import { Activity, BatteryCharging, BellRing, MapPin, ShieldCheck } from "lucide-react";
import { PLATFORM_DATA } from "../data/platformData";
import { useAuth } from "../context/AuthContext";

function UserDashboard() {
  const { user, isAdminPreview, getPreviewUser } = useAuth();
  const userProfile = isAdminPreview ? getPreviewUser() : user;
  const { user: customer } = PLATFORM_DATA;

  return (
    <div className="role-page-shell">
      {isAdminPreview && (
        <div className="preview-banner">
          <ShieldCheck size={16} /> ADMIN PREVIEW • Viewing customer: {userProfile?.name || "User"}
        </div>
      )}

      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">MY AEGISCARE</p>
          <h1>{customer.greeting}</h1>
          <p className="page-description">{customer.statusText}</p>
        </div>
      </div>

      <div className="content-grid two-col user-layout">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">MY ROBOT</p>
              <h3>{customer.robot.name}</h3>
            </div>
            <span className="status-pill success">{customer.robot.status}</span>
          </div>

          <div className="robot-detail-box">
            <div className="robot-visual-circle">
              <BatteryCharging size={30} />
            </div>
            <div className="robot-metrics">
              <div><span>Battery</span><strong>{customer.robot.battery}%</strong></div>
              <div><span>Connection</span><strong>{customer.robot.connection}</strong></div>
              <div><span>Location</span><strong>{customer.robot.location}</strong></div>
              <div><span>Last seen</span><strong>{customer.robot.lastSeen}</strong></div>
            </div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">TODAY'S CARE</p>
              <h3>Care summary</h3>
            </div>
          </div>

          <div className="stack-block">
            {customer.careSchedule.map((item) => (
              <div key={item.title} className={`info-bubble ${item.tone}`}>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="stats-grid four-up">
        {customer.summaryCards.map((item) => (
          <div key={item.label} className="kpi-card cyan">
            <div className="kpi-header"><span>{item.label}</span><Activity size={14} /></div>
            <strong>{item.value}</strong>
            <small>{item.detail}</small>
          </div>
        ))}
      </div>

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">ROBOT ACTIVITY</p>
              <h3>Recent events</h3>
            </div>
          </div>

          <div className="timeline">
            {customer.activity.map((event) => (
              <div key={event.time} className="timeline-item">
                <span className="timeline-time">{event.time}</span>
                <p>{event.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">QUICK ACTIONS</p>
              <h3>Care controls</h3>
            </div>
          </div>

          <div className="action-grid">
            <button type="button" className="action-chip">View robot</button>
            <button type="button" className="action-chip">Live camera</button>
            <button type="button" className="action-chip">Start mission</button>
            <button type="button" className="action-chip">Call robot</button>
            <button type="button" className="action-chip">View alerts</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
