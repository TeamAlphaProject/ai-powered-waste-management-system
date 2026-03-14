import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Home, PlusCircle, History as HistoryIcon, User } from 'lucide-react';
import './History.css';
import API from '../utils/api';

const History = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get('/complaints');
        setComplaints(response.data.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = activeTab === 'All' 
    ? complaints 
    : complaints.filter(c => {
        if (activeTab === 'Active') return c.status === 'New' || c.status === 'In Progress';
        if (activeTab === 'Resolved') return c.status === 'Resolved';
        return true;
      });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) + ' • ' + date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="history-screen fade-in">
      {/* Header */}
      <header className="history-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <h1>My Reports</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        {['All', 'Active', 'Resolved'].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Complaint List */}
      <main className="history-content">
        {isLoading ? (
          <div className="loading-state" style={{ textAlign: 'center', marginTop: '40px' }}>
            <p>Loading your reports...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', marginTop: '40px' }}>
            <p>No reports found.</p>
          </div>
        ) : (
          <div className="complaint-list">
            {filteredComplaints.map(complaint => (
              <div 
                key={complaint._id} 
                className="complaint-item-card"
                onClick={() => navigate(`/complaint/${complaint._id}`)}
              >
                <div className="complaint-thumb">
                  <img src={`http://localhost:5000${complaint.imageUrl}`} alt="Waste" />
                </div>
                <div className="complaint-info">
                  <h3>{complaint.detectedObject === 'none' ? 'Waste Report' : complaint.detectedObject.replace('_', ' ')}</h3>
                  <p className="complaint-date">{formatDate(complaint.createdAt)}</p>
                  <span className={`status-pill ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="complaint-arrow">
                  <ChevronRight size={20} color="#94a3b8" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="list-footer-spacer"></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/dashboard')}>
          <Home size={22} />
          <span>HOME</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/report')}>
          <PlusCircle size={22} />
          <span>REPORT</span>
        </button>
        <button className="nav-item active">
          <HistoryIcon size={22} />
          <span>HISTORY</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/profile')}>
          <User size={22} />
          <span>PROFILE</span>
        </button>
      </nav>
    </div>
  );
};

export default History;
