import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Home, PlusCircle, History as HistoryIcon, User } from 'lucide-react';
import './History.css';

const History = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('All');

  const complaints = [
    {
      id: 1,
      title: 'Illegal Dumping',
      date: 'Oct 24, 2023 • 10:45 AM',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 2,
      title: 'Overflowing Bin',
      date: 'Oct 20, 2023 • 2:15 PM',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1595273670150-db0a3bf6907a?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 3,
      title: 'Bulk Waste Pickup',
      date: 'Oct 15, 2023 • 9:00 AM',
      status: 'Resolved',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 4,
      title: 'Hazardous Waste',
      date: 'Sep 28, 2023 • 4:30 PM',
      status: 'Resolved',
      image: 'https://images.unsplash.com/photo-1591193516411-ac669bc8a1ae?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const filteredComplaints = activeTab === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === activeTab);

  return (
    <div className="history-screen fade-in">
      {/* Header */}
      <header className="history-header">
        <button className="back-btn" onClick={() => onNavigate('dashboard')}>
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
        <div className="complaint-list">
          {filteredComplaints.map(complaint => (
            <div 
              key={complaint.id} 
              className="complaint-item-card"
              onClick={() => onNavigate('complaintDetails')}
            >
              <div className="complaint-thumb">
                <img src={complaint.image} alt={complaint.title} />
              </div>
              <div className="complaint-info">
                <h3>{complaint.title}</h3>
                <p className="complaint-date">{complaint.date}</p>
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
        <div className="list-footer-spacer"></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('dashboard')}>
          <Home size={22} />
          <span>HOME</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('report')}>
          <PlusCircle size={22} />
          <span>REPORT</span>
        </button>
        <button className="nav-item active">
          <HistoryIcon size={22} />
          <span>HISTORY</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('profile')}>
          <User size={22} />
          <span>PROFILE</span>
        </button>
      </nav>
    </div>
  );
};

export default History;
