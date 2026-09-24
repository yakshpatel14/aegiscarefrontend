import { NavLink } from "react-router-dom";
import {
  Bell,
  Bot,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { adminNav, userNav } from "../data/platformData";

function Sidebar({ mobileMenuOpen, onNavigate }) {
  const { user, logout } = useAuth();
  const navGroups = user?.role === "admin" ? adminNav : userNav;

  return (
    <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-mark"><Bot size={20} /></div>
        <div>
          <h2>{user?.role === "admin" ? "AEGISCORE" : "AEGISCARE"}</h2>
          <span>{user?.role === "admin" ? "CONTROL CENTER" : "MY CARE SYSTEM"}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="nav-group">
            <p className="nav-section">{group.label}</p>
            {group.items.map((item) => (
              <NavLink key={item.label} to={item.path} className="nav-item" onClick={onNavigate} end={item.path === "/admin/dashboard" || item.path === "/user/dashboard"}>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="support-button" type="button" onClick={() => window.location.href = user?.role === "admin" ? "/admin/contact-messages" : "/contact"}><Bell size={14} /> Contact messages</button>
      </div>

      <div className="sidebar-bottom">
        <div className="user-mini">
          <div className="user-avatar">{user?.name?.charAt(0) || "A"}</div>
          <div className="user-info">
            <strong>{user?.name || "Admin"}</strong>
            <span>{user?.role || "System Operator"}</span>
          </div>
        </div>
        <button className="logout-button" onClick={logout} type="button"><LogOut size={15} /><span>Logout</span></button>
      </div>
    </aside>
  );
}

export default Sidebar;
