import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ContactPage() {
  const { submitContactMessage, user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitContactMessage(form);
    setSubmitted(true);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card auth-card-lg">
        <div className="auth-brand-row">
          <div className="login-logo">✦</div>
          <div>
            <p className="eyebrow">CONTACT US</p>
            <h2>Talk to our team</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            <span>Name</span>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label>
            <span>Phone</span>
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </label>
          <label>
            <span>Subject</span>
            <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
          </label>
          <label className="full-width">
            <span>Message</span>
            <textarea rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
          </label>

          {submitted && <div className="success-box full-width">MESSAGE SENT SUCCESSFULLY</div>}

          <button type="submit" className="primary-action full-width">Send message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
