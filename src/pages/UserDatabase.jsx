import { useMemo, useState } from "react";
import { Search, ShieldCheck, Database, ArrowRight, UserCog } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function UserDatabase() {
  const { userDirectory, setUserDirectory } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(userDirectory[0]?.id || null);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return userDirectory;

    return userDirectory.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
  }, [search, userDirectory]);

  const selectedUser =
    filteredUsers.find((user) => user.id === selectedUserId) ||
    userDirectory.find((user) => user.id === selectedUserId) ||
    userDirectory[0];

  const updateSelectedUser = (field, value) => {
    if (!selectedUser) return;

    setUserDirectory((current) =>
      current.map((user) =>
        user.id === selectedUser.id ? { ...user, [field]: value } : user
      )
    );
  };

  return (
    <div className="users-page">
      <div className="security-hero">
        <div className="security-hero-copy">
          <p className="eyebrow">DATABASE</p>
          <h2>User database</h2>
          <p className="page-description">
            Full account overview, admin user management, and direct control of each user record.
          </p>
        </div>

        <div className="security-hero-stats">
          <div className="mini-stat-card">
            <Database size={16} />
            <div>
              <span>Total records</span>
              <strong>{userDirectory.length}</strong>
            </div>
          </div>
          <div className="mini-stat-card accent">
            <ShieldCheck size={16} />
            <div>
              <span>Admins</span>
              <strong>{userDirectory.filter((user) => user.role === "admin").length}</strong>
            </div>
          </div>
          <div className="mini-stat-card success">
            <UserCog size={16} />
            <div>
              <span>Active</span>
              <strong>{userDirectory.filter((user) => user.status === "Active").length}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="database-shell">
        <aside className="database-list-card">
          <div className="panel-title-row">
            <div>
              <p className="section-label">USER LIST</p>
              <h3>Accounts</h3>
            </div>
          </div>

          <div className="search-box compact-search database-search">
            <Search size={14} />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search user record"
            />
          </div>

          <div className="database-user-list">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                className={`database-user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="table-avatar tiny-avatar">{user.name.charAt(0)}</div>
                <div className="database-user-meta">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        </aside>

        {selectedUser && (
          <section className="admin-form-card database-form-card">
            <div className="panel-title-row">
              <div>
                <p className="section-label">USER DETAILS</p>
                <h3>{selectedUser.name}</h3>
              </div>
            </div>

            <div className="admin-form database-form">
              <label>
                <span>Name</span>
                <input
                  value={selectedUser.name}
                  onChange={(event) => updateSelectedUser("name", event.target.value)}
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  value={selectedUser.email}
                  onChange={(event) => updateSelectedUser("email", event.target.value)}
                />
              </label>

              <div className="two-column">
                <label>
                  <span>Role</span>
                  <select
                    value={selectedUser.role}
                    onChange={(event) => updateSelectedUser("role", event.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </label>

                <label>
                  <span>Status</span>
                  <select
                    value={selectedUser.status}
                    onChange={(event) => updateSelectedUser("status", event.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </label>
              </div>

              <div className="two-column">
                <label>
                  <span>Plan</span>
                  <select
                    value={selectedUser.plan || "Essential"}
                    onChange={(event) => updateSelectedUser("plan", event.target.value)}
                  >
                    <option value="Essential">Essential</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </label>

                <label>
                  <span>Service status</span>
                  <input value={selectedUser.status || "Active"} readOnly />
                </label>
              </div>

              <div className="two-column">
                <label>
                  <span>Service start</span>
                  <input
                    type="date"
                    value={selectedUser.serviceStart || "2026-08-29"}
                    onChange={(event) => updateSelectedUser("serviceStart", event.target.value)}
                  />
                </label>

                <label>
                  <span>Service end</span>
                  <input
                    type="date"
                    value={selectedUser.serviceEnd || "2026-12-31"}
                    onChange={(event) => updateSelectedUser("serviceEnd", event.target.value)}
                  />
                </label>
              </div>

              <div className="service-list-editor">
                <div className="stacked-header">
                  <span>Assigned services</span>
                </div>
                {(selectedUser.services || []).map((service, index) => (
                  <div key={`${selectedUser.id}-${index}`} className="mini-service-row">
                    <input
                      value={service}
                      onChange={(event) => {
                        const nextServices = [...(selectedUser.services || [])];
                        nextServices[index] = event.target.value;
                        updateSelectedUser("services", nextServices);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default UserDatabase;
