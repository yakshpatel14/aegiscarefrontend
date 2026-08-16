import { useState } from "react";
import {
  UserPlus,
  ShieldCheck,
  Eye,
  ClipboardList,
  MoreVertical,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@egiscare.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Caretaker",
    email: "caretaker@egiscare.com",
    role: "Caretaker",
    status: "Active",
  },
  {
    id: 3,
    name: "System Viewer",
    email: "viewer@egiscare.com",
    role: "Viewer",
    status: "Pending",
  },
];

function roleIcon(role) {
  if (role === "Admin") return <ShieldCheck size={15} />;
  if (role === "Caretaker") return <ClipboardList size={15} />;
  return <Eye size={15} />;
}

function Users() {
  const [users] = useState(initialUsers);

  return (
    <div className="users-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACCESS CONTROL</p>
          <h2>Users & Permissions</h2>
          <p className="page-description">
            Manage EGISCARE users, roles and system access.
          </p>
        </div>

        <button className="primary-action">
          <UserPlus size={17} />
          Add User
        </button>
      </div>

      <div className="permission-info">
        <ShieldCheck size={18} />

        <div>
          <strong>Role-based access control</strong>
          <p>
            Users can only perform actions allowed by their assigned role.
          </p>
        </div>
      </div>

      <div className="users-card">
        <div className="users-card-header">
          <div>
            <h3>System Users</h3>
            <span>{users.length} users</span>
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Permissions</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={`role-badge ${user.role.toLowerCase()}`}>
                      {roleIcon(user.role)}
                      {user.role}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`user-status ${user.status.toLowerCase()}`}
                    >
                      <span></span>
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <span className="permission-text">
                      {user.role === "Admin"
                        ? "Full system access"
                        : user.role === "Caretaker"
                          ? "Tasks & deliveries"
                          : "Monitoring only"}
                    </span>
                  </td>

                  <td>
                    <button className="more-button">
                      <MoreVertical size={17} />
                    </button>
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

export default Users;