import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Lock, ArrowRight } from 'lucide-react';
import './AdminLogin.css';
import API from '../../utils/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      
      if (response.data.role !== 'admin') {
        setError('Unauthorized access. Only municipal officers can sign in here.');
        return;
      }
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="admin-login-screen fade-in">
      <div className="admin-login-header">
        <button className="back-btn" onClick={() => navigate('/login')}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <span className="brand-name">Antigravity Smart Waste</span>
      </div>

      <div className="admin-login-content">
        <div className="portal-icon-container">
          <div className="portal-icon-badge">
            <Building2 size={40} color="#ffffff" />
          </div>
        </div>

        <div className="admin-title-section">
          <h1>Official Portal</h1>
          <p>Sign in with your municipal credentials to access the management dashboard.</p>
        </div>

        {error && <p className="error-message" style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px', textAlign: 'center', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px' }}>{error}</p>}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Official Email</label>
            <div className="input-with-icon">
              <input 
                type="email" 
                placeholder="name@city.gov" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="admin-form-group">
            <div className="label-row">
              <label>Password</label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
            <div className="input-with-icon">
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-admin-primary">
            SECURE SIGN IN
          </button>
        </form>

        <button className="btn-text-secondary" onClick={() => navigate('/login')}>
          <ArrowLeft size={16} />
          <span>Return to Citizen Login</span>
        </button>
      </div>

      <div className="admin-login-footer">
        <div className="encryption-status">
          <Lock size={14} color="#64748b" />
          <span>END-TO-END ENCRYPTED</span>
        </div>
        <p>Authorized Personnel Only. All access is logged and monitored for security purposes.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
