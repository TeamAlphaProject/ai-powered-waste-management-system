import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, MapPin, Triangle, FileText, Send } from 'lucide-react';
import './Report.css';
import API from '../utils/api';

const Report = () => {
  const navigate = useNavigate();
  const [selectedWasteType, setSelectedWasteType] = useState('Plastic');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Get current location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload or take a photo of the waste.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('latitude', location.lat);
      formData.append('longitude', location.lng);
      formData.append('wasteType', selectedWasteType);
      formData.append('notes', notes);

      const response = await API.post('/complaints', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Response:", response.data);
      const newComplaint = response.data.data;
      if (newComplaint && newComplaint._id) {
        navigate(`/complaint/${newComplaint._id}`);
      } else {
        navigate('/history');
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setIsSubmitting(false);
    }
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
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="capture-card" onClick={() => fileInputRef.current.click()}>
              <div className="capture-icon-circle">
                <Camera size={24} color="#1a2a5c" />
              </div>
              <span>Take Photo</span>
            </div>
            <div className="capture-card" onClick={() => fileInputRef.current.click()}>
              <div className="capture-icon-circle">
                <Upload size={24} color="#1a2a5c" />
              </div>
              <span>Upload Photo</span>
            </div>
          </div>

          {preview && (
            <div className="image-preview-container" style={{ marginTop: '15px' }}>
              <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }} />
            </div>
          )}
        </section>

        {/* Location Details Section */}
        <section className="report-section">
           <div className="section-header-row">
            <div className="section-title-with-icon">
              <MapPin size={20} color="#1a2a5c" />
              <h2>Location Details</h2>
            </div>
            <div className="coordinates-badge">
              {location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° W
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
            {['Plastic', 'Garbage', 'Dead Animal', 'Other'].map(type => (
              <button 
                key={type}
                className={`waste-type-btn ${selectedWasteType === type ? 'active' : ''}`}
                onClick={() => setSelectedWasteType(type)}
              >
                {type}
              </button>
            ))}
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </section>

      </div>

      <div className="report-footer">
        <button 
          className="submit-complaint-btn" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          <Send size={20} color="#ffffff" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Complaint'}</span>
        </button>
        <p className="footer-disclaimer">
          By submitting, you agree to provide accurate information for municipal review. Your report will be logged with your current GPS coordinates.
        </p>
      </div>

    </div>
  );
};

export default Report;
