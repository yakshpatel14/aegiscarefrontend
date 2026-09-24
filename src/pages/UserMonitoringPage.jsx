import { Camera, Activity, Gauge, Zap } from "lucide-react";

function UserMonitoringPage() {
  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">MONITORING</p>
          <h1>Live camera & telemetry</h1>
          <p className="page-description">See recent robot activity and system performance from home.</p>
        </div>
      </div>

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">LIVE CAMERA</p>
              <h3>Room view</h3>
            </div>
          </div>
          <div className="camera-panel">
            <Camera size={28} />
            <span>Camera stream online</span>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">TELEMETRY</p>
              <h3>Current metrics</h3>
            </div>
          </div>
          <div className="info-grid compact-grid">
            <div><span>Motion</span><strong>Low</strong></div>
            <div><span>Sound</span><strong>Normal</strong></div>
            <div><span>Sensor health</span><strong>Stable</strong></div>
            <div><span>Signal</span><strong>Strong</strong></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserMonitoringPage;
