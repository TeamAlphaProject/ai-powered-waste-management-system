import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2, User, Paintbrush, Clock, Info, MapPin, Navigation } from 'lucide-react';
import './ComplaintDetails.css';

const ComplaintDetails = ({ onNavigate }) => {
  return (
    <div className="complaint-details-screen fade-in">
      
      {/* Header */}
      <header className="page-header sticky-header">
        <button className="back-button" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <h1 className="page-title">Complaint Details</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="complaint-content">
        
        {/* Main Image */}
        <div className="complaint-image-container">
          <img 
            src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800" 
            alt="Reported Waste" 
            className="complaint-image"
          />
        </div>

        {/* Title and Date */}
        <section className="detail-section">
          <div className="title-row">
            <h2 className="complaint-title">Plastic Waste Accumulation</h2>
            <div className="priority-badge">HIGH<br/>PRIORITY</div>
          </div>
          
          <div className="date-row">
            <Calendar size={14} color="#64748b" />
            <span>Oct 24, 2023 • 09:15 AM</span>
          </div>

          <div className="info-cards-row">
            <div className="info-card">
              <span className="info-label">WASTE TYPE</span>
              <span className="info-value">Recyclable Plastic</span>
            </div>
            <div className="info-card">
              <span className="info-label">TICKET ID</span>
              <span className="info-value">#ANT-99021-X</span>
            </div>
          </div>
        </section>

        {/* Processing Timeline */}
        <section className="detail-section">
          <h3 className="section-heading">PROCESSING TIMELINE</h3>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            <div className="timeline-step active">
              <div className="step-icon-circle"><CheckCircle2 size={16} color="#ffffff" /></div>
              <span className="step-label">Reported</span>
            </div>
            
            <div className="timeline-step active">
              <div className="step-icon-circle"><CheckCircle2 size={16} color="#ffffff" /></div>
              <span className="step-label">Verified</span>
            </div>
            
            <div className="timeline-step current">
              <div className="step-icon-circle"><User size={16} color="#ffffff" /></div>
              <span className="step-label">Assigned</span>
            </div>
            
            <div className="timeline-step pending">
              <div className="step-icon-circle"><Paintbrush size={16} color="#94a3b8" /></div>
              <span className="step-label">Cleaning</span>
            </div>
            
            <div className="timeline-step pending">
              <div className="step-icon-circle"><CheckCircle2 size={16} color="#94a3b8" /></div>
              <span className="step-label">Resolved</span>
            </div>
          </div>

          <div className="status-callout">
            <div className="callout-icon">
              <Info size={20} color="#ffffff" fill="#1a2a5c" />
            </div>
            <div className="callout-text">
              <h4>Current Status</h4>
              <p>Complaint has been assigned to <strong>Sanitation Unit Zone 4</strong>. Dispatch is expected within 2 hours.</p>
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
              <span className="info-value monospace">40.7128° N, 74.0060° W</span>
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
