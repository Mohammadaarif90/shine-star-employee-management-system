import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter ID and Password");
      return;
    }

    setLoading(true);

    // Login credentials
    if (email === "admin" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 500);
    } else {
      setLoading(false);
      alert("Invalid ID or Password");
    }
  };

  const handleForgotPassword = () => {
    alert("Please contact the administrator to reset your password.");
  };

  return (
    <div className="login-page">
      {/* Background Decoration */}
      <div className="login-decoration decoration-one"></div>
      <div className="login-decoration decoration-two"></div>

      {/* Login Card */}
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">SS</div>

        {/* Heading */}
        <div className="login-heading">
          <h1>Welcome Back!</h1>
          <p>Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* ID / Email */}
          <div className="form-group">
            <label htmlFor="login-id">Email Address</label>

            <div className="input-wrapper">
              <span className="input-icon">✉</span>

              <input
                id="login-id"
                type="text"
                placeholder="Enter your ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <div className="input-wrapper">
              <span className="input-icon">🔒</span>

              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="login-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          © 2026 Shine Star. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;
