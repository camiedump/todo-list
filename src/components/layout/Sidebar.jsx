import { Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, Trash2, Search, Menu, X } from 'lucide-react';
import useResponsive from '../../hooks/useResponsive';
import '../../styles/components/sidebar.css';

const Sidebar = ({ expanded, toggleSidebar, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const { isMobile } = useResponsive();
  
  const handleNavClick = () => {
    // On mobile, automatically close the sidebar when a navigation item is clicked
    if (isMobile && expanded) {
      toggleSidebar();
    }
  };
  
  return (
    <>
      {isMobile && expanded && (
        <div 
          className="sidebar-backdrop"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 49,
          }}
        />
      )}
      
      <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
        <div className="sidebar-header">
          {expanded && <h1 className="sidebar-title">TODO-LIST</h1>}
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {expanded ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
        
        {expanded && (
          <div className="sidebar-search">
            <div className="sidebar-search-container">
              <Search className="sidebar-search-icon" size={16} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
              />
            </div>
          </div>
        )}
        
        {expanded && <div className="menu-label">Menu</div>}
        
        <div className="nav-items">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <Home className="nav-icon" size={24} />
            {expanded && <span className="nav-text">Home</span>}
          </Link>
          
          <Link 
            to="/completed" 
            className={`nav-item ${location.pathname === '/completed' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <CheckCircle className="nav-icon" size={24} />
            {expanded && <span className="nav-text">Completed Task</span>}
          </Link>
          
          <Link 
            to="/trash" 
            className={`nav-item ${location.pathname === '/trash' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <Trash2 className="nav-icon" size={24} />
            {expanded && <span className="nav-text">Trash</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;