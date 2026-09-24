import { PLATFORM_DATA } from "../data/platformData";

function AdminBilling() {
  const { revenue } = PLATFORM_DATA.admin;

  return (
    <div className="role-page-shell">
      <div className="page-hero admin-hero">
        <div>
          <p className="eyebrow">BUSINESS</p>
          <h1>Revenue & billing</h1>
          <p className="page-description">Overview of subscriptions, payment states, and pending revenue.</p>
        </div>
      </div>

      <div className="stats-grid four-up">
        <div className="kpi-card cyan"><div className="kpi-header"><span>Monthly revenue</span></div><strong>{revenue.monthly}</strong><small>Current cycle</small></div>
        <div className="kpi-card green"><div className="kpi-header"><span>Yearly revenue</span></div><strong>{revenue.yearly}</strong><small>Annual run rate</small></div>
        <div className="kpi-card purple"><div className="kpi-header"><span>Pending payments</span></div><strong>{revenue.pending}</strong><small>18 accounts</small></div>
        <div className="kpi-card amber"><div className="kpi-header"><span>Failed payments</span></div><strong>{revenue.failed}</strong><small>Needs follow-up</small></div>
      </div>

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">PAYMENT STATUS</p>
              <h3>Current states</h3>
            </div>
          </div>
          <div className="service-stack">
            <div className="service-row"><div className="service-meta">Paid</div><div className="service-values"><span className="status-badge success">81%</span><strong>1,024</strong></div></div>
            <div className="service-row"><div className="service-meta">Pending</div><div className="service-values"><span className="status-badge warning">14%</span><strong>176</strong></div></div>
            <div className="service-row"><div className="service-meta">Failed</div><div className="service-values"><span className="status-badge critical">4%</span><strong>48</strong></div></div>
            <div className="service-row"><div className="service-meta">Overdue</div><div className="service-values"><span className="status-badge info">2%</span><strong>19</strong></div></div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header-row">
            <div>
              <p className="section-label">SUBSCRIPTIONS</p>
              <h3>Plan mix</h3>
            </div>
          </div>
          <div className="info-grid compact-grid">
            <div><span>Essential</span><strong>612</strong></div>
            <div><span>Professional</span><strong>428</strong></div>
            <div><span>Enterprise</span><strong>208</strong></div>
            <div><span>Cancelled</span><strong>{revenue.cancelled}</strong></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminBilling;
