import {
  Activity,
  BatteryCharging,
  Bot,
  Clock3,
  Gauge,
  MapPin,
  Navigation,
  RefreshCw,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { useState } from "react";

function RoverManagement() {
  const [lastRefresh, setLastRefresh] = useState("just now");

  const refreshStatus = () => {
    setLastRefresh("just now");
  };

  const fleetMetrics = [
    { label: "Fleet online", value: "24/26", detail: "2 in maintenance", icon: Wifi, tone: "cyan" },
    { label: "Avg battery", value: "84%", detail: "Across active units", icon: BatteryCharging, tone: "green" },
    { label: "Dispatch time", value: "03:42", detail: "Fastest route cycle", icon: Clock3, tone: "purple" },
    { label: "Autonomy", value: "91%", detail: "AI route confidence", icon: Gauge, tone: "gold" },
  ];

  const roverUnits = [
    { id: "RVR-001", name: "Astra Unit", status: "online", battery: 82, route: "Zone 03 • Ward A", signal: "Strong", progress: 68 },
    { id: "RVR-014", name: "Nimbus Unit", status: "charging", battery: 46, route: "Dock 2 • Service Bay", signal: "Moderate", progress: 41 },
    { id: "RVR-023", name: "Pioneer Unit", status: "online", battery: 91, route: "Zone 05 • Pharmacy", signal: "Strong", progress: 86 },
  ];

  const serviceSummary = [
    { label: "Battery health", value: "98.2%" },
    { label: "Signal quality", value: "4.8/5" },
    { label: "Route accuracy", value: "97.1%" },
    { label: "Last service", value: "12 days ago" },
  ];

  return (
    <div className="fleet-manager-page">
      <div className="fleet-hero">
        <div className="fleet-hero-copy">
          <div className="hero-kicker">
            <span className="hero-live-dot" /> FLEET MANAGER
          </div>
          <h2>
            Autonomous fleet <em>command</em>
          </h2>
          <p>
            Mission control for delivery, monitoring, and field support across the AegisCare network.
          </p>

          <div className="hero-actions">
            <button className="hero-primary">
              <Navigation size={14} /> Dispatch route
            </button>
            <button className="hero-secondary">
              <ShieldCheck size={14} /> Security overview
            </button>
          </div>
        </div>

        <div className="fleet-hero-visual">
          <div className="fleet-iso-card">
            <div className="fleet-iso-grid" />
            <div className="fleet-iso-sweep" />
            <div className="fleet-rover-model">
              <div className="rover-model-shell">
                <div className="rover-model-head" />
                <div className="rover-model-eye" />
                <div className="rover-model-eye right" />
                <div className="rover-model-body" />
              </div>
            </div>
            <div className="fleet-iso-tag">Live mission</div>
          </div>
        </div>
      </div>

      <div className="fleet-metrics">
        {fleetMetrics.map(({ label, value, detail, icon: Icon, tone }) => (
          <div key={label} className={`fleet-metric-card ${tone}`}>
            <div className="metric-icon-wrap">
              <Icon size={18} />
            </div>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="fleet-grid">
        <section className="fleet-panel fleet-panel-large">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">CURRENT OPERATION</p>
              <h3>Medicine delivery route</h3>
            </div>
            <button className="secondary-action" onClick={refreshStatus}>
              <RefreshCw size={15} />
              Refresh
            </button>
          </div>

          <div className="route-visual">
            <div className="route-points">
              <div className="route-point start">
                <span className="map-pin"><MapPin size={14} /></span>
                <div>
                  <small>Origin</small>
                  <strong>Pharmacy hub</strong>
                </div>
              </div>

              <div className="route-line">
                <span className="route-travel" />
              </div>

              <div className="route-point end">
                <span className="map-pin"><MapPin size={14} /></span>
                <div>
                  <small>Destination</small>
                  <strong>Ward A • Room 203</strong>
                </div>
              </div>
            </div>

            <div className="operation-progress">
              <div className="progress-label">
                <span>Mission progress</span>
                <strong>68%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: "68%" }} />
              </div>
            </div>
          </div>
        </section>

        <section className="fleet-panel">
          <div className="panel-header compact">
            <div>
              <p className="panel-kicker">SYSTEM STATUS</p>
              <h3>Fleet overview</h3>
            </div>
          </div>

          <div className="system-summary">
            {serviceSummary.map((item) => (
              <div key={item.label} className="summary-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="rover-collection">
        {roverUnits.map((rover) => (
          <article key={rover.id} className="rover-unit-card">
            <div className="rover-card-top">
              <div className="rover-mini">
                <Bot size={18} />
              </div>
              <span className={`rover-badge ${rover.status}`}>
                {rover.status === "online" ? "Online" : "Charging"}
              </span>
            </div>

            <div className="rover-card-main">
              <div>
                <small>{rover.id}</small>
                <h4>{rover.name}</h4>
              </div>
              <div className="rover-signal">
                <Wifi size={12} /> {rover.signal}
              </div>
            </div>

            <div className="rover-card-meta">
              <div>
                <span>Battery</span>
                <strong>{rover.battery}%</strong>
              </div>
              <div>
                <span>Zone</span>
                <strong>{rover.route}</strong>
              </div>
            </div>

            <div className="rover-progress-block">
              <div className="progress-label">
                <span>Route sync</span>
                <strong>{rover.progress}%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: `${rover.progress}%` }} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="fleet-footer-bar">
        <div className="footer-info">
          <Activity size={14} /> {lastRefresh}
        </div>
        <div className="footer-info">
          <MapPin size={14} /> 26 active nodes
        </div>
        <div className="footer-info">
          <ShieldCheck size={14} /> security locked
        </div>
      </div>
    </div>
  );
}

export default RoverManagement;