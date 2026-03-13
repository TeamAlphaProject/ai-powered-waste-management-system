import { useState } from 'react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import History from './pages/History';
import Profile from './pages/Profile';
import ComplaintDetails from './pages/ComplaintDetails';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminIssueList from './pages/admin/AdminIssueList';
import AdminIssueDetail from './pages/admin/AdminIssueDetail';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [screenProps, setScreenProps] = useState({});

  const navigate = (screen, props = {}) => {
    setScreenProps(props);
    setCurrentScreen(screen);
  };

  return (
    <div className="mobile-container">
      {currentScreen === 'splash' && <Splash onNavigate={() => navigate('login')} />}
      {currentScreen === 'login' && <Login onNavigate={(screen = 'dashboard', props) => navigate(screen, props)} />}
      {currentScreen === 'dashboard' && <Dashboard onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'report' && <Report onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'history' && <History onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'profile' && <Profile onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'complaintDetails' && <ComplaintDetails complaintId={screenProps.complaintId} onNavigate={(screen, props) => navigate(screen, props)} />}
      
      {/* Admin Workflow */}
      {currentScreen === 'adminLogin' && <AdminLogin onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'adminDashboard' && <AdminDashboard onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'adminIssueList' && <AdminIssueList level={screenProps.level || 'L1'} onNavigate={(screen, props) => navigate(screen, props)} />}
      {currentScreen === 'adminIssueDetail' && <AdminIssueDetail complaintId={screenProps.complaintId} onNavigate={(screen, props) => navigate(screen, props)} />}
    </div>
  );
}

export default App;
