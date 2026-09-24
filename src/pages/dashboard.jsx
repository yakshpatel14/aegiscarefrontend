import { useState } from "react";
import {
  BrainCircuit,
  Camera,
  Cpu,
  Radio,
  ShieldCheck,
  Zap,
  Bot,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

const defaultRobotForm = {
  name: "",
  type: "Ground Patrol",
  status: "Active",
  zone: "Ward A",
  load: 64,
  battery: 80,
  task: "Assigned route",
};

function Dashboard() {
  const { user, robotDirectory, setRobotDirectory } = useAuth();
  const isAdmin = user?.role === "admin";
  const [robotForm, setRobotForm] = useState(defaultRobotForm);

  const activeRobots = robotDirectory.filter((robot) => robot.status === "Active").length;
  const averageLoad = Math.round(robotDirectory.reduce((sum, robot) => sum + Number(robot.load || 0), 0) / Math.max(robotDirectory.length, 1));
  const serverLoad = Math.min(98, Math.max(40, averageLoad + 18));

  const metricCards = isAdmin
    ? [
        { label: "Total robots", value: String(robotDirectory.length), tone: "cyan" },
        { label: "Server load", value: `${Math.round(serverLoad)}%`, tone: "cyan" },
        { label: "Active robots", value: String(activeRobots), tone: "cyan" },
        { label: "Avg battery", value: `${Math.round(robotDirectory.reduce((sum, robot) => sum + Number(robot.battery || 0), 0) / Math.max(robotDirectory.length, 1))}%`, tone: "green" },
      ]
    : [
        { label: "Active Units", value: "124", tone: "cyan" },
        { label: "Fleet Load", value: "62%", tone: "cyan" },
        { label: "Avg Latency", value: "14 ms", tone: "cyan" },
        { label: "System Health", value: "99.8%", tone: "green" },
      ];

  const services = [
    { name: "API Gateway", status: "99.9%", tone: "success" },
    { name: "DB Cluster", status: "ACTIVE", tone: "success" },
    { name: "MQTT Broker", status: "READY", tone: "info" },
    { name: "Robot Mesh", status: isAdmin ? `${activeRobots}/${robotDirectory.length}` : "STABLE", tone: "neutral" },
  ];

  const alerts = [
    { title: "Zone load warning", detail: `${Math.round(serverLoad)}% server processing load across active robots.`, tone: "danger" },
    { title: "Robot network sync", detail: "Autonomous route sync is healthy across the active fleet.", tone: "info" },
    { title: "Security layer", detail: "Multi-layer access monitoring is active and encrypted.", tone: "warn" },
  ];

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setRobotForm((current) => ({
      ...current,
      [name]: name === "load" || name === "battery" ? Number(value) : value,
    }));
  };

  const addRobot = (event) => {
    event.preventDefault();

    if (!robotForm.name.trim()) return;

    setRobotDirectory((current) => [
      {
        id: `RBT-${String(current.length + 101).padStart(3, "0")}`,
        name: robotForm.name.trim(),
        type: robotForm.type,
        status: robotForm.status,
        zone: robotForm.zone,
        load: Number(robotForm.load) || 0,
        battery: Number(robotForm.battery) || 0,
        task: robotForm.task,
      },
      ...current,
    ]);

    setRobotForm(defaultRobotForm);
  };

  const removeRobot = (robotId) => {
    setRobotDirectory((current) => current.filter((robot) => robot.id !== robotId));
  };

  return (
    <DashboardLayout>
      <div className="dashboard-shell">
        <div className="ae-dashboard">
          <section className="ae-main-panel">
            <div className="ae-panel-header">
              <div className="ae-title-wrap">
                <span className="ae-kicker">AEGISCORE OS</span>
                <h1>{isAdmin ? "Robot command" : "Systems"}</h1>
              </div>

              <div className="ae-chip-row">
                <span className="ae-status-chip">
                  <span className="dot" /> LIVE
                </span>
                <button className="ae-small-btn">Filter</button>
              </div>
            </div>

            <div className="ae-metric-grid">
              {metricCards.map((card, index) => (
                <div key={index} className={`ae-metric-card ${card.tone}`}>
                  <div className="ae-metric-head">
                    <span>{card.label}</span>
                    <span className="ae-metric-flag">{index === 3 ? "Stable" : "Online"}</span>
                  </div>
                  <div className="ae-metric-value">{card.value}</div>
                  <div className="ae-meter">
                    <span style={{ width: index === 3 ? "82%" : index === 1 ? `${Math.min(100, Math.round(serverLoad))}%` : `${Math.min(100, Number(card.value.replace(/[^\d]/g, "")) || 78)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="ae-center-stage">
              <div className="ae-robot-view">
                <div className="ae-robo-ambient" />
                <div className="ae-robot-core">
                  <div className="ae-robot-scan" />
                </div>
                <div className="ae-robo-bottom">
                  <button className="ae-circle-action danger"><ShieldCheck size={18} /></button>
                </div>
              </div>
            </div>

            <div className="ae-bottom-strip">
              <div className="ae-strip-item"><span className="mini-dot cyan" /> Fleet status</div>
              <div className="ae-strip-item"><span className="mini-dot magenta" /> Autonomous path</div>
              <div className="ae-strip-item"><span className="mini-dot gold" /> Security layer</div>
              <div className="ae-strip-item"><span className="mini-dot purple" /> Network sync</div>
            </div>
          </section>

          <aside className="ae-side-panel">
            <div className="ae-side-box">
              <h3>System status</h3>
              <ul className="ae-status-list">
                {services.map((service) => (
                  <li key={service.name}>
                    <div className="ae-service-name"><span className="service-icon"><Cpu size={13} /></span>{service.name}</div>
                    <strong className={service.tone}>{service.status}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ae-side-box alerts">
              <h3>Critical alerts</h3>
              {alerts.map((alert) => (
                <div key={alert.title} className={`ae-alert ${alert.tone}`}>
                  <div className="ae-alert-title">{alert.title}</div>
                  <div className="ae-alert-detail">{alert.detail}</div>
                </div>
              ))}
            </div>

            <div className="ae-side-box map-box">
              <div className="ae-map-top">
                <span>Mission map</span>
                <button className="ae-small-btn">Export</button>
              </div>
              <div className="ae-map-grid">
                <div className="ae-map-dot active" />
                <div className="ae-map-dot" />
                <div className="ae-map-dot" />
                <div className="ae-map-dot" />
              </div>
            </div>
          </aside>
        </div>

        {isAdmin && (
          <div className="admin-robot-shell">
            <div className="admin-robot-panel">
              <div className="panel-title-row">
                <div>
                  <p className="section-label">ROBOT MANAGER</p>
                  <h3>Robot inventory</h3>
                </div>
              </div>

              <div className="robot-list-grid">
                {robotDirectory.map((robot) => (
                  <div key={robot.id} className="robot-card">
                    <div className="robot-card-top">
                      <div className="robot-badge"><Bot size={14} /></div>
                      <span className={`robot-state ${robot.status.toLowerCase().replace(/\s+/g, "-")}`}>{robot.status}</span>
                    </div>
                    <strong>{robot.name}</strong>
                    <small>{robot.type}</small>
                    <div className="robot-meta">
                      <span>ID: {robot.id}</span>
                      <span>Zone: {robot.zone}</span>
                    </div>
                    <div className="robot-progress">
                      <div className="progress-label">
                        <span>Load</span>
                        <strong>{robot.load}%</strong>
                      </div>
                      <div className="progress-track"><span style={{ width: `${robot.load}%` }} /></div>
                    </div>
                    <div className="robot-meta compact">
                      <span>Battery: {robot.battery}%</span>
                      <span>Task: {robot.task}</span>
                    </div>
                    <button type="button" className="table-action delete" onClick={() => removeRobot(robot.id)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <form className="admin-form-card robot-form-card" onSubmit={addRobot}>
              <div className="panel-title-row">
                <div>
                  <p className="section-label">NEW ROBOT</p>
                  <h3>Add robot type</h3>
                </div>
              </div>

              <div className="admin-form">
                <label>
                  <span>Robot name</span>
                  <input name="name" value={robotForm.name} onChange={handleFormChange} placeholder="Astra 9" />
                </label>

                <label>
                  <span>Robot type</span>
                  <select name="type" value={robotForm.type} onChange={handleFormChange}>
                    <option>Ground Patrol</option>
                    <option>Delivery Robot</option>
                    <option>Security Drone</option>
                    <option>Assist Unit</option>
                  </select>
                </label>

                <div className="two-column">
                  <label>
                    <span>Status</span>
                    <select name="status" value={robotForm.status} onChange={handleFormChange}>
                      <option>Active</option>
                      <option>Standby</option>
                      <option>Charging</option>
                    </select>
                  </label>

                  <label>
                    <span>Zone</span>
                    <input name="zone" value={robotForm.zone} onChange={handleFormChange} />
                  </label>
                </div>

                <div className="two-column">
                  <label>
                    <span>Load %</span>
                    <input type="number" min="0" max="100" name="load" value={robotForm.load} onChange={handleFormChange} />
                  </label>

                  <label>
                    <span>Battery %</span>
                    <input type="number" min="0" max="100" name="battery" value={robotForm.battery} onChange={handleFormChange} />
                  </label>
                </div>

                <label>
                  <span>Current task</span>
                  <input name="task" value={robotForm.task} onChange={handleFormChange} />
                </label>

                <button type="submit" className="primary-action">
                  <Plus size={15} /> Add robot
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="ae-quick-actions">
          <button className="ae-action-btn primary"><Camera size={14} /> Live feed</button>
          <button className="ae-action-btn"><Radio size={14} /> Telemetry</button>
          <button className="ae-action-btn"><BrainCircuit size={14} /> AI route</button>
          <button className="ae-action-btn"><Zap size={14} /> Emergency</button>
        </div>

        <div className="ae-footer-meta">
          <span>© 2024 AegisCore Robotics OS</span>
          <span>Security Protocol</span>
          <span>API Documentation</span>
          <span>Global Privacy</span>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
