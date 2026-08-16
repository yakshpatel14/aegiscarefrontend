import {
  Bot,
  Battery,
  Wifi,
  MapPin,
  Clock3,
  Activity,
  Navigation,
  RefreshCw,
} from "lucide-react";

function RoverManagement() {
  return (
    <div className="rover-management-page">

      <div className="page-heading">
        <div>
          <p className="eyebrow">ROVER OPERATIONS</p>

          <h2>Rover Management</h2>

          <p className="page-description">
            Monitor the health, connection and current state of your
            EGISCARE rover.
          </p>
        </div>

        <button className="secondary-action">
          <RefreshCw size={15} />
          Refresh Status
        </button>
      </div>

      {/* Rover overview */}

      <div className="rover-overview-card">

        <div className="rover-main-info">

          <div className="large-rover-icon">
            <Bot size={32} />
          </div>

          <div>
            <div className="rover-title-row">
              <h3>EGISCARE Rover</h3>

              <span className="rover-status online">
                <span className="status-dot"></span>
                Online
              </span>
            </div>

            <p>RVR-001</p>

            <span className="connection-text">
              <Wifi size={13} />
              Connected to EGISCARE backend
            </span>
          </div>

        </div>

        <div className="rover-overview-actions">
          <button className="secondary-action">
            <Navigation size={15} />
            View Location
          </button>
        </div>

      </div>

      {/* Rover metrics */}

      <div className="rover-metrics">

        <div className="rover-metric-card">
          <div className="metric-icon green">
            <Battery size={19} />
          </div>

          <div>
            <span>Battery</span>
            <strong>82%</strong>
            <small>Good condition</small>
          </div>
        </div>

        <div className="rover-metric-card">
          <div className="metric-icon blue">
            <Wifi size={19} />
          </div>

          <div>
            <span>Connection</span>
            <strong>Stable</strong>
            <small>Connected via backend</small>
          </div>
        </div>

        <div className="rover-metric-card">
          <div className="metric-icon purple">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Uptime</span>
            <strong>14h 32m</strong>
            <small>Since today</small>
          </div>
        </div>

        <div className="rover-metric-card">
          <div className="metric-icon orange">
            <Activity size={19} />
          </div>

          <div>
            <span>Current Task</span>
            <strong>Delivery</strong>
            <small>Medicine delivery</small>
          </div>
        </div>

      </div>

      {/* Current operation */}

      <div className="rover-management-grid">

        <section className="rover-panel">

          <div className="panel-heading">
            <div>
              <p className="section-label">CURRENT OPERATION</p>
              <h3>Medicine Delivery</h3>
            </div>

            <span className="operation-badge">
              In Progress
            </span>
          </div>

          <div className="operation-route">

            <div className="route-point">
              <div className="route-icon start">
                <MapPin size={16} />
              </div>

              <div>
                <span>From</span>
                <strong>Medicine Storage</strong>
              </div>
            </div>

            <div className="route-line"></div>

            <div className="route-point">
              <div className="route-icon destination">
                <MapPin size={16} />
              </div>

              <div>
                <span>Destination</span>
                <strong>Care Room 203</strong>
              </div>
            </div>

          </div>

          <div className="operation-progress">

            <div className="progress-label">
              <span>Task progress</span>
              <strong>68%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: "68%" }}
              ></div>
            </div>

          </div>

        </section>

        {/* System information */}

        <section className="rover-panel">

          <div className="panel-heading">
            <div>
              <p className="section-label">SYSTEM</p>
              <h3>Rover Information</h3>
            </div>
          </div>

          <div className="system-info-list">

            <div>
              <span>Rover ID</span>
              <strong>RVR-001</strong>
            </div>

            <div>
              <span>Firmware</span>
              <strong>v1.0.4</strong>
            </div>

            <div>
              <span>Controller</span>
              <strong>Raspberry Pi</strong>
            </div>

            <div>
              <span>Backend</span>
              <strong>Connected</strong>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default RoverManagement;