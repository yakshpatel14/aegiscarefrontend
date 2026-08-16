import {
  CheckCircle2,
  Pill,
  MapPin,
  Bot,
} from "lucide-react";

function ActivityList({ activities }) {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div className="activity-item" key={activity.id}>
          <div className={`activity-icon ${activity.type}`}>
            {activity.type === "medicine" && <Pill size={16} />}
            {activity.type === "location" && <MapPin size={16} />}
            {activity.type === "rover" && <Bot size={16} />}
            {activity.type === "completed" && (
              <CheckCircle2 size={16} />
            )}
          </div>

          <div className="activity-content">
            <strong>{activity.title}</strong>
            <span>{activity.description}</span>
          </div>

          <time>{activity.time}</time>
        </div>
      ))}
    </div>
  );
}

export default ActivityList;