import { Bot, MapPinned, Radio } from "lucide-react";
import { PLATFORM_DATA } from "../data/platformData";

function AdminFleet() {
  const { fleet } = PLATFORM_DATA.admin;

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">ADMIN OPERATIONS</p>
          <h1>Fleet manager</h1>
          <p className="page-description">Track every connected robot, its owner, health, mission, and location.</p>
        </div>
      </div>

      <div className="filter-row inline-filters">
        <button type="button" className="chip active">Online</button>
        <button type="button" className="chip">Offline</button>
        <button type="button" className="chip">Charging</button>
        <button type="button" className="chip">Warning</button>
      </div>

      <div className="fleet-grid">
        {fleet.map((robot) => (
          <article key={robot.id} className="fleet-card">
            <div className="fleet-card-header">
              <div className="robot-name-row">
                <span className="fleet-bot"><Bot size={14} /></span>
                <strong>{robot.name}</strong>
              </div>
              <span className={`status-badge ${robot.status === "Online" ? "success" : robot.status === "Charging" ? "info" : robot.status === "Warning" ? "warning" : "critical"}`}>{robot.status}</span>
            </div>

            <div className="fleet-details">
              <div><span>Owner</span><strong>{robot.owner}</strong></div>
              <div><span>Robot ID</span><strong>{robot.id}</strong></div>
              <div><span>Battery</span><strong>{robot.battery}%</strong></div>
              <div><span>Location</span><strong>{robot.location}</strong></div>
              <div><span>Heartbeat</span><strong>{robot.heartbeat}</strong></div>
              <div><span>Firmware</span><strong>{robot.firmware}</strong></div>
              <div><span>Mission</span><strong>{robot.mission}</strong></div>
              <div><span>Connectivity</span><strong>Strong</strong></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminFleet;
