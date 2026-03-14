import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import Report from '../pages/Report';
import History from '../pages/History';
import Profile from '../pages/Profile';
import ComplaintDetails from '../pages/ComplaintDetails';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminIssueList from '../pages/admin/AdminIssueList';
import AdminIssueDetail from '../pages/admin/AdminIssueDetail';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Citizen Routes */}
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/complaint/:complaintId" element={<ComplaintDetails />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/issues" element={<AdminIssueList level="L1" />} />
      <Route path="/admin/issues/:level" element={<AdminIssueList />} />
      <Route path="/admin/issue/:complaintId" element={<AdminIssueDetail />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
