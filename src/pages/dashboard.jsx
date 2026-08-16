import {
  Activity,
  Battery,
  Clock3,
  Wifi,
  ArrowRight,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatusCard from "../components/StatusCard";
import RoverCard from "../components/RoverCard";
import ActivityList from "../components/ActivityList";

import { roverData, activities } from "../data/mockData";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard-page">

        {/* Page heading */}

        <div className="page-heading">
          <div>
            <p className="eyebrow">OVERVIEW</p>

            <h2>Rover Operations</h2>

            <p className="page-description">
              Monitor and manage your EGISCARE rover system.
            </p>
          </div>

          <div className="system-status">
            <span className="online-dot"></span>
            System Operational
          </div>
        </div>

        {/* Status cards */}

        <div className="status-grid">

          <StatusCard
            title="Rover Status"
            value="Online"
            subtitle="RVR-001 is operational"
            icon={<Wifi size={19} />}
            status="success"
          />

          <StatusCard
            title="Battery"
            value={`${roverData.battery}%`}
            subtitle="Estimated 3h 45m remaining"
            icon={<Battery size={19} />}
            status="success"
          />

          <StatusCard
            title="Uptime"
            value={roverData.uptime}
            subtitle="Since today's startup"
            icon={<Clock3 size={19} />}
          />

          <StatusCard
            title="Active Tasks"
            value="03"
            subtitle="01 medicine delivery pending"
            icon={<Activity size={19} />}
          />

        </div>

        {/* Main dashboard grid */}

        <div className="dashboard-grid">

          {/* Rover */}

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <p className="section-label">ROVER</p>
                <h3>Active Rover</h3>
              </div>

              <button className="text-button">
                View Details
                <ArrowRight size={15} />
              </button>
            </div>

            <RoverCard rover={roverData} />
          </section>

          {/* Activity */}

          <section className="dashboard-section">
            <div className="section-heading">
              <div>
                <p className="section-label">ACTIVITY</p>
                <h3>Recent Activity</h3>
              </div>

              <button className="text-button">
                View History
                <ArrowRight size={15} />
              </button>
            </div>

            <ActivityList activities={activities} />
          </section>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;