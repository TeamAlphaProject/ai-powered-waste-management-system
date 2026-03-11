import { useState } from 'react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ComplaintDetails from './pages/ComplaintDetails';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  return (
    <div className="mobile-container">
      {currentScreen === 'splash' && <Splash onNavigate={() => setCurrentScreen('login')} />}
      {currentScreen === 'login' && <Login onNavigate={() => setCurrentScreen('dashboard')} />}
      {currentScreen === 'dashboard' && <Dashboard onNavigate={(screen) => setCurrentScreen(screen === 'report' ? 'report' : screen)} />}
      {currentScreen === 'report' && <Report onNavigate={(screen) => setCurrentScreen(screen)} />}
      {currentScreen === 'complaintDetails' && <ComplaintDetails onNavigate={(screen) => setCurrentScreen(screen)} />}
    </div>
  );
}

export default App;
