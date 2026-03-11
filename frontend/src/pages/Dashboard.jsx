import React from 'react';
import { 
  Search, Bell, MapPin, Trash2, Megaphone, 
  Star, MessageCircle, Map as MapIcon, 
  ThumbsUp, CheckCircle2, Home, PlusCircle, 
  History, User
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard-screen fade-in">
      
      {/* Header Profile Section */}
      <header className="dashboard-header">
        <div className="profile-info">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
            alt="User Avatar" 
            className="avatar"
          />
          <div className="user-details">
            <h2>Welcome, Alex</h2>
            <div className="location">
              <MapPin size={12} color="#64748b" />
              <span>Springfield, Central</span>
            </div>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="icon-btn">
            <Search size={20} color="#334155" />
          </button>
          <button className="icon-btn notification-btn">
            <Bell size={20} color="#334155" />
            <span className="badge-dot"></span>
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="dashboard-content">
        
        {/* Hero Report Card */}
        <section className="hero-card">
          <div className="hero-card-header">
            <div className="hero-text">
              <h3>Help keep your city clean</h3>
              <p>See something? Report it in seconds.</p>
            </div>
            <div className="hero-icon-wrapper">
              <Trash2 size={24} color="#ffffff" />
            </div>
          </div>
          <button className="report-btn" onClick={() => onNavigate('report')}>
            <Megaphone size={18} fill="#ffffff" color="#ffffff"/>
            <span>Report Waste Issue</span>
          </button>
        </section>

        {/* Cleanliness Score */}
        <section className="score-card">
          <div className="score-icon">
            <Star size={16} color="#ffffff" fill="#ffffff" />
          </div>
          <div className="score-title">CLEANLINESS SCORE</div>
          <div className="score-value">
            <span className="bold">84</span>
            <span className="light">/100</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-track">
              <div className="progress-fill green" style={{ width: '84%' }}></div>
            </div>
          </div>
        </section>

        {/* My Complaints */}
        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">My Complaints</h3>
            <span className="badge purple">3 Active</span>
          </div>
          <div className="complaint-card">
            <div className="complaint-icon-wrapper orange">
              <MessageCircle size={18} color="#ea580c" fill="#ea580c" />
            </div>
            <div className="complaint-details">
              <h4>Overflowing Bin</h4>
              <p>Submitted 2h ago</p>
            </div>
          </div>
        </section>

        {/* Nearby Activity */}
        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Nearby Activity</h3>
            <a href="#" className="view-link">View Map</a>
          </div>
          <div className="map-card">
             {/* Map Image Placeholder */}
             <div className="map-placeholder">
               <div className="map-pin-indicator">
                 <MapPin size={16} fill="#1a2a5c" color="#ffffff" />
               </div>
             </div>
             <p className="map-footer-text">12 complaints resolved in your area this week</p>
          </div>
        </section>

        {/* Nearby Issues */}
        <section className="section-container">
          <h3 className="section-title mb-12">Nearby Issues</h3>
          
          <div className="issue-card">
            <img 
              src="https://images.unsplash.com/photo-1605600659873-d808a1d8fb7a?auto=format&fit=crop&q=80&w=200" 
              alt="Trash bags" 
              className="issue-image"
            />
            <div className="issue-content">
              <div className="issue-meta">
                <span className="status-badge status-progress">IN PROGRESS</span>
                <span className="distance">0.4 km away</span>
              </div>
              <h4 className="issue-title">Illegal Dumping - Oak St</h4>
              <p className="issue-desc">Large furniture and construction debris...</p>
              <div className="issue-footer">
                <ThumbsUp size={14} color="#64748b" />
                <span>24 Citizens upvoted</span>
              </div>
            </div>
          </div>

          <div className="issue-card">
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200" 
              alt="Clean bins" 
              className="issue-image filter-grayscale"
            />
            <div className="issue-content">
              <div className="issue-meta">
                <span className="status-badge status-resolved">RESOLVED</span>
                <span className="distance">1.2 km away</span>
              </div>
              <h4 className="issue-title">Graffiti - Main Square</h4>
              <p className="issue-desc">Wall cleaned by municipal team...</p>
              <div className="issue-footer resolved-text">
                <CheckCircle2 size={14} color="#21c45d" />
                <span>Verified by 5 citizens</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Extra padding for scroll */}
        <div style={{ height: '80px' }}></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active">
          <Home size={22} />
          <span>Home</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('report')}>
          <PlusCircle size={22} />
          <span>Report</span>
        </button>
        <button className="nav-item">
          <History size={22} />
          <span>History</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('login')}>
          <User size={22} />
          <span>Profile</span>
        </button>
      </nav>
      
    </div>
  );
};

export default Dashboard;
