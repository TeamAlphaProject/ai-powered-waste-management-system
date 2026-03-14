import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, User, Paintbrush, Clock, Info, MapPin, Navigation } from 'lucide-react';
import './ComplaintDetails.css';
import API from '../utils/api';

const ComplaintDetails = ({ complaintId: propId }) => {
  const navigate = useNavigate();
  const { complaintId: paramId } = useParams();
  const complaintId = paramId || propId;
  
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
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

  if (isLoading) return <div className="loading" style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (!complaint) return (
    <div className="error" style={{ textAlign: 'center', padding: '100px' }}>
      <p>Report details not found.</p>
      <button onClick={() => navigate('/dashboard')}>Back Home</button>
    </div>
  );

  const getStatusMessage = () => {
    switch (complaint.status) {
      case 'Resolved': return "Your issue has been resolved. Thank you for making our city cleaner!";
      case 'In Progress': return "Municipal units are currently working on this issue.";
      default: return "Your report has been received and is waiting for municipal review.";
    }
  };

  return (
    <div className="complaint-details-screen fade-in">
      
      {/* Header */}
      <header className="page-header sticky-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <h1 className="page-title">Complaint Details</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="complaint-content">
        
        {/* Main Image */}
        <div className="complaint-image-container">
          <img 
            src={`http://localhost:5000${complaint.imageUrl}`} 
            alt="Reported Waste" 
            className="complaint-image"
          />
        </div>

        {/* Title and Date */}
        <section className="detail-section">
          <div className="title-row">
            <h2 className="complaint-title">{complaint.detectedObject === 'none' ? 'Waste Report' : complaint.detectedObject.replace('_', ' ')}</h2>
            <div className={`priority-badge ${complaint.wasteLevel === 3 ? 'high' : 'normal'}`}>
              {complaint.wasteLevel === 3 ? 'EMERGENCY' : complaint.wasteLevel === 2 ? 'URGENT' : 'ROUTINE'}
            </div>
          </div>
          
          <div className="date-row">
            <Calendar size={14} color="#64748b" />
            <span>{new Date(complaint.createdAt).toLocaleString()}</span>
          </div>

          <div className="info-cards-row">
            <div className="info-card">
              <span className="info-label">WASTE TYPE</span>
              <span className="info-value">{complaint.detectedObject.toUpperCase()}</span>
            </div>
            <div className="info-card">
              <span className="info-label">TICKET ID</span>
              <span className="info-value">#{complaint._id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        </section>

        {/* Processing Timeline */}
        <section className="detail-section">
          <h3 className="section-heading">PROCESSING TIMELINE</h3>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            <div className={`timeline-step active`}>
              <div className="step-icon-circle"><CheckCircle2 size={16} color="#ffffff" /></div>
              <span className="step-label">Reported</span>
            </div>
            
            <div className={`timeline-step ${['In Progress', 'Resolved'].includes(complaint.status) ? 'active' : 'current'}`}>
              <div className="step-icon-circle"><Clock size={16} color="#ffffff" /></div>
              <span className="step-label">Reviewed</span>
            </div>
            
            <div className={`timeline-step ${complaint.status === 'In Progress' ? 'current' : complaint.status === 'Resolved' ? 'active' : 'pending'}`}>
              <div className="step-icon-circle"><Paintbrush size={16} color="#ffffff" /></div>
              <span className="step-label">Clearing</span>
            </div>
            
            <div className={`timeline-step ${complaint.status === 'Resolved' ? 'active' : 'pending'}`}>
              <div className="step-icon-circle"><CheckCircle2 size={16} color="#ffffff" /></div>
              <span className="step-label">Resolved</span>
            </div>
          </div>

          <div className="status-callout">
            <div className="callout-icon">
              <Info size={20} color="#ffffff" fill="#1a2a5c" />
            </div>
            <div className="callout-text">
              <h4>Current Status: {complaint.status}</h4>
              <p>{getStatusMessage()}</p>
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="detail-section last-section">
          <h3 className="section-heading">LOCATION DETAILS</h3>
          
          <div className="map-container location-map-card">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map Location" className="map-image" />
             <div className="map-pin-large">
                <MapPin size={24} color="#ffffff" fill="#1a2a5c"/>
             </div>
          </div>

          <div className="coordinates-card">
            <div className="coord-text">
              <span className="info-label">COORDINATES</span>
              <span className="info-value monospace">{complaint.location.latitude.toFixed(4)}° N, {complaint.location.longitude.toFixed(4)}° W</span>
            </div>
            <button className="navigate-btn">
              <Navigation size={18} color="#1a2a5c" fill="#1a2a5c"/>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ComplaintDetails;
