function StatusCard({ title, value, subtitle, icon, status }) {
  return (
    <div className="status-card">
      <div className="status-card-top">
        <span className="status-card-title">{title}</span>

        <div className={`status-card-icon ${status || ""}`}>
          {icon}
        </div>
      </div>

      <div className="status-card-value">{value}</div>

      {subtitle && (
        <div className="status-card-subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default StatusCard;