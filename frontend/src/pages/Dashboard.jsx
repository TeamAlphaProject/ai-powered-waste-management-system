import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, MapPin, Trash2, Megaphone, 
  Star, MessageCircle, Map as MapIcon, 
  ThumbsUp, CheckCircle2, Home, PlusCircle, 
  History, User
} from 'lucide-react';
import './Dashboard.css';
import API from '../utils/api';

const Dashboard = ({ onNavigate }) => {
  const [userData, setUserData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);

    const fetchComplaints = async () => {
      try {
        const response = await API.get('/complaints');
        setComplaints(response.data.data.slice(0, 3)); // Get recent 3
      } catch (err) {
        console.error("Error fetching dashboard complaints:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const activeCount = complaints.filter(c => c.status !== 'Resolved').length;

  return (
    <div className="dashboard-screen fade-in">
      
      {/* Header Profile Section */}
      <header className="dashboard-header">
        <div className="profile-info">
          <img 
            src={userData?.role === 'admin' 
              ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
              : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
            }
            alt="User Avatar" 
            className="avatar"
            onClick={() => onNavigate('profile')}
          />
          <div className="user-details">
            <h2>Welcome, {userData?.name?.split(' ')[0] || 'User'}</h2>
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
            {activeCount > 0 && <span className="badge-dot"></span>}
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
            <span className="bold">{75 + activeCount * 3}</span>
            <span className="light">/100</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-track">
              <div className="progress-fill green" style={{ width: `${75 + activeCount * 3}%` }}></div>
            </div>
          </div>
        </section>

        {/* My Complaints */}
        <section className="section-container">
          <div className="section-header">
            <h3 className="section-title">Latest Updates</h3>
            <span className="badge purple" onClick={() => onNavigate('history')}>{activeCount} Active</span>
          </div>
          {isLoading ? (
            <p style={{ padding: '10px' }}>Loading updates...</p>
          ) : complaints.length === 0 ? (
            <p style={{ padding: '10px', color: '#64748b' }}>No recent activity.</p>
          ) : (
            complaints.map(complaint => (
              <div key={complaint._id} className="complaint-card" onClick={() => onNavigate('complaintDetails', { complaintId: complaint._id })}>
                <div className={`complaint-icon-wrapper ${complaint.status === 'Resolved' ? 'green' : 'orange'}`}>
                  <MessageCircle size={18} color={complaint.status === 'Resolved' ? '#16a34a' : '#ea580c'} fill={complaint.status === 'Resolved' ? '#16a34a' : '#ea580c'} />
                </div>
                <div className="complaint-details">
                  <h4>{complaint.detectedObject === 'none' ? 'Waste Report' : complaint.detectedObject.replace('_', ' ')}</h4>
                  <p>{complaint.status} • {new Date(complaint.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
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
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                <div className="map-pin-indicator" style={{ top: '50%', left: '50%' }}>
                  <MapPin size={16} fill="#1a2a5c" color="#ffffff" />
                </div>
             </div>
             <p className="map-footer-text">12 complaints resolved in your area this week</p>
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

export default Dashboard;
