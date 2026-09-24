import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function UserProfilePage() {
  const { user, updateCurrentUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
    emergencyContact: user?.emergencyContact || "",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!form.name || !form.email) return;
    updateCurrentUser(form);
    setSaved(true);
  };

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">PROFILE</p>
          <h1>Edit profile</h1>
          <p className="page-description">Update your contact, care, and emergency information.</p>
        </div>
      </div>

      <section className="panel-card">
        <form className="form-grid" onSubmit={handleSave}>
          <label>
            <span>Full name</span>
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <label>
            <span>Emergency contact</span>
            <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} />
          </label>
          <label className="full-width">
            <span>Address</span>
            <input name="address" value={form.address} onChange={handleChange} />
          </label>
          <label>
            <span>City</span>
            <input name="city" value={form.city} onChange={handleChange} />
          </label>
          <label>
            <span>State</span>
            <input name="state" value={form.state} onChange={handleChange} />
          </label>
          <label>
            <span>Country</span>
            <input name="country" value={form.country} onChange={handleChange} />
          </label>

          {saved && <div className="success-box full-width">Profile updated successfully.</div>}

          <div className="action-row full-width">
            <button type="button" className="secondary-action">Cancel</button>
            <button type="submit" className="primary-action">Save changes</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UserProfilePage;
