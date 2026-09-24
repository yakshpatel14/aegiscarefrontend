import { useAuth } from "../context/AuthContext";

function AdminContactMessages() {
  const { contactMessages } = useAuth();

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">CUSTOMER OPERATIONS</p>
          <h1>Contact messages</h1>
          <p className="page-description">Review customer enquiries and support conversations.</p>
        </div>
      </div>

      <section className="panel-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.subject}</td>
                  <td><span className="status-badge info">{entry.status}</span></td>
                  <td>{entry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminContactMessages;
