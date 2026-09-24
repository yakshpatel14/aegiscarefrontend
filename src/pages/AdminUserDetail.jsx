import { useNavigate, useParams } from "react-router-dom";
import { Eye, Save, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userDirectory, enterCustomerPreview, isAdminPreview, setUserDirectory } = useAuth();

  const selectedUser = userDirectory.find((user) => String(user.id) === String(id)) || userDirectory[0];

  if (!selectedUser) {
    return <div className="role-page-shell"><div className="empty-state">No user found.</div></div>;
  }

  const updateSelectedUser = (field, value) => {
    setUserDirectory((current) =>
      current.map((user) => (String(user.id) === String(selectedUser.id) ? { ...user, [field]: value } : user))
    );
  };

  const openPreview = () => {
    enterCustomerPreview(selectedUser.id);
    navigate("/user/dashboard");
  };

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">ADMIN PREVIEW</p>
          <h1>{selectedUser.name}</h1>
          <p className="page-description">Customer profile, linked robot, service plan, and account state.</p>
        </div>
        <div className="hero-actions">
          <button type="button" className="primary-action" onClick={openPreview}><Eye size={15} /> Open customer view</button>
        </div>
      </div>

      {isAdminPreview && (
        <div className="preview-banner">
          <ShieldCheck size={16} /> ADMIN PREVIEW • Viewing customer: {selectedUser.name}
        </div>
      )}

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">CUSTOMER PROFILE</p>
              <h3>Account details</h3>
            </div>
          </div>

          <div className="profile-summary">
            <div className="avatar-large">{selectedUser.name?.charAt(0)}</div>
            <div>
              <h4>{selectedUser.name}</h4>
              <p>{selectedUser.email}</p>
              <span className={`status-badge ${selectedUser.status === "Active" ? "success" : "warning"}`}>{selectedUser.status}</span>
            </div>
          </div>

          <div className="admin-form" style={{ marginTop: "18px" }}>
            <label>
              <span>Full name</span>
              <input value={selectedUser.name || ""} onChange={(event) => updateSelectedUser("name", event.target.value)} />
            </label>

            <label>
              <span>Email</span>
              <input value={selectedUser.email || ""} onChange={(event) => updateSelectedUser("email", event.target.value)} />
            </label>

            <label>
              <span>Phone</span>
              <input value={selectedUser.phone || ""} onChange={(event) => updateSelectedUser("phone", event.target.value)} />
            </label>

            <div className="two-column">
              <label>
                <span>Plan</span>
                <select value={selectedUser.plan || "Essential"} onChange={(event) => updateSelectedUser("plan", event.target.value)}>
                  <option value="Essential">Essential</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </label>

              <label>
                <span>Status</span>
                <select value={selectedUser.status || "Active"} onChange={(event) => updateSelectedUser("status", event.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </label>
            </div>

            <label>
              <span>Address</span>
              <input value={selectedUser.address || ""} onChange={(event) => updateSelectedUser("address", event.target.value)} />
            </label>

            <div className="two-column">
              <label>
                <span>City</span>
                <input value={selectedUser.city || ""} onChange={(event) => updateSelectedUser("city", event.target.value)} />
              </label>
              <label>
                <span>State</span>
                <input value={selectedUser.state || ""} onChange={(event) => updateSelectedUser("state", event.target.value)} />
              </label>
            </div>

            <label>
              <span>Emergency contact</span>
              <input value={selectedUser.emergencyContact || ""} onChange={(event) => updateSelectedUser("emergencyContact", event.target.value)} />
            </label>

            <div className="crud-actions">
              <button type="button" className="primary-action" onClick={() => navigate("/admin/users")}>
                <Save size={15} /> Save changes
              </button>
            </div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">ASSIGNED ROBOT</p>
              <h3>Care system</h3>
            </div>
          </div>

          <div className="robot-preview-card">
            <div className="mini-robot"><UserRound size={18} /></div>
            <div>
              <strong>{selectedUser.services?.[0] || "AegisCare-AC001"}</strong>
              <p>Battery 84% • Living Room • Online</p>
            </div>
          </div>

          <div className="info-grid compact-grid">
            <div><span>Battery</span><strong>84%</strong></div>
            <div><span>Location</span><strong>Living Room</strong></div>
            <div><span>Today's tasks</span><strong>4</strong></div>
            <div><span>Alerts</span><strong>1</strong></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminUserDetail;
