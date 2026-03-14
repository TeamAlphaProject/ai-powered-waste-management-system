import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Info, User, Mail, Lock, ArrowRight } from 'lucide-react';
import './Registration.css';
import API from '../utils/api';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="registration-screen fade-in success-view">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>Registration Successful!</h2>
          <p>Your account has been created. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-screen fade-in">
      <div className="registration-header">
        <div className="top-nav">
          <span className="nav-brand">Antigravity</span>
          <Info size={20} color="#1a2a5c" />
        </div>
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Join Antigravity</h1>
            <p>Empowering Citizens for a Greener Tomorrow</p>
          </div>
        </div>
      </div>

      <div className="registration-body">
        <div className="registration-title-section">
          <h2>Create Account</h2>
          <p>Join thousands of citizens making our city cleaner and smarter.</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label><User size={16} /> Full Name</label>
            <input 
              name="name"
              type="text" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label><Mail size={16} /> Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="name@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="Minimum 8 characters" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label><Lock size={16} /> Confirm Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="Repeat your password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn-primary">
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-prompt">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>

      <div className="registration-footer">
        <p>© 2024 Antigravity Smart Systems. Official Government Partner.</p>
      </div>
    </div>
  );
};

export default Registration;
