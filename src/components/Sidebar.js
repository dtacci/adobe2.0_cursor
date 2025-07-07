import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, componentData, selectedComponent, onComponentSelect, searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Filter components based on search query
  const filteredComponents = componentData.filter(componentName =>
    componentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleComponentClick = (componentName) => {
    onComponentSelect(componentName);
    navigate(`/component/${componentName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleHomeClick = () => {
    onComponentSelect(null);
    navigate('/');
  };

  const handleGettingStartedClick = () => {
    onComponentSelect(null);
    navigate('/getting-started');
  };

  const isHomePage = location.pathname === '/';
  const isGettingStartedPage = location.pathname === '/getting-started';

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div 
          className={`sidebar-home ${isHomePage ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          📖 Welcome
        </div>
        
        <div 
          className={`sidebar-home ${isGettingStartedPage ? 'active' : ''}`}
          onClick={handleGettingStartedClick}
        >
          🚀 Getting Started
        </div>
        
        {/* Flat component list matching Storybook */}
        <div className="sidebar-section">
          {filteredComponents.length > 0 ? (
            filteredComponents.map(componentName => (
              <div
                key={componentName}
                className={`sidebar-item ${selectedComponent === componentName ? 'active' : ''}`}
                onClick={() => handleComponentClick(componentName)}
              >
                {componentName}
              </div>
            ))
          ) : searchQuery ? (
            <div className="sidebar-no-results">
              No components found for "{searchQuery}"
            </div>
          ) : (
            componentData.map(componentName => (
              <div
                key={componentName}
                className={`sidebar-item ${selectedComponent === componentName ? 'active' : ''}`}
                onClick={() => handleComponentClick(componentName)}
              >
                {componentName}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 