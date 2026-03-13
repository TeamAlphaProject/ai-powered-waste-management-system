import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  MapPin, 
  Navigation, 
  Upload, 
  CheckCircle2,
  Clock,
  Calendar,
  Map as MapIcon,
  BarChart3,
  User,
  Zap,
  Building2
} from 'lucide-react';
import './AdminIssueDetail.css';
import API from '../../utils/api';

const AdminIssueDetail = ({ onNavigate, complaintId }) => {
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // Fetch all and filter for now as there's no specific GET /api/complaints/:id yet
        // But for better performance, I'll assume we might need to add that route or just filter.
        // Actually, let's just filter for now since we have the list.
        const response = await API.get('/complaints');
        const found = response.data.data.find(c => c._id === complaintId);
        setComplaint(found);
      } catch (err) {
        console.error("Error fetching detail:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (complaintId) {
      fetchDetail();
    }
  }, [complaintId]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await API.patch(`/complaints/${complaintId}/status`, { status: newStatus });
      setComplaint({ ...complaint, status: newStatus });
      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  if (isLoading) return <div className="loading" style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (!complaint) return (
    <div className="error" style={{ textAlign: 'center', padding: '100px' }}>
      <p>Issue not found.</p>
      <button onClick={() => onNavigate('adminDashboard')}>Back to safety</button>
    </div>
  );

  return (
    <div className="admin-issue-detail-screen fade-in">
      {/* Header */}
      <header className="page-header sticky-header">
        <button className="back-btn" onClick={() => onNavigate('adminIssueList')}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <div className="header-info">
          <h1>Issue #{complaint._id.slice(-6).toUpperCase()}</h1>
          <p>Reported by Citizen</p>
        </div>
        <button className="icon-btn">
          <MoreVertical size={24} color="#64748b" />
        </button>
      </header>

      <div className="scroll-content">
        {/* Main Image */}
        <div className="detail-image-container">
          <img 
            src={`http://localhost:5000${complaint.imageUrl}`} 
            alt="Waste" 
          />
          <div className={`top-prio-badge ${complaint.wasteLevel === 3 ? 'red' : complaint.wasteLevel === 2 ? 'orange' : 'green'}`}>
            PRIORITY {complaint.wasteLevel === 3 ? 'EMERGENCY' : complaint.wasteLevel === 2 ? 'URGENT' : 'ROUTINE'}
          </div>
        </div>

        {/* Content */}
        <div className="detail-body">
          <div className="title-row">
            <h2>{complaint.detectedObject === 'none' ? 'Waste Report' : complaint.detectedObject.replace('_', ' ')}</h2>
            <div className="status-indicator-badge">
              <span className={`dot ${complaint.status.toLowerCase().replace(' ', '-')}`}></span>
              <span>{complaint.status}</span>
            </div>
          </div>

          <p className="description">
            {complaint.notes || "No additional notes provided by the reporter."}
          </p>

          <div className="meta-info-row">
            <div className="meta-item">
              <Calendar size={16} color="#64748b" />
              <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="meta-item">
              <MapPin size={16} color="#64748b" />
              <span>{complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}</span>
            </div>
          </div>

          {/* Map Card */}
          <div className="map-detail-card">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" alt="Map View" />
            <div className="arrival-overlay">
              <div className="arrival-info">
                <span className="label">GPS COORDINATES</span>
                <span className="value">{complaint.location.latitude.toFixed(4)}N, {complaint.location.longitude.toFixed(4)}W</span>
              </div>
              <button className="nav-fab">
                <Navigation size={20} fill="#ffffff" />
                <span>Nav</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          {complaint.status !== 'Resolved' && (
            <div className="action-footer-btns">
              <button className="btn-action outline" onClick={() => handleStatusUpdate('In Progress')}>
                <Zap size={20} />
                <span>Mark In Progress</span>
              </button>
              <button className="btn-action primary-green" onClick={() => handleStatusUpdate('Resolved')}>
                <CheckCircle2 size={20} />
                <span>Mark as Resolved</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="admin-bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('adminDashboard')}>
          <Building2 size={24} />
          <span>Dashboard</span>
        </button>
        <button className="nav-item active">
          <MapIcon size={24} />
          <span>Map</span>
        </button>
        <button className="nav-item">
          <BarChart3 size={24} />
          <span>Reports</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('profile')}>
          <User size={24} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminIssueDetail;
