import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    emergencyContact: "",
    agree: false,
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone || !form.password || !form.address || !form.city || !form.state) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      setError("Please accept the terms and privacy acknowledgement.");
      return;
    }

    signup({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      address: form.address,
      city: form.city,
      state: form.state,
      country: form.country,
      emergencyContact: form.emergencyContact,
    });

    navigate("/shop");
  };

  return (
    <div className="auth-shell">
      <div className="auth-card auth-card-lg">
        <div className="auth-brand-row">
          <div className="login-logo"><ShieldCheck size={24} /></div>
          <div>
            <p className="eyebrow">AEGISCARE</p>
            <h2>Create account</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            <span>Full name</span>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Ava Patel" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98" />
          </label>
          <label>
            <span>Emergency contact</span>
            <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Optional" />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />
          </label>
          <label>
            <span>Confirm password</span>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
          </label>
          <label className="full-width">
            <span>Address</span>
            <input name="address" value={form.address} onChange={handleChange} placeholder="House number, street" />
          </label>
          <label>
            <span>City</span>
            <input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" />
          </label>
          <label>
            <span>State</span>
            <input name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" />
          </label>
          <label className="full-width">
            <span>Country</span>
            <input name="country" value={form.country} onChange={handleChange} />
          </label>

          <label className="checkbox-row full-width">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            <span>I agree to the Terms & Conditions and Privacy acknowledgment.</span>
          </label>

          {error && <div className="error-box full-width">{error}</div>}

          <button type="submit" className="primary-action full-width">Create account</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
