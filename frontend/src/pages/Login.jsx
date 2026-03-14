import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import './Login.css';
import API from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

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

        {error && <p className="error-message" style={{ color: '#ef4444', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

        <button className="btn-oauth">
          <div className="google-icon">G</div>
          <span>Continue with Google</span>
        </button>

        <div className="divider">
          <span>OR EMAIL</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@government.gov" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="forgot-password">
            <Link to="#">Forgot password?</Link>
          </div>

          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        <button className="btn-secondary" onClick={() => navigate('/admin/login')}>
          Admin / Officer Access
        </button>

        <div className="register-prompt">
          Don't have an account? <Link to="/registration">Register now</Link>
        </div>
      </div>

      <div className="login-footer">
        <p>© 2024 Antigravity Smart Systems. Official Government Partner.</p>
        <div className="footer-links">
          <Link to="#">Privacy Policy</Link>
          <span>•</span>
          <Link to="#">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
