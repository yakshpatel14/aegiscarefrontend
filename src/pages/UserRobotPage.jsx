import { BatteryCharging, MapPin, Radio, ShieldCheck } from "lucide-react";
import { PLATFORM_DATA } from "../data/platformData";

function UserRobotPage() {
  const { robot } = PLATFORM_DATA.user;

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">MY ROBOT</p>
          <h1>{robot.name}</h1>
          <p className="page-description">Status, battery, location, firmware, and mission progress.</p>
        </div>
      </div>

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">ROBOT STATUS</p>
              <h3>System health</h3>
            </div>
            <span className="status-pill success">{robot.status}</span>
          </div>

          <div className="robot-detail-box large">
            <div className="robot-visual-circle">
              <BatteryCharging size={35} />
            </div>
            <div className="robot-metrics">
              <div><span>Battery</span><strong>{robot.battery}%</strong></div>
              <div><span>Charging</span><strong>Stable</strong></div>
              <div><span>Connection</span><strong>{robot.connection}</strong></div>
              <div><span>Current mission</span><strong>{robot.mission}</strong></div>
            </div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">TELEMETRY</p>
              <h3>Live metrics</h3>
            </div>
          </div>
          <div className="info-grid compact-grid">
            <div><span>Robot ID</span><strong>{robot.name}</strong></div>
            <div><span>Location</span><strong>{robot.location}</strong></div>
            <div><span>Firmware</span><strong>{robot.firmware}</strong></div>
            <div><span>Last seen</span><strong>{robot.lastSeen}</strong></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserRobotPage;
