import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ComponentView from './components/ComponentView';
import HomePage from './pages/HomePage';
import GettingStartedPage from './pages/GettingStartedPage';
import Avatar from './components/spectrum/Avatar';
import './styles/spectrum-tokens.css';
import './styles/App.css';

// Adobe Logo Component
const AdobeLogo = () => (
  <svg className="adobe-logo" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z"/>
  </svg>
);

// Component wrapper to handle URL params
const ComponentWrapper = ({ theme, scale, componentData, onComponentSelect }) => {
  const { componentName } = useParams();
  
  // Convert URL slug back to component name
  const actualComponentName = componentData.find(name => 
    name.toLowerCase().replace(/\s+/g, '-') === componentName
  );
  
  // Update selected component when URL changes
  useEffect(() => {
    if (actualComponentName) {
      onComponentSelect(actualComponentName);
    }
  }, [actualComponentName, onComponentSelect]);
  
  return (
    <ComponentView 
      componentName={actualComponentName}
      theme={theme}
      scale={scale}
    />
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [scale, setScale] = useState('medium');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-scale', scale);
  }, [theme, scale]);

  // Flat component structure matching actual Storybook
  const componentData = [
    'Accordion',
    'Action Bar', 
    'Action Button',
    'Action Group',
    'Action menu',
    'Alert Banner',
    'Alert Dialog',
    'Asset',
    'Avatar',
    'Badge',
    'Breadcrumbs',
    'Button',
    'Button Group',
    'Card',
    'Checkbox',
    'Coachmark',
    'Color Field',
    'Color Area',
    'Color Handle',
    'Color Loupe',
    'Color Slider',
    'Color Wheel',
    'Combobox',
    'Contextual Help',
    'Dialog',
    'Divider',
    'Dropzone',
    'Field Group',
    'Field Label',
    'Help Text',
    'Icon',
    'Icons',
    'IllustratedMessage',
    'Infield Button',
    'Link',
    'Menu',
    'Meter',
    'Number Field',
    'Overlay',
    'Picker',
    'Picker Button',
    'Popover',
    'Progress Bar',
    'Progress Circle',
    'Radio',
    'Search',
    'Sidenav',
    'Slider',
    'Split View',
    'StatusLight',
    'Swatch',
    'Switch',
    'Table',
    'Tabs',
    'Tags',
    'Textarea',
    'Textfield',
    'Thumbnail',
    'Toast',
    'Tooltip',
    'Top Nav',
    'Tray',
    'Underlay'
  ];

  const handleComponentSelect = (componentName) => {
    setSelectedComponent(componentName);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div className="app" data-theme={theme} data-scale={scale}>
        <header className="app-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle" 
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <a href="/" className="app-title">
              <AdobeLogo />
              Spectrum Design System
            </a>
            <div className="search-container">
              <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input 
                  type="text"
                  className="search-input"
                  placeholder="Search components..."
                  aria-label="Search components"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="header-controls">
            <div className="control-group">
              <span className="control-label">Theme:</span>
              <select 
                className="control-select"
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div className="control-group">
              <span className="control-label">Scale:</span>
              <select 
                className="control-select"
                value={scale} 
                onChange={(e) => setScale(e.target.value)}
              >
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div className="control-group avatar-control">
              <span className="control-label">User:</span>
              <Avatar 
                initials="DT"
                size="medium"
                alt="User Avatar"
                className="header-avatar"
              />
            </div>
          </div>
        </header>

        <div className="app-content">
          <Sidebar 
            collapsed={sidebarCollapsed}
            componentData={componentData}
            selectedComponent={selectedComponent}
            onComponentSelect={handleComponentSelect}
            searchQuery={searchQuery}
          />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route 
                path="/component/:componentName" 
                element={
                  <ComponentWrapper 
                    theme={theme}
                    scale={scale}
                    componentData={componentData}
                    onComponentSelect={handleComponentSelect}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 