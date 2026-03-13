import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, MapPin, Triangle, FileText, Send } from 'lucide-react';
import './Report.css';

const Report = ({ onNavigate }) => {
  const [selectedWasteType, setSelectedWasteType] = useState('Plastic');

  const handleBack = () => {
    onNavigate('dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('complaintDetails');
  };

  return (
    <div className="report-screen fade-in">
      
      {/* Header */}
      <header className="page-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={24} color="#1a2a5c" />
        </button>
        <h1 className="page-title">Report Waste Problem</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="report-content">
        
        {/* Capture Location section */}
        <section className="report-section">
          <div className="section-title-with-icon">
            <Camera size={20} color="#1a2a5c" />
            <h2>Capture Waste Location</h2>
          </div>
          
          <div className="capture-options">
            <div className="capture-card">
              <div className="capture-icon-circle">
                <Camera size={24} color="#1a2a5c" />
              </div>
              <span>Take Photo</span>
            </div>
            <div className="capture-card">
              <div className="capture-icon-circle">
                <Upload size={24} color="#1a2a5c" />
              </div>
              <span>Upload Photo</span>
            </div>
          </div>
        </section>

        {/* Location Details Section */}
        <section className="report-section">
           <div className="section-header-row">
            <div className="section-title-with-icon">
              <MapPin size={20} color="#1a2a5c" />
              <h2>Location Details</h2>
            </div>
            <div className="coordinates-badge">
              40.7128° N, 74.0060° W
            </div>
           </div>

           <div className="map-container">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map Location" className="map-image" />
             <div className="map-pin-large">
                <MapPin size={24} color="#ffffff" fill="#1a2a5c"/>
             </div>
           </div>
        </section>

        {/* Waste Type Section */}
        <section className="report-section">
          <div className="section-title-with-icon">
            <Triangle size={20} color="#1a2a5c" fill="#1a2a5c" />
            <h2>Waste Type</h2>
          </div>

          <div className="waste-type-grid">
            <button 
              className={`waste-type-btn ${selectedWasteType === 'Plastic' ? 'active' : ''}`}
              onClick={() => setSelectedWasteType('Plastic')}
            >
              Plastic
            </button>
            <button 
              className={`waste-type-btn ${selectedWasteType === 'Garbage' ? 'active' : ''}`}
              onClick={() => setSelectedWasteType('Garbage')}
            >
              Garbage
            </button>
            <button 
              className={`waste-type-btn ${selectedWasteType === 'Dead Animal' ? 'active' : ''}`}
              onClick={() => setSelectedWasteType('Dead Animal')}
            >
              Dead Animal
            </button>
            <button 
              className={`waste-type-btn ${selectedWasteType === 'Other' ? 'active' : ''}`}
              onClick={() => setSelectedWasteType('Other')}
            >
              Other
            </button>
          </div>
        </section>

        {/* Additional Notes Section */}
        <section className="report-section">
          <div className="section-title-with-icon">
            <FileText size={20} color="#1a2a5c" />
            <h2>Additional Notes</h2>
          </div>
          
          <textarea 
            className="notes-textarea" 
            placeholder="Describe the problem in detail..."
            rows={4}
          ></textarea>
        </section>

      </div>

      <div className="report-footer">
        <button className="submit-complaint-btn" onClick={handleSubmit}>
          <Send size={20} color="#ffffff" />
          <span>Submit Complaint</span>
        </button>
        <p className="footer-disclaimer">
          By submitting, you agree to provide accurate information for municipal review. Your report will be logged with your current GPS coordinates.
        </p>
      </div>

    </div>
  );
};

export default Report;
