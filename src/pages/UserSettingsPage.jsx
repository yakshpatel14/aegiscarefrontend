import { useAuth } from "../context/AuthContext";

function UserSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">PROFILE</p>
          <h1>Account settings</h1>
          <p className="page-description">Manage contact details, preferences, and care configuration.</p>
        </div>
      </div>

      <section className="panel-card">
        <div className="panel-header-row">
          <div>
            <p className="section-label">MY ACCOUNT</p>
            <h3>{user?.name || "Ava Patel"}</h3>
          </div>
        </div>
        <div className="info-grid compact-grid">
          <div><span>Name</span><strong>{user?.name || "Ava Patel"}</strong></div>
          <div><span>Email</span><strong>{user?.email || "user@aegiscare.com"}</strong></div>
          <div><span>Role</span><strong>{user?.role || "user"}</strong></div>
          <div><span>Plan</span><strong>Essential</strong></div>
        </div>
      </section>
    </div>
  );
}

export default UserSettingsPage;
