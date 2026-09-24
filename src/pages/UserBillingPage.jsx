import { PLATFORM_DATA } from "../data/platformData";

function UserBillingPage() {
  const { billing } = PLATFORM_DATA.user;

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">SUBSCRIPTION</p>
          <h1>My plan & billing</h1>
          <p className="page-description">Your care plan, billing status, and payment history.</p>
        </div>
      </div>

      <div className="stats-grid three-up">
        <div className="kpi-card cyan"><div className="kpi-header"><span>Plan</span></div><strong>{billing.plan}</strong><small>Current tier</small></div>
        <div className="kpi-card green"><div className="kpi-header"><span>Status</span></div><strong>{billing.status}</strong><small>Current payment</small></div>
        <div className="kpi-card purple"><div className="kpi-header"><span>Next billing</span></div><strong>{billing.nextBilling}</strong><small>{billing.invoiceAmount}</small></div>
      </div>

      <section className="panel-card table-card">
        <div className="panel-header-row">
          <div>
            <p className="section-label">PAYMENT HISTORY</p>
            <h3>Invoices</h3>
          </div>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {billing.paymentHistory.map((entry) => (
                <tr key={entry.label}>
                  <td>{entry.label}</td>
                  <td>{entry.amount}</td>
                  <td><span className="status-badge success">{entry.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default UserBillingPage;
