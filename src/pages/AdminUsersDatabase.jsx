import { useMemo, useState } from "react";
import { EllipsisVertical, Eye, PencilLine, Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminUsersDatabase() {
  const { userDirectory, setUserDirectory, enterCustomerPreview } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return userDirectory.filter((user) => user.role !== "admin");

    return userDirectory.filter(
      (user) =>
        user.role !== "admin" &&
        (user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.plan.toLowerCase().includes(term))
    );
  }, [search, userDirectory]);

  const updateUser = (userId, field, value) => {
    setUserDirectory((current) =>
      current.map((user) => (user.id === userId ? { ...user, [field]: value } : user))
    );
  };

  const openUserPreview = (userId) => {
    enterCustomerPreview(userId);
    setMenuOpenId(null);
    navigate("/user/dashboard");
  };

  return (
    <div className="users-page">
      <div className="page-hero admin-hero light-hero">
        <div>
          <p className="eyebrow">ADMIN DIRECTORY</p>
          <h1>Users database</h1>
          <p className="page-description">Customer access, account health, and service assignments for the full user directory.</p>
        </div>
        <div className="hero-actions">
          <button type="button" className="primary-action add-user-btn" onClick={() => navigate("/admin/users")}> <UserPlus size={15} /> Add user </button>
        </div>
      </div>

      <div className="users-card">
        <div className="users-card-header">
          <div>
            <p className="section-label">CUSTOMERS</p>
            <h3>All users</h3>
          </div>
          <div className="compact-search">
            <Search size={14} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search user" />
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Service</th>
                <th>Actions</th>
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
                    <span className="permission-text">{user.plan || "Essential"}</span>
                  </td>
                  <td>
                    <span className={`user-status ${user.status.toLowerCase()}`}>
                      <span /> {user.status}
                    </span>
                  </td>
                  <td>
                    <span className="permission-text">{(user.services || ["Fleet Monitoring"])[0]}</span>
                  </td>
                  <td>
                    <div className="action-stack">
                      <button type="button" className="table-action edit" onClick={() => navigate(`/admin/users/${user.id}`)} aria-label={`Edit ${user.name}`}>
                        <PencilLine size={14} />
                      </button>
                      <button type="button" className="table-action edit" onClick={() => navigate(`/admin/users/${user.id}`)} aria-label={`Details for ${user.name}`}>
                        <Eye size={14} />
                      </button>
                      <div className="menu-wrapper">
                        <button type="button" className="table-action menu" onClick={() => setMenuOpenId(menuOpenId === user.id ? null : user.id)} aria-label={`Actions for ${user.name}`}>
                          <EllipsisVertical size={14} />
                        </button>
                        {menuOpenId === user.id && (
                          <div className="context-menu">
                            <button type="button" onClick={() => { setMenuOpenId(null); navigate(`/admin/users/${user.id}`); }}>Edit</button>
                            <button type="button" onClick={() => { setMenuOpenId(null); navigate(`/admin/users/${user.id}`); }}>Details</button>
                            <button type="button" onClick={() => openUserPreview(user.id)}>Open as {user.name}</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersDatabase;
