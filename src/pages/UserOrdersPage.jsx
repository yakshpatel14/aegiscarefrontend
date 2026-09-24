import { useAuth } from "../context/AuthContext";

function UserOrdersPage() {
  const { purchaseRequests, user } = useAuth();

  const userOrders = purchaseRequests.filter((request) => request.customerId === user?.id);

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">MY ORDERS</p>
          <h1>Purchase requests</h1>
          <p className="page-description">Track your robot requests and approvals.</p>
        </div>
      </div>

      <section className="panel-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Robot</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.length ? userOrders.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.productName}</td>
                  <td>₹{request.price.toLocaleString("en-IN")}</td>
                  <td>{request.requestDate}</td>
                  <td><span className="status-badge success">{request.status}</span></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5"><div className="empty-state">No purchase requests yet.</div></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default UserOrdersPage;
