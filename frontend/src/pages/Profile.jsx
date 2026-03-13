
import React from 'react';
import {
  ArrowLeft, Settings, Edit2, TrendingUp,
  FileText, CheckCircle2, Medal, Shield,
  Star, Edit3, Map, Bell, Globe,
  HelpCircle, LogOut, LayoutGrid,
  AlertTriangle, Map as MapIcon, User,
  Building2
} from 'lucide-react';
import './Profile.css';

const Profile = ({ onNavigate }) => {
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
        <div className="profile-info-section" onClick={() => {}}>
          <div className="avatar-container">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
              alt="Alex Henderson"
              className="profile-avatar"
            />
            <div className="edit-badge">
              <Edit3 size={14} color="#ffffff" fill="#ffffff" />
            </div>
          </div>
          <h2 className="user-name">Alex Henderson</h2>
          <div className="user-rank">
            <CheckCircle2 size={14} color="#22c55e" fill="#ffffff" />
            <span>Elite Cleanliness Champion</span>
          </div>
        </div>

        {/* Contribution Score */}
        <div className="contribution-card" onClick={() => {}}>
          <div className="contribution-main">
            <div className="contribution-text">
              <span className="label">CLEANLINESS CONTRIBUTION</span>
              <span className="score">84</span>
            </div>
            <div className="trend-icon-wrapper">
              <TrendingUp size={24} color="#16a34a" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card" onClick={() => {}}>
            <div className="stat-icon-wrapper blue">
              <FileText size={20} color="#1e40af" />
            </div>
            <div className="stat-data">
              <span className="stat-value">24</span>
              <span className="stat-label">Reports Submitted</span>
            </div>
          </div>
          <div className="stat-card" onClick={() => {}}>
            <div className="stat-icon-wrapper green">
              <CheckCircle2 size={20} color="#15803d" />
            </div>
            <div className="stat-data">
              <span className="stat-value">18</span>
              <span className="stat-label">Issues Resolved</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <section className="achievements-section">
          <div className="section-header">
            <h3>My Achievements</h3>
            <button className="view-all" onClick={() => {}}>View All</button>
          </div>
          <div className="achievements-scroll">
            <div className="achievement-item" onClick={() => {}}>
              <div className="achievement-icon yellow">
                <Medal size={24} color="#ffffff" fill="#ffffff" strokeWidth={1.5} />
              </div>
              <span>First Reporter</span>
            </div>
            <div className="achievement-item" onClick={() => {}}>
              <div className="achievement-icon blue">
                <Shield size={24} color="#ffffff" fill="#ffffff" strokeWidth={1.5} />
              </div>
              <span>Waste Warrior</span>
            </div>
            <div className="achievement-item" onClick={() => {}}>
              <div className="achievement-icon green">
                <Star size={24} color="#ffffff" fill="#ffffff" strokeWidth={1.5} />
              </div>
              <span>5-Star Contributor</span>
            </div>
            <div className="achievement-item" onClick={() => {}}>
              <div className="achievement-icon purple">
                <Medal size={24} color="#ffffff" fill="#ffffff" strokeWidth={1.5} />
              </div>
              <span>Eco-hero</span>
            </div>
          </div>
        </section>

        {/* Settings List */}
        <div className="settings-list">
          <div className="settings-item" onClick={() => {}}>
            <div className="item-left">
              <User size={20} color="#1a2a5c" />
              <span>Edit Profile</span>
            </div>
            <ArrowLeft className="rotate-180" size={18} color="#94a3b8" />
          </div>
          <div className="settings-item" onClick={() => {}}>
            <div className="item-left">
              <Building2 size={20} color="#1a2a5c" />
              <span>My Neighborhood Statistics</span>
            </div>
            <ArrowLeft className="rotate-180" size={18} color="#94a3b8" />
          </div>
          <div className="settings-item" onClick={() => {}}>
            <div className="item-left">
              <Bell size={20} color="#1a2a5c" />
              <span>Notification Settings</span>
            </div>
            <ArrowLeft className="rotate-180" size={18} color="#94a3b8" />
          </div>
          <div className="settings-item" onClick={() => {}}>
            <div className="item-left">
              <Globe size={20} color="#1a2a5c" />
              <span>Language</span>
            </div>
            <div className="item-right">
              <span className="lang-text">English</span>
              <ArrowLeft className="rotate-180" size={18} color="#94a3b8" />
            </div>
          </div>
          <div className="settings-item" onClick={() => {}}>
            <div className="item-left">
              <HelpCircle size={20} color="#1a2a5c" />
              <span>Help & Support</span>
            </div>
            <ArrowLeft className="rotate-180" size={18} color="#94a3b8" />
          </div>
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={() => onNavigate('login')}>
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
        <button className="nav-item active">
          <Home size={22} />
          <span>Home</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('report')}>
          <PlusCircle size={22} />
          <span>Report</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('history')}>
          <History size={22} />
          <span>History</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('profile')}>
          <User size={22} />
          <span>Profile</span>
        </button>
      </nav>

    </div>
  );
};

export default Profile;
