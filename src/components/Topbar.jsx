import {
  Bell,
  ChevronDown,
  HelpCircle,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const routeTitles = {
  "/admin/dashboard": "Admin dashboard",
  "/admin/users": "Users database",
  "/admin/fleet": "Robot manager",
  "/admin/server": "Server monitor",
  "/admin/billing": "My accounts",
  "/admin/analytics": "Platform analytics",
  "/admin/settings": "Admin settings",
  "/admin/purchase-requests": "Purchase requests",
  "/admin/contact-messages": "Contact messages",
  "/admin/customer-service": "Customer service",
  "/user/dashboard": "My dashboard",
  "/user/robot": "My robot",
  "/user/monitoring": "Monitoring",
  "/user/tasks": "Missions",
  "/user/alerts": "Safety & alerts",
  "/user/billing": "Billing",
  "/user/profile": "Edit profile",
  "/user/orders": "My orders",
  "/user/support": "Support center",
  "/user/settings": "Profile & settings",
  "/shop": "Explore robots",
  "/contact": "Contact us",
  "/signup": "Create account",
};

function Topbar({ onMenu }) {
  const { user, isAdminPreview, getPreviewUser, exitCustomerPreview, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeUser = isAdminPreview ? getPreviewUser() : user;
  const headline = routeTitles[location.pathname] || "Overview";

  return (
    <header className="topbar">
      <div className="mobile-menu">
        <button type="button" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
      </div>

      <div className="topbar-left">
        <span className="brand-mini">{user?.role === "admin" ? "AEGISCORE" : "AEGISCARE"}</span>
        <span className="page-kicker">{headline}</span>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <Search size={15} />
          <input type="text" placeholder="Search" aria-label="Search" />
        </div>

        <button type="button" className="topbar-contact-btn" onClick={() => navigate("/admin/contact-messages")}>
          <Bell size={15} />
          Contact messages
        </button>

        <button type="button" className="icon-button"><HelpCircle size={16} /></button>

        <div className="topbar-profile">
          <button type="button" className="topbar-profile-button" onClick={() => setMenuOpen((open) => !open)}>
            <div className="topbar-avatar">{activeUser?.name?.charAt(0) || "A"}</div>
            <div className="topbar-user-meta">
              <strong>{activeUser?.name || "Admin"}</strong>
              <span>{isAdminPreview ? "Customer preview" : (user?.role || "System Operator")}</span>
            </div>
            <ChevronDown size={14} />
          </button>

          {menuOpen && (
            <div className="topbar-menu">
              <button type="button" onClick={() => { setMenuOpen(false); if (isAdminPreview) exitCustomerPreview(); navigate("/admin/settings"); }}>
                <Settings size={14} /> Edit admin
              </button>
              <button type="button" onClick={() => { setMenuOpen(false); logout(); navigate("/login"); }}>
                <Bell size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
