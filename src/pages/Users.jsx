import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Eye,
  Lock,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  name: "",
  email: "",
  role: "user",
  status: "Active",
  plan: "Essential",
  serviceStart: "2026-08-29",
  serviceEnd: "2026-12-31",
  services: ["Fleet Monitoring"],
};

function roleIcon(role) {
  const capitalized = role === "admin" ? "Admin" : "User";
  if (capitalized === "Admin") return <ShieldCheck size={15} />;
  return <Eye size={15} />;
}

function getRolePermission(role) {
  if (role === "admin") return "Full system access across all users and settings";
  return "Personal dashboard access and assigned workflows";
}

function UsersPage() {
  const { user: currentUser, userDirectory, setUserDirectory, updateCurrentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    plan: currentUser?.plan || "Essential",
    serviceStart: currentUser?.serviceStart || "2026-08-29",
    serviceEnd: currentUser?.serviceEnd || "2026-12-31",
    services: currentUser?.services || ["Fleet Monitoring"],
  });

  const users = useMemo(() => {
    if (!isAdmin) {
      return userDirectory.filter((user) => user.email === currentUser?.email);
    }

    return userDirectory;
  }, [currentUser, isAdmin, userDirectory]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
  }, [search, users]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) return;

    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.toLowerCase(),
      services: Array.isArray(form.services) ? form.services : ["Fleet Monitoring"],
    };

    if (editingId) {
      setUserDirectory((current) =>
        current.map((user) => (user.id === editingId ? { ...user, ...payload } : user))
      );
    } else {
      setUserDirectory((current) => [
        {
          id: Date.now(),
          ...payload,
        },
        ...current,
      ]);
    }

    resetForm();
  };

  const handleProfileSave = (event) => {
    event.preventDefault();

    if (!profileForm.name.trim() || !profileForm.email.trim()) return;

    const nextProfile = {
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      plan: profileForm.plan,
      serviceStart: profileForm.serviceStart,
      serviceEnd: profileForm.serviceEnd,
      services: profileForm.services.length ? profileForm.services : ["Fleet Monitoring"],
    };

    updateCurrentUser(nextProfile);
    setUserDirectory((current) =>
      current.map((user) =>
        user.email === currentUser.email ? { ...user, ...nextProfile } : user
      )
    );
  };

  const addService = () => {
    setProfileForm((current) => ({
      ...current,
      services: [...(current.services || []), `New Service ${((current.services || []).length + 1)}`],
    }));
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      plan: user.plan || "Essential",
      serviceStart: user.serviceStart || "2026-08-29",
      serviceEnd: user.serviceEnd || "2026-12-31",
      services: user.services || ["Fleet Monitoring"],
    });
  };

  const handleDelete = (id) => {
    setUserDirectory((current) => current.filter((user) => user.id !== id));
    if (editingId === id) resetForm();
  };

  const activeCount = userDirectory.filter((user) => user.status === "Active").length;
  const adminCount = userDirectory.filter((user) => user.role === "admin").length;
  const serverLoad = Math.min(96, Math.max(42, Math.round((activeCount / Math.max(1, userDirectory.length)) * 100 + 30)));

  return (
    <div className="users-page">
      <div className="security-hero">
        <div className="security-hero-copy">
          <p className="eyebrow">ACCESS CONTROL</p>
          <h2>{isAdmin ? "Security & admin" : "My account"}</h2>
          <p className="page-description">
            {isAdmin
              ? "Full user visibility, access control, and admin management across the AEGISCARE platform."
              : "Your personal AEGISCARE account access and permissions."}
          </p>
        </div>

        <div className="security-hero-stats">
          <div className="mini-stat-card">
            <Users size={16} />
            <div>
              <span>{isAdmin ? "Total users" : "Account"}</span>
              <strong>{isAdmin ? `${users.length}` : `${users.length}`}</strong>
            </div>
          </div>
          <div className="mini-stat-card accent">
            <ShieldCheck size={16} />
            <div>
              <span>{isAdmin ? "Server load" : "Role"}</span>
              <strong>{isAdmin ? `${serverLoad}%` : currentUser?.role || "user"}</strong>
            </div>
          </div>
          <div className="mini-stat-card success">
            <Lock size={16} />
            <div>
              <span>{isAdmin ? "Active users" : "Active"}</span>
              <strong>{activeCount}</strong>
            </div>
          </div>
          <div className="mini-stat-card">
            <ShieldCheck size={16} />
            <div>
              <span>{isAdmin ? "Admins" : "Plan"}</span>
              <strong>{isAdmin ? adminCount : currentUser?.plan || "Essential"}</strong>
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="admin-db-cta-row">
          <div>
            <p className="section-label">DATABASE</p>
            <h3>Full user database</h3>
          </div>
          <button className="primary-action" onClick={() => navigate("/user-database")}>
            Open full database
            <ArrowUpRight size={15} />
          </button>
        </div>
      )}

      <div className="security-shell">
        {!isAdmin && (
          <section className="admin-form-card profile-editor-card">
            <div className="panel-title-row">
              <div>
                <p className="section-label">MY ACCOUNT</p>
                <h3>Profile & services</h3>
              </div>
            </div>

            <form className="admin-form" onSubmit={handleProfileSave}>
              <label>
                <span>Full name</span>
                <input
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                />
              </label>

              <div className="two-column">
                <label>
                  <span>Plan</span>
                  <select name="plan" value={profileForm.plan} onChange={handleProfileChange}>
                    <option value="Essential">Essential</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </label>

                <label>
                  <span>Status</span>
                  <input value={currentUser?.status || "Active"} readOnly />
                </label>
              </div>

              <div className="two-column">
                <label>
                  <span>Service start</span>
                  <input
                    type="date"
                    name="serviceStart"
                    value={profileForm.serviceStart}
                    onChange={handleProfileChange}
                  />
                </label>

                <label>
                  <span>Service end</span>
                  <input
                    type="date"
                    name="serviceEnd"
                    value={profileForm.serviceEnd}
                    onChange={handleProfileChange}
                  />
                </label>
              </div>

              <div className="service-list-editor">
                <div className="stacked-header">
                  <span>Services</span>
                  <button type="button" className="inline-ghost small-btn" onClick={addService}>
                    <Plus size={12} /> Add service
                  </button>
                </div>

                {profileForm.services.map((service, index) => (
                  <div key={`${service}-${index}`} className="mini-service-row">
                    <input
                      value={service}
                      onChange={(event) => {
                        const nextServices = [...profileForm.services];
                        nextServices[index] = event.target.value;
                        setProfileForm((current) => ({ ...current, services: nextServices }));
                      }}
                    />
                    <button
                      type="button"
                      className="table-action delete"
                      onClick={() => {
                        setProfileForm((current) => ({
                          ...current,
                          services: current.services.filter((_, itemIndex) => itemIndex !== index),
                        }));
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" className="primary-action">
                <Save size={16} /> Save profile
              </button>
            </form>
          </section>
        )}

        {isAdmin && (
          <section className="admin-form-card">
            <div className="panel-title-row">
              <div>
                <p className="section-label">MANAGE USER</p>
                <h3>{editingId ? "Edit access" : "Create account"}</h3>
              </div>
              {editingId && (
                <button className="inline-ghost" onClick={resetForm}>
                  <X size={14} /> Cancel
                </button>
              )}
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                <span>Full name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@aegiscare.com"
                />
              </label>

              <div className="two-column">
                <label>
                  <span>Role</span>
                  <select name="role" value={form.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </label>

                <label>
                  <span>Status</span>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </label>
              </div>

              <button type="submit" className="primary-action">
                {editingId ? <Save size={16} /> : <UserPlus size={16} />}
                {editingId ? "Update user" : "Add user"}
              </button>
            </form>
          </section>
        )}

        <section className="users-card">
          <div className="users-card-header">
            <div>
              <p className="section-label">SYSTEM USERS</p>
              <h3>{isAdmin ? "Permissions matrix" : "Your access profile"}</h3>
            </div>
            {isAdmin && (
              <div className="search-box compact-search">
                <Search size={14} />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search user"
                />
              </div>
            )}
          </div>

          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Permission</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="table-user">
                        <div className="table-avatar">{user.name.charAt(0)}</div>
                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className={`role-badge ${user.role.toLowerCase()}`}>
                        {roleIcon(user.role)}
                        {user.role === "admin" ? "Admin" : "User"}
                      </div>
                    </td>

                    <td>
                      <span className={`user-status ${user.status.toLowerCase()}`}>
                        <span />
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <span className="permission-text">{getRolePermission(user.role)}</span>
                    </td>

                    {isAdmin && (
                      <td>
                        <div className="action-stack">
                          <button className="table-action edit" onClick={() => navigate("/user-database")}>
                            <ArrowUpRight size={13} />
                          </button>
                          <button className="table-action edit" onClick={() => handleEdit(user)}>
                            <Pencil size={13} />
                          </button>
                          <button className="table-action delete" onClick={() => handleDelete(user.id)}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UsersPage;