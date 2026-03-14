import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  ClipboardList, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  MessageSquare, 
  Settings,
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';
import './AdminDashboard.css';
import API from '../../utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, l1: 0, l2: 0, l3: 0 });
  const [criticalComplaints, setCriticalComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get('/complaints');
        const allComplaints = response.data.data;
        
        const newStats = {
          total: allComplaints.length,
          l1: allComplaints.filter(c => c.wasteLevel === 1).length,
          l2: allComplaints.filter(c => c.wasteLevel === 2).length,
          l3: allComplaints.filter(c => c.wasteLevel === 3).length
        };
        
        setStats(newStats);
        
        // Filter critical (L3) complaints for the recent list
        const critical = allComplaints
          .filter(c => c.wasteLevel === 3)
          .slice(0, 3);
        setCriticalComplaints(critical);
        
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatTimeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="admin-dashboard-screen fade-in">
      {/* Header */}
      <header className="admin-header sticky-header">
        <div className="header-left">
          <div className="authority-logo">
            <Building2 size={24} color="#ffffff" />
          </div>
          <div className="header-title">
            <h1>Municipal Authority</h1>
            <span>Central Management Portal</span>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn">
            <Bell size={20} color="#1a2a5c" />
            <span className="notification-dot"></span>
          </button>
          <div className="user-avatar-small">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Admin" />
          </div>
        </div>
      </header>

      <div className="dashboard-scroll-content">
        {/* Priority Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card total" onClick={() => navigate('/admin/issues/all')}>
            <div className="stat-card-header">
              <span className="stat-label">TOTAL ISSUES</span>
              <ClipboardList size={20} color="#1a2a5c" />
            </div>
            <div className="stat-value">{isLoading ? '...' : stats.total.toLocaleString()}</div>
            <div className="stat-trend positive">
              <TrendingUp size={12} />
              <span>Real-time data</span>
            </div>
          </div>

          <div className="stat-card l1" onClick={() => navigate('/admin/issues/L1')}>
            <div className="stat-card-header">
              <span className="stat-label">ROUTINE (L1)</span>
              <CheckCircle2 size={20} color="#21c45d" />
            </div>
            <div className="stat-value">{isLoading ? '...' : stats.l1}</div>
            <div className="stat-subtext">Stable resolution rate</div>
          </div>

          <div className="stat-card l2" onClick={() => navigate('/admin/issues/L2')}>
            <div className="stat-card-header">
              <span className="stat-label">URGENT (L2)</span>
              <AlertTriangle size={20} color="#f59e0b" />
            </div>
            <div className="stat-value">{isLoading ? '...' : stats.l2}</div>
            <div className="stat-trend warning">
              <span>! {stats.l2} pending review</span>
            </div>
          </div>

          <div className="stat-card l3" onClick={() => navigate('/admin/issues/L3')}>
            <div className="stat-card-header">
              <span className="stat-label">EMERGENCY (L3)</span>
              <Zap size={20} color="#ef4444" />
            </div>
            <div className="stat-value">{isLoading ? '...' : stats.l3}</div>
            <div className="stat-trend danger">
              <Clock size={12} />
              <span>Immediate Action Req.</span>
            </div>
          </div>
        </section>

        {/* Complaints Trend */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h3>Complaints Trend</h3>
              <p>Weekly submission volume analytics</p>
            </div>
            <button className="btn-filter-small">
              Last 7 Days <ChevronDown size={14} />
            </button>
          </div>
          <div className="chart-placeholder">
            {/* Visual representation of a wave chart */}
            <svg viewBox="0 0 400 150" className="trend-svg">
              <path 
                d="M0,100 Q50,20 100,80 T200,60 T300,120 T400,70" 
                fill="none" 
                stroke="#1a2a5c" 
                strokeWidth="3"
              />
              <path 
                d="M0,100 Q50,20 100,80 T200,60 T300,120 T400,70 V150 H0 Z" 
                fill="url(#trendGradient)" 
                opacity="0.1"
              />
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a2a5c" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="chart-days">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>
        </section>

        {/* Issue Hotspots */}
        <section className="dashboard-section">
          <div className="section-header">
            <h3>Issue Hotspots</h3>
            <div className="hotspot-legend">
              <span className="legend-item"><span className="dot l1"></span> L1</span>
              <span className="legend-item"><span className="dot l2"></span> L2</span>
              <span className="legend-item"><span className="dot l3"></span> L3</span>
            </div>
          </div>
          <div className="map-placeholder">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map Hotspots" />
            <div className="map-pin-overlay l1" style={{ top: '40%', left: '50%' }}><MapPin size={18} fill="#21c45d" color="#fff" /></div>
            <div className="map-pin-overlay l2" style={{ top: '60%', left: '30%' }}><MapPin size={18} fill="#f59e0b" color="#fff" /></div>
            <div className="map-pin-overlay l3" style={{ top: '30%', left: '70%' }}><MapPin size={18} fill="#ef4444" color="#fff" /></div>
            <div className="live-feed-badge">
              <strong>LIVE FEED</strong>
              <span>{stats.l3} Active Emergencies</span>
            </div>
          </div>
        </section>

        {/* Recent Critical Complaints */}
        <section className="dashboard-section last-section">
          <div className="section-header">
            <h3>Recent Critical Complaints</h3>
            <button className="text-btn" onClick={() => navigate('/admin/issues/L3')}>View All</button>
          </div>
          <div className="critical-complaints-list">
            {isLoading ? (
               <p style={{ textAlign: 'center', padding: '20px' }}>Loading emergencies...</p>
            ) : criticalComplaints.length === 0 ? (
               <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No active emergencies detected.</p>
            ) : (
              criticalComplaints.map(complaint => (
                <div key={complaint._id} className="critical-item" onClick={() => navigate(`/admin/issue/${complaint._id}`)}>
                  <div className="item-icon l3"><Zap size={20} color="#ef4444" /></div>
                  <div className="item-info">
                    <h4>{complaint.detectedObject === 'none' ? 'Emergency Alert' : complaint.detectedObject.replace('_', ' ')}</h4>
                    <p>Reported {formatTimeAgo(complaint.createdAt)} by Citizen</p>
                    <span>ID: #{complaint._id.slice(-4).toUpperCase()}</span>
                  </div>
                  <ChevronRight size={20} color="#cbd5e1" />
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <nav className="admin-bottom-nav">
        <button className="nav-item active" onClick={() => navigate('/admin/dashboard')}>
          <LayoutDashboard size={24} />
          <span>OVERVIEW</span>
        </button>
        <button className="nav-item">
          <MapIcon size={24} />
          <span>MAP</span>
        </button>
        <button className="nav-item">
          <BarChart3 size={24} />
          <span>REPORTS</span>
        </button>
        <button className="nav-item">
          <MessageSquare size={24} />
          <span>INBOUND</span>
        </button>
        <button className="nav-item">
          <Settings size={24} />
          <span>ADMIN</span>
        </button>
      </nav>
    </div>
  );
};

// Internal components for clean code
const Building2 = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <circle cx="8" cy="6" r=".5" />
    <circle cx="16" cy="6" r=".5" />
    <circle cx="8" cy="10" r=".5" />
    <circle cx="16" cy="10" r=".5" />
    <circle cx="8" cy="14" r=".5" />
    <circle cx="16" cy="14" r=".5" />
  </svg>
);

const TrendingUp = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ChevronDown = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default AdminDashboard;
