import { useLocation } from "react-router-dom";
import { Activity, BarChart3, Bell, Camera, Gamepad2, Pill, Settings, Users } from "lucide-react";

const modules = {
  "/camera": ["Camera Monitoring", "Live camera feeds and rover vision will appear here.", Camera],
  "/control": ["Rover Control", "Remote rover controls will appear here.", Gamepad2],
  "/medicine": ["Medicine Delivery", "Delivery queues and handoff status will appear here.", Pill],
  "/recipients": ["Care Recipients", "Resident profiles and care schedules will appear here.", Users],
  "/analytics": ["Analytics", "Operational trends and care insights will appear here.", BarChart3],
  "/alerts": ["Alerts", "System notifications and care alerts will appear here.", Bell],
  "/settings": ["Settings", "System preferences and integrations will appear here.", Settings],
};

function ModulePlaceholder() {
  const { pathname } = useLocation();
  const [title, description, Icon] = modules[pathname] || ["Module", "This module is ready for backend integration.", Activity];

  return (
    <div className="module-placeholder">
      <div className="module-placeholder-icon"><Icon size={28} /></div>
      <p className="eyebrow">AEGISCARE SYSTEM</p>
      <h2>{title}</h2>
      <p className="page-description">{description}</p>
      <span className="module-placeholder-status"><span /> Frontend module ready</span>
    </div>
  );
}

export default ModulePlaceholder;
