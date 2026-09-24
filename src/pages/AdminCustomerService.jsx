import { useAuth } from "../context/AuthContext";

function AdminCustomerService() {
  const { supportTickets, updateSupportTicket } = useAuth();

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">CUSTOMER SERVICE</p>
          <h1>Support management</h1>
          <p className="page-description">Handle support tickets without exposing them as a main admin nav item.</p>
        </div>
      </div>

      <section className="panel-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.customerName}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.priority}</td>
                  <td><span className="status-badge warning">{ticket.status}</span></td>
                  <td>
                    <button type="button" className="tiny-btn" onClick={() => updateSupportTicket(ticket.id, { status: "In Progress" })}>Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminCustomerService;
