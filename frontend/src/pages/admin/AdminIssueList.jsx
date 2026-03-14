import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Search, 
  SlidersHorizontal, 
  Trash2, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  LayoutDashboard,
  Map as MapIcon,
  BarChart3,
  Settings,
  AlertOctagon,
  User,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Info
} from 'lucide-react';
import './AdminIssueList.css';
import API from '../../utils/api';

const AdminIssueList = ({ level: propLevel }) => {
  const navigate = useNavigate();
  const { level: paramLevel } = useParams();
  const level = paramLevel || propLevel || 'L1';
  
  const [activeTab, setActiveTab] = useState('All');
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get('/complaints');
        const allData = response.data.data;
        
        // Map priority levels to wasteLevel numbers
        const levelMap = { 'L1': 1, 'L2': 2, 'L3': 3, 'all': 0 };
        const targetLevel = levelMap[level] || 0;
        
        const filtered = targetLevel === 0 
          ? allData 
          : allData.filter(c => c.wasteLevel === targetLevel);
          
        setComplaints(filtered);
      } catch (err) {
        console.error("Error fetching admin complaints:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [level]);

  const formatTimeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(dateString).toLocaleDateString();
  };

  const renderHeader = () => {
    switch(level) {
      case 'L2':
        return (
          <header className="page-header sticky-header">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft size={24} color="#1a2a5c" />
            </button>
            <div className="header-center">
              <h1>Urgent Issues (L2)</h1>
              <p>Municipal Authority Dashboard</p>
            </div>
            <div className="header-actions">
              <Search size={22} color="#1a2a5c" />
              <SlidersHorizontal size={22} color="#1a2a5c" />
            </div>
          </header>
        );
      case 'L3':
        return (
          <header className="page-header sticky-header">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft size={24} color="#1a2a5c" />
            </button>
            <div className="header-center">
              <h1>EMERGENCY (L3)</h1>
              <p className="danger-text">CRITICAL INFRASTRUCTURE STATUS</p>
            </div>
            <div className="header-actions">
              <Bell size={22} color="#1a2a5c" />
              <Settings size={22} color="#1a2a5c" />
            </div>
          </header>
        );
      default: // L1 or all
        return (
          <header className="page-header sticky-header">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft size={24} color="#1a2a5c" />
            </button>
            <h1 className="page-title">{level === 'all' ? 'All Issues' : 'Routine Issues (L1)'}</h1>
            <Bell size={24} color="#1a2a5c" />
          </header>
        );
    }
  };

  const renderStats = () => {
    if (isLoading) return <div className="stats-header loading">Loading metrics...</div>;

    if (level === 'L2') {
      return (
        <div className="stats-header">
          <div className="stat-card-simple">
            <div className="stat-icon-row">
              <ClipboardList size={20} color="#1a2a5c" />
              <span className="stat-label">TOTAL URGENT</span>
            </div>
            <div className="stat-main-value">{complaints.length}</div>
            <div className="stat-trend positive">
              <TrendingUp size={12} />
              <span>Live Queue</span>
            </div>
          </div>
          <div className="stat-card-simple">
            <div className="stat-icon-row">
              <Clock size={20} color="#f59e0b" />
              <span className="stat-label">PENDING REVIEW</span>
            </div>
            <div className="stat-main-value">{complaints.filter(c => c.status === 'New').length}</div>
            <div className="stat-sub-info">Active monitoring</div>
          </div>
        </div>
      );
    }
    if (level === 'L3') {
      return (
        <div className="stats-header">
          <div className="stat-card-l3 border-red">
            <span className="stat-label">ACTIVE L3 EMERGENCIES</span>
            <div className="stat-row">
              <span className="stat-value">{complaints.length}</span>
              <span className="stat-trend danger"><TrendingUp size={12} /> Live</span>
            </div>
          </div>
          <div className="stat-card-l3 border-blue">
            <span className="stat-label">UNITS DEPLOYED</span>
            <div className="stat-row">
              <span className="stat-value">{complaints.length > 0 ? complaints.length * 2 : 0}</span>
              <span className="stat-trend positive"><TrendingDown size={12} /> 5%</span>
            </div>
          </div>
        </div>
      );
    }
    return ( // L1
      <div className="stats-header">
        <div className="stat-card-white">
          <div className="stat-icon-row">
            <Trash2 size={20} color="#1a2a5c" />
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-main-value">{complaints.length} <span className="stat-percent">+12%</span></div>
        </div>
        <div className="stat-card-white">
          <div className="stat-icon-row">
            <Clock size={20} color="#1a2a5c" />
            <span className="stat-label">Avg. Resolution</span>
          </div>
          <div className="stat-main-value">4.2 hrs <span className="stat-percent-neg">-5%</span></div>
        </div>
      </div>
    );
  };

  const renderFilters = () => {
    if (level === 'L1' || level === 'all') {
      return (
        <div className="filter-chips">
          <button className={`chip select ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>
            All Issues <ChevronDown size={14} />
          </button>
          <button className="chip outline">
            Waste <Trash2 size={14} />
          </button>
          <button className="chip outline">
            Littering <AlertOctagon size={14} />
          </button>
        </div>
      );
    }
    if (level === 'L2') {
      return (
        <div className="priority-queue-header">
          <h3>PRIORITY QUEUE</h3>
          <span className="live-badge">Live Update</span>
        </div>
      );
    }
    return ( // L3
      <div className="l3-actions">
        <div className="map-banner">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map" />
          <button className="expand-map-btn">
            <MapIcon size={18} /> Expand Live Map
          </button>
        </div>
        <h3 className="section-title">CRITICAL PRIORITY INCIDENTS</h3>
      </div>
    );
  };

  const renderItems = () => {
    if (isLoading) return <p style={{ textAlign: 'center', padding: '40px' }}>Loading issues...</p>;
    if (complaints.length === 0) return <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No issues found for this category.</p>;

    return (
      <div className="issue-list-container">
        {complaints.map(complaint => (
          level === 'L3' ? (
            <div className="l3-issue-card" key={complaint._id} onClick={() => navigate(`/admin/issue/${complaint._id}`)}>
              <div className="l3-card-top">
                <span className="status-dot"></span>
                <span className="report-badge">{complaint.status}</span>
                <span className="time-stamp">{new Date(complaint.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="l3-card-body">
                <div className="issue-icon-box">
                  <Building2 size={24} color="#ef4444" />
                </div>
                <div className="issue-info">
                  <h4>{complaint.detectedObject === 'none' ? 'Emergency Alert' : complaint.detectedObject.replace('_', ' ')}</h4>
                  <p><MapIcon size={14} /> {complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}</p>
                </div>
              </div>
              <div className="l3-card-footer">
                <div className="status-info">
                  <span className="status-label-dot orange"></span>
                  <span className="status-text">LIVE STATUS: <strong>{complaint.status.toUpperCase()}</strong></span>
                </div>
                <button className="btn-manage">MANAGE</button>
              </div>
            </div>
          ) : level === 'L2' ? (
            <div className="l2-issue-card" key={complaint._id} onClick={() => navigate(`/admin/issue/${complaint._id}`)}>
              <div className="l2-left">
                <span className="issue-id">#U-{complaint._id.slice(-4).toUpperCase()}</span>
                <span className="badge-urgent">URGENT</span>
                <h4>{complaint.detectedObject === 'none' ? 'Urgent Waste Issue' : complaint.detectedObject.replace('_', ' ')}</h4>
                <p><MapIcon size={14} /> {complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}</p>
              </div>
              <div className="l2-right">
                <div className="wait-time">
                  <Clock size={14} /> {formatTimeAgo(complaint.createdAt)}
                </div>
                <ChevronRight size={20} color="#cbd5e1" />
              </div>
            </div>
          ) : (
            <div className="l1-issue-card" key={complaint._id} onClick={() => navigate(`/admin/issue/${complaint._id}`)}>
              <div className="issue-image-box">
                <img src={`http://localhost:5000${complaint.imageUrl}`} alt="Waste" />
              </div>
              <div className="issue-details-main">
                <div className="issue-header-row">
                  <span className="issue-id">#R-{complaint._id.slice(-4).toUpperCase()}</span>
                  <span className="time-ago">{formatTimeAgo(complaint.createdAt)}</span>
                </div>
                <h4>{complaint.detectedObject === 'none' ? 'Routine Waste Report' : complaint.detectedObject.replace('_', ' ')}</h4>
                <p><MapIcon size={14} /> {complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}</p>
                <div className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                  STATUS: {complaint.status.toUpperCase()}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  const renderBottomNav = () => {
    return (
      <nav className="admin-bottom-nav">
        <button className="nav-item" onClick={() => navigate('/admin/dashboard')}>
          <LayoutDashboard size={24} />
          <span>DASHBOARD</span>
        </button>
        <button className="nav-item active">
          {level === 'L3' ? <Zap size={24} /> : <SlidersHorizontal size={24} />}
          <span>{level === 'L3' ? 'EMERGENCIES' : 'ISSUES'}</span>
        </button>
        <button className="nav-item">
          <MapIcon size={24} />
          <span>MAP</span>
        </button>
        <button className="nav-item">
          {level === 'L2' ? <User size={24} /> : level === 'L1' ? <BarChart3 size={24} /> : <Zap size={24} />}
          <span>{level === 'L2' ? 'PROFILE' : level === 'L1' ? 'REPORTS' : 'UNITS'}</span>
        </button>
        {(level === 'L1' || level === 'all') && (
          <button className="nav-item">
            <Settings size={24} />
            <span>SETTINGS</span>
          </button>
        )}
      </nav>
    );
  };

  return (
    <div className={`admin-issue-list-screen fade-in ${level.toLowerCase()}-view`}>
      {renderHeader()}
      <div className="scroll-content">
        {renderStats()}
        {renderFilters()}
        {renderItems()}
      </div>
      {renderBottomNav()}
    </div>
  );
};

// Helpers
const ClipboardList = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
  </svg>
);

const Building2 = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <circle cx="8" cy="6" r=".5" />
    <circle cx="16" cy="6" r=".5" />
  </svg>
);

const ChevronDown = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default AdminIssueList;
