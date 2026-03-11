import React, { useEffect } from 'react';
import { Trash2, Building2, Leaf, ShieldCheck, Clock } from 'lucide-react';
import './Splash.css';

const Splash = ({ onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate();
    }, 4000); // 4 seconds delay
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="splash-screen" onClick={onNavigate}>
      <div className="status-bar">
        <div className="status-icons">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13H17L9 1L1 13Z" fill="#64748B"/>
          </svg>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2C6.5 2 3.3 3.5 1 6L10 14L19 6C16.7 3.5 13.5 2 10 2Z" fill="#64748B"/>
          </svg>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 14H10C11.1 14 12 13.1 12 12V4C12 2.9 11.1 2 10 2H8V0H4V2H2C0.9 2 0 2.9 0 4V12C0 13.1 0.9 14 2 14Z" fill="#64748B"/>
          </svg>
        </div>
      </div>

      <div className="logo-area fade-in delay-1">
        <div className="background-circles">
          <div className="bg-circle bg-circle-large"></div>
          <div className="bg-circle bg-circle-medium"></div>
          <div className="bg-circle bg-circle-small"></div>
        </div>

        <div className="floating-tag tag-urban fade-in delay-2">
          <Building2 size={16} color="#1a2a5c" />
          <span>URBAN</span>
        </div>

        <div className="floating-tag tag-clean fade-in delay-2">
          <Leaf size={16} color="#21c45d" />
          <span>CLEAN</span>
        </div>

        <div className="main-logo-circle">
          <div className="logo-icon-wrapper">
             <Trash2 size={46} color="#ffffff" strokeWidth={2.5} />
             <div className="clock-overlay">
               <Clock size={24} color="#1a2a5c" fill="#ffffff" strokeWidth={2} />
             </div>
             <div className="logo-baseline"></div>
          </div>
        </div>
      </div>

      <div className="text-area fade-in delay-3">
        <h1 className="brand-title">Antigravity</h1>
        
        <div className="subtitle-container">
          <span className="subtitle-line"></span>
          <h2 className="brand-subtitle">SMART WASTE<br/>MONITORING</h2>
          <span className="subtitle-line"></span>
        </div>

        <p className="brand-description">
          Smart Waste Monitoring for Cleaner<br/>Cities
        </p>
      </div>

      <div className="bottom-area fade-in delay-3">
        <div className="skyline-wrapper">
          <div className="progress-container">
            <div className="progress-track">
              <div className="progress-fill"></div>
            </div>
          </div>
          
          <div className="certification">
            <ShieldCheck size={14} color="#94a3b8" />
            <span>MUNICIPAL STANDARD CERTIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
