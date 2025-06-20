import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, componentData, selectedComponent, onComponentSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleComponentClick = (componentName) => {
    onComponentSelect(componentName);
    navigate(`/component/${componentName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleHomeClick = () => {
    onComponentSelect(null);
    navigate('/');
  };

  const handlePageClick = (path) => {
    onComponentSelect(null);
    navigate(path);
  };

  const isHomePage = location.pathname === '/';
  const isGettingStarted = location.pathname === '/getting-started';
  const isDesignTokens = location.pathname === '/design-tokens';
  const isAccessibility = location.pathname === '/accessibility';
  const isFoundations = location.pathname === '/foundations';

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div 
          className={`sidebar-home ${isHomePage ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          📖 Welcome
        </div>
        
        {/* Documentation section */}
        <div className="sidebar-section">
          <div className="sidebar-section-header">Documentation</div>
          <div 
            className={`sidebar-item ${isGettingStarted ? 'active' : ''}`}
            onClick={() => handlePageClick('/getting-started')}
          >
            🚀 Getting Started
          </div>
          <div 
            className={`sidebar-item ${isDesignTokens ? 'active' : ''}`}
            onClick={() => handlePageClick('/design-tokens')}
          >
            🎨 Design Tokens
          </div>
          <div 
            className={`sidebar-item ${isAccessibility ? 'active' : ''}`}
            onClick={() => handlePageClick('/accessibility')}
          >
            ♿ Accessibility
          </div>
          <div 
            className={`sidebar-item ${isFoundations ? 'active' : ''}`}
            onClick={() => handlePageClick('/foundations')}
          >
            🏗️ Foundations
          </div>
        </div>
        
        {/* Components section */}
        <div className="sidebar-section">
          <div className="sidebar-section-header">Components</div>
          {componentData.map(componentName => (
            <div
              key={componentName}
              className={`sidebar-item ${selectedComponent === componentName ? 'active' : ''}`}
              onClick={() => handleComponentClick(componentName)}
            >
              {componentName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 