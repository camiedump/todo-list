import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import CompletedPage from './pages/CompletedPage';
import TrashPage from './pages/TrashPage';
import useResponsive from './hooks/useResponsive';
import './styles/global.css';

const App = () => {
  const { isMobile } = useResponsive();
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Collapse sidebar on mobile, expand on desktop
    setSidebarExpanded(!isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <TaskProvider>
      <Router>
        <div className="app-container">
          
          <Sidebar 
            expanded={sidebarExpanded} 
            toggleSidebar={toggleSidebar}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            <Routes>
              
              <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
              <Route path="/completed" element={<CompletedPage searchQuery={searchQuery} />} />
              <Route path="/trash" element={<TrashPage searchQuery={searchQuery} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
