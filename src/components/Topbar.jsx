import {
  Search,
  Bell,
  HelpCircle,
  Menu,
} from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="mobile-menu">
        <button>
          <Menu size={21} />
        </button>
      </div>

      <div className="topbar-title">
        <span>EGISCARE</span>
        <h1>Operations Dashboard</h1>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="icon-button">
          <HelpCircle size={19} />
        </button>

        <button className="icon-button notification-button">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="topbar-user">
          <div className="topbar-avatar">A</div>

          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;