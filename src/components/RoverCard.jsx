import { Bot, Battery, Clock3 } from "lucide-react";

function RoverCard({ rover }) {
  return (
    <div className="rover-card">
      <div className="rover-card-header">
        <div className="rover-identity">
          <div className="rover-icon">
            <Bot size={21} />
          </div>

          <div>
            <h3>{rover.name}</h3>
            <span>{rover.id}</span>
          </div>
        </div>

        <span className={`rover-status ${rover.status.toLowerCase()}`}>
          <span className="status-dot"></span>
          {rover.status}
        </span>
      </div>

      <div className="rover-card-details">
        <div>
          <span>Battery</span>
          <strong>
            <Battery size={15} />
            {rover.battery}%
          </strong>
        </div>

        <div>
          <span>Uptime</span>
          <strong>
            <Clock3 size={15} />
            {rover.uptime}
          </strong>
        </div>
      </div>

      <div className="battery-bar">
        <div
          className="battery-progress"
          style={{ width: `${rover.battery}%` }}
        ></div>
      </div>
    </div>
  );
}

export default RoverCard;