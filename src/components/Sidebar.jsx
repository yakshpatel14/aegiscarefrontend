import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Camera,
  Gamepad2,
  ClipboardList,
  Pill,
  BarChart3,
  Users,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, hasPermission, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <Bot size={22} />
        </div>

        <div>
          <h2>EGISCARE</h2>
          <span>ROBOTICS CARE SYSTEM</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        {/* OPERATIONS */}

        <p className="nav-section">OPERATIONS</p>

        {hasPermission("dashboard") && (
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        )}

        {hasPermission("roverManagement") && (
  <Link to="/rover" className="nav-item">
    <Bot size={18} />
    <span>Rover Management</span>
  </Link>
)}

        {hasPermission("camera") && (
          <a href="#" className="nav-item">
            <Camera size={18} />
            <span>Camera Monitoring</span>
          </a>
        )}

        {hasPermission("roverControl") && (
          <a href="#" className="nav-item">
            <Gamepad2 size={18} />
            <span>Rover Control</span>
          </a>
        )}

        {/* CARE & LOGISTICS */}

        <p className="nav-section">CARE & LOGISTICS</p>

        {hasPermission("tasks") && (
  <Link to="/tasks" className="nav-item">
    <ClipboardList size={18} />
    <span>Tasks & Medicine</span>
  </Link>
)}

        {hasPermission("medicineDelivery") && (
          <a href="#" className="nav-item">
            <Pill size={18} />
            <span>Medicine Delivery</span>
          </a>
        )}

        {hasPermission("dashboard") && (
          <a href="#" className="nav-item">
            <Users size={18} />
            <span>Care Recipients</span>
          </a>
        )}

        {/* MONITORING */}

        <p className="nav-section">MONITORING</p>

        {hasPermission("analytics") && (
          <a href="#" className="nav-item">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </a>
        )}

        {hasPermission("alerts") && (
          <a href="#" className="nav-item">
            <Bell size={18} />
            <span>Alerts</span>
          </a>
        )}

        {/* SYSTEM */}

        <p className="nav-section">SYSTEM</p>

        {hasPermission("users") && (
          <Link to="/users" className="nav-item">
            <ShieldCheck size={18} />
            <span>Users & Permissions</span>
          </Link>
        )}

        {hasPermission("settings") && (
          <a href="#" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </a>
        )}
      </nav>

      {/* USER / LOGOUT */}

      <div className="sidebar-bottom">
        <div className="user-mini">
          <div className="user-avatar">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div className="user-info">
            <strong>{user?.name || "User"}</strong>

            <span>
              {user?.role
                ? user.role.charAt(0).toUpperCase() +
                  user.role.slice(1)
                : "User"}
            </span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;