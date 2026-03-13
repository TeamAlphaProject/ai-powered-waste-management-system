import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Settings, Edit2, TrendingUp,
  FileText, CheckCircle2, Medal, Shield,
  Star, Edit3, Map, Bell, Globe,
  HelpCircle, LogOut, LayoutGrid,
  AlertTriangle, Map as MapIcon, User,
  Building2, Home, PlusCircle, History
} from 'lucide-react';
import './Profile.css';
import API from '../utils/api';

const Profile = ({ onNavigate }) => {
  const [userData, setUserData] = useState(null);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);

    const fetchStats = async () => {
      try {
        const response = await API.get('/complaints');
        setReportCount(response.data.count);
      } catch (err) {
        console.error("Error fetching profile stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onNavigate('login');
  };

  if (!userData) return <div className="loading" style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <div className="profile-screen fade-in">
      {/* Header */}
      <header className="profile-header">
        <button className="icon-btn" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <h1>Profile</h1>
        <button className="icon-btn">
          <Settings size={24} color="#1a2a5c" />
        </button>
      </header>

      <main className="profile-content">
        {/* Profile Info */}
        <div className="profile-info-section">
          <div className="avatar-container">
            <img
              src={userData.role === 'admin' 
                ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
              }
              alt={userData.name}
              className="profile-avatar"
            />
            <div className="edit-badge">
              <Edit3 size={14} color="#ffffff" fill="#ffffff" />
            </div>
          </div>
          <h2 className="user-name">{userData.name}</h2>
          <div className="user-rank">
            <CheckCircle2 size={14} color="#22c55e" fill="#ffffff" />
            <span>{userData.role === 'admin' ? 'Municipal Officer' : 'Citizen Reporter'}</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>{userData.email}</p>
        </div>

        {/* Contribution Score */}
        <div className="contribution-card">
          <div className="contribution-main">
            <div className="contribution-text">
              <span className="label">CLEANLINESS CONTRIBUTION</span>
              <span className="score">{reportCount * 5 + 10}</span>
            </div>
            <div className="trend-icon-wrapper">
              <TrendingUp size={24} color="#16a34a" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <FileText size={20} color="#1e40af" />
            </div>
            <div className="stat-data">
              <span className="stat-value">{reportCount}</span>
              <span className="stat-label">Reports Submitted</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <CheckCircle2 size={20} color="#15803d" />
            </div>
            <div className="stat-data">
              <span className="stat-value">{Math.floor(reportCount * 0.7)}</span>
              <span className="stat-label">Issues Resolved</span>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="settings-list" style={{ marginTop: '20px' }}>
          <div className="settings-item">
            <div className="item-left">
              <User size={20} color="#1a2a5c" />
              <span>Edit Profile</span>
            </div>
            <ArrowLeft style={{ transform: 'rotate(180deg)' }} size={18} color="#94a3b8" />
          </div>
          <div className="settings-item">
            <div className="item-left">
              <Bell size={20} color="#1a2a5c" />
              <span>Notification Settings</span>
            </div>
            <ArrowLeft style={{ transform: 'rotate(180deg)' }} size={18} color="#94a3b8" />
          </div>
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} color="#ef4444" />
          <span>Logout</span>
        </button>

        <div className="version-info">
          Antigravity Smart Waste System v2.4.0
        </div>
        
        <div className="spacer"></div>
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('dashboard')}>
          <Home size={22} />
          <span>HOME</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('report')}>
          <PlusCircle size={22} />
          <span>REPORT</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('history')}>
          <History size={22} />
          <span>HISTORY</span>
        </button>
        <button className="nav-item active">
          <User size={22} />
          <span>PROFILE</span>
        </button>
      </nav>

    </div>
  );
};

export default Profile;
