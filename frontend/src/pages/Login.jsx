import React from 'react';
import { Info } from 'lucide-react';
import './Login.css';

const Login = ({ onNavigate }) => {
  return (
    <div className="login-screen fade-in">
      <div className="login-header">
        <div className="top-nav">
          <span className="nav-brand">Antigravity</span>
          <Info size={20} color="#1a2a5c" />
        </div>
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Antigravity</h1>
            <p>Smart Waste Monitoring for Cleaner Cities</p>
          </div>
        </div>
      </div>

      <div className="login-body">
        <div className="login-title-section">
          <h2>Sign In to Report</h2>
          <p>Help us keep your neighborhood clean by reporting waste issues instantly.</p>
        </div>

        <button className="btn-oauth">
          <div className="google-icon">G</div>
          <span>Continue with Google</span>
        </button>

        <div className="divider">
          <span>OR EMAIL</span>
        </div>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); onNavigate(); }}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@government.gov" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        <button className="btn-secondary" onClick={onNavigate}>
          Continue as Guest
        </button>

        <div className="register-prompt">
          Don't have an account? <a href="#">Register now</a>
        </div>
      </div>

      <div className="login-footer">
        <p>© 2024 Antigravity Smart Systems. Official Government Partner.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
