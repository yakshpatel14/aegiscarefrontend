import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function UserSupportPage() {
  const { user, supportTickets, submitSupportTicket } = useAuth();
  const [form, setForm] = useState({ subject: "", description: "", priority: "Medium" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitSupportTicket({
      customerId: user.id,
      customerName: user.name,
      subject: form.subject,
      description: form.description,
      priority: form.priority,
    });
    setSubmitted(true);
    setForm({ subject: "", description: "", priority: "Medium" });
  };

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">SUPPORT</p>
          <h1>Customer support</h1>
          <p className="page-description">Raise a support request and track status in one place.</p>
        </div>
      </div>

      <div className="content-grid two-col">
        <section className="panel-card">
          <div className="panel-header-row"><div><p className="section-label">NEW TICKET</p><h3>Create support request</h3></div></div>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              <span>Issue subject</span>
              <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
            </label>
            <label>
              <span>Priority</span>
              <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label className="full-width">
              <span>Description</span>
              <textarea rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            </label>
            {submitted && <div className="success-box full-width">Support ticket created successfully.</div>}
            <button type="submit" className="primary-action full-width">Create ticket</button>
          </form>
        </section>

        <section className="panel-card">
          <div className="panel-header-row"><div><p className="section-label">MY TICKETS</p><h3>Open requests</h3></div></div>
          <div className="stack-block">
            {supportTickets.filter((ticket) => ticket.customerId === user?.id).length ? supportTickets.filter((ticket) => ticket.customerId === user?.id).map((ticket) => (
              <div key={ticket.id} className="info-bubble info">
                <strong>{ticket.id} • {ticket.subject}</strong>
                <p>{ticket.status} • {ticket.priority}</p>
              </div>
            )) : <div className="empty-state">You currently have no support requests.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserSupportPage;
