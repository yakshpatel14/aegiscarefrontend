import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  UserPlus,
  Phone,
  MapPin,
  User,
  Sparkles,
} from "lucide-react";

const validAccounts = {
  "admin@aegiscare.com": {
    name: "System Admin",
    email: "admin@aegiscare.com",
    password: "admin123",
    role: "admin",
    plan: "Enterprise",
    serviceStart: "2026-01-01",
    serviceEnd: "2027-01-01",
    services: ["AI Fleet Tracking", "Secure Access Control", "Analytics Suite"],
  },
  "user@aegiscare.com": {
    name: "Ava Patel",
    email: "user@aegiscare.com",
    password: "user123",
    role: "user",
    plan: "Essential",
    serviceStart: "2026-08-01",
    serviceEnd: "2026-12-31",
    services: ["Fleet Monitoring", "Medication Alerts"],
  },
};

function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [mode, setMode] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [signupForm, setSignupForm] = useState({
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

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const account = validAccounts[email?.trim().toLowerCase()];

    if (!account) {
      setError(mode === "admin" ? "Admin access denied. Please use an admin account." : "Invalid email or password.");
      return;
    }

    if (mode === "admin" && account.role !== "admin") {
      setError("Admin access only. This account is a customer account.");
      return;
    }

    if (mode === "user" && account.role === "admin") {
      setError("This is an admin account. Switch to Admin Login to continue.");
      return;
    }

    if (password !== account.password) {
      setError("Invalid email or password.");
      return;
    }

    login({
      name: account.name,
      email: account.email,
      role: account.role,
    });

    navigate(account.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const handleSignupChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSignupForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setSignupMessage("");

    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.address || !signupForm.city || !signupForm.state) {
      setSignupMessage("Please complete all required account details.");
      return;
    }

    if (signupForm.password.length < 6) {
      setSignupMessage("Password must be at least 6 characters long.");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupMessage("Passwords do not match.");
      return;
    }

    if (!signupForm.agree) {
      setSignupMessage("Please accept the terms to create your account.");
      return;
    }

    signup({
      name: signupForm.name,
      email: signupForm.email,
      phone: signupForm.phone,
      password: signupForm.password,
      address: signupForm.address,
      city: signupForm.city,
      state: signupForm.state,
      country: signupForm.country,
      emergencyContact: signupForm.emergencyContact,
    });

    setSignupMessage("Account created successfully. You are now signed in.");
    navigate("/shop");
  };

  return (
    <div className="auth-page">
      <div className="auth-split-shell">
        <div className="auth-panel auth-panel-login">
          <div className="auth-topbar">
            <div className="login-brand">
              <div className="login-logo">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h1>AEGISCARE</h1>
                <p>ROBOTICS CARE SYSTEM</p>
              </div>
            </div>

            <div className="auth-role-switch" aria-label="Login mode switch">
              <button
                type="button"
                className={mode === "user" ? "auth-role-button active" : "auth-role-button"}
                onClick={() => setMode("user")}
              >
                User Login
              </button>
              <button
                type="button"
                className={mode === "admin" ? "auth-role-button active" : "auth-role-button"}
                onClick={() => setMode("admin")}
              >
                Admin Login
              </button>
            </div>
          </div>

          <div className="login-heading">
            <span className="auth-chip">
              {mode === "admin" ? "Secure admin access" : "Customer portal access"}
            </span>
            <h2>{mode === "admin" ? "Admin sign in" : "Welcome back"}</h2>
            <p>
              {mode === "admin"
                ? "Only an admin account with the admin role can access this area."
                : "Sign in to continue monitoring your care system and robot services."}
            </p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={mode === "admin" ? "admin@aegiscare.com" : "user@aegiscare.com"}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <button type="button" className="forgot-button">Forgot password?</button>
              </div>

              <div className="password-input">
                <LockKeyhole size={17} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <div className="remember-row">
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="login-button">
              {mode === "admin" ? "Access admin portal" : "Sign in"}
            </button>
          </form>

          <div className="login-security">
            <ShieldCheck size={16} />
            <span>Authorized users only. Access is monitored and logged.</span>
          </div>
        </div>

        <div className="auth-panel auth-panel-signup">
          <div className="signup-headline">
            <div className="signup-icon"><UserPlus size={22} /></div>
            <div>
              <p className="eyebrow">CREATE ACCOUNT</p>
              <h3>Join AegisCare</h3>
            </div>
          </div>

          <form onSubmit={handleSignup} className="signup-form-grid">
            <label className="form-field">
              <span>Name</span>
              <input name="name" value={signupForm.name} onChange={handleSignupChange} placeholder="Ava Patel" />
            </label>

            <label className="form-field">
              <span>Email</span>
              <input name="email" type="email" value={signupForm.email} onChange={handleSignupChange} placeholder="you@example.com" />
            </label>

            <label className="form-field">
              <span>Phone</span>
              <input name="phone" value={signupForm.phone} onChange={handleSignupChange} placeholder="+91 98765 43210" />
            </label>

            <label className="form-field">
              <span>Emergency contact</span>
              <input name="emergencyContact" value={signupForm.emergencyContact} onChange={handleSignupChange} placeholder="Optional" />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input name="password" type="password" value={signupForm.password} onChange={handleSignupChange} placeholder="Minimum 6 characters" />
            </label>

            <label className="form-field">
              <span>Confirm password</span>
              <input name="confirmPassword" type="password" value={signupForm.confirmPassword} onChange={handleSignupChange} placeholder="Re-enter password" />
            </label>

            <label className="form-field full-width">
              <span>Address</span>
              <input name="address" value={signupForm.address} onChange={handleSignupChange} placeholder="House number, street, landmark" />
            </label>

            <label className="form-field">
              <span>City</span>
              <input name="city" value={signupForm.city} onChange={handleSignupChange} placeholder="Mumbai" />
            </label>

            <label className="form-field">
              <span>State</span>
              <input name="state" value={signupForm.state} onChange={handleSignupChange} placeholder="Maharashtra" />
            </label>

            <label className="form-field full-width">
              <span>Country</span>
              <input name="country" value={signupForm.country} onChange={handleSignupChange} />
            </label>

            <label className="checkbox-row full-width">
              <input type="checkbox" name="agree" checked={signupForm.agree} onChange={handleSignupChange} />
              <span>I agree to the Terms & Conditions and privacy notice.</span>
            </label>

            {signupMessage && <div className={signupMessage.includes("success") ? "signup-success" : "login-error full-width"}>{signupMessage}</div>}

            <button type="submit" className="signup-button full-width">Create account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;