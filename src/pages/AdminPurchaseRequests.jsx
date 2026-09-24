import { useAuth } from "../context/AuthContext";

function AdminPurchaseRequests() {
  const { purchaseRequests, updatePurchaseRequest } = useAuth();

  const handleStatus = (requestId, status) => {
    updatePurchaseRequest(requestId, { status });
  };

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">BUSINESS</p>
          <h1>Purchase requests</h1>
          <p className="page-description">Review incoming customer robot requests and approve them.</p>
        </div>
      </div>

      <section className="panel-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Robot</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchaseRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.customerName}</td>
                  <td>{request.email}</td>
                  <td>{request.productName}</td>
                  <td>₹{request.price.toLocaleString("en-IN")}</td>
                  <td><span className="status-badge success">{request.status}</span></td>
                  <td>
                    <div className="inline-action-group">
                      <button type="button" className="tiny-btn" onClick={() => handleStatus(request.id, "Approved")}>Approve</button>
                      <button type="button" className="tiny-btn warn" onClick={() => handleStatus(request.id, "Rejected")}>Reject</button>
                    </div>
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

export default AdminPurchaseRequests;
