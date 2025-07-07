import React from 'react';

const GettingStartedPage = () => {
  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">Getting Started with AEM Sites - Project Archetype</h1>
        <p className="component-description">
          Last update: March 22, 2025
        </p>
        <div className="getting-started-meta">
          <div className="meta-section">
            <h3>Applies to:</h3>
            <ul>
              <li>Experience Manager 6.5</li>
              <li>Experience Manager as a Cloud Service</li>
            </ul>
          </div>
          <div className="meta-section">
            <h3>Topics:</h3>
            <ul>
              <li>Core Components</li>
              <li>Page Editor</li>
              <li>Editable Templates</li>
              <li>AEM Project Archetype</li>
            </ul>
          </div>
          <div className="meta-section">
            <h3>Created For:</h3>
            <ul>
              <li>Beginner</li>
              <li>Developer</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="home-content">
        <div className="home-section">
          <div className="alert-banner">
            <strong>Note:</strong> For publishing from AEM Sites using Edge Delivery Services, 
            <a href="https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/overview" 
               target="_blank" rel="noopener noreferrer"> click here</a>.
          </div>
        </div>

        <div className="home-section">
          <h2>Tutorial Overview</h2>
          <p>
            Welcome to a multi-part tutorial designed for developers new to Adobe Experience Manager (AEM). 
            This tutorial walks through the implementation of an AEM site for a fictitious lifestyle brand the WKND.
          </p>
          <p>
            This tutorial starts by using the AEM Project Archetype to generate a new project.
          </p>
          <p>
            The tutorial is designed to work with <strong>AEM as a Cloud Service</strong> and is backwards 
            compatible with <strong>AEM 6.5.14+</strong>.
          </p>
          <p className="time-estimate">
            <strong>⏱️ Estimate:</strong> 1-2 hours to get through each part of the tutorial.
          </p>
        </div>

        <div className="home-section">
          <h2>Technologies Used</h2>
          <p>The site is implemented using:</p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Maven AEM Project Archetype</h3>
              <p>Foundation for generating new AEM projects with best practices built-in.</p>
            </div>
            <div className="feature-card">
              <h3>Core Components</h3>
              <p>Pre-built, customizable components that follow AEM best practices.</p>
            </div>
            <div className="feature-card">
              <h3>HTL (HTML Template Language)</h3>
              <p>Secure and efficient templating system for AEM.</p>
            </div>
            <div className="feature-card">
              <h3>Sling Models</h3>
              <p>Java-based models for exposing backend logic to HTL templates.</p>
            </div>
            <div className="feature-card">
              <h3>Editable Templates</h3>
              <p>Flexible template system for content authors.</p>
            </div>
            <div className="feature-card">
              <h3>Style System</h3>
              <p>Visual styling options for components without code changes.</p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Local Development Environment</h2>
          <p>
            A local development environment is necessary to complete this tutorial. Screenshots and video 
            are captured using the AEM as a Cloud Service SDK running on a macOS environment with Visual 
            Studio Code as the IDE. Commands and code should be independent of the local operating system, 
            unless otherwise noted.
          </p>
        </div>

        <div className="home-section">
          <h2>Required Software</h2>
          <p>The following should be installed locally:</p>
          <div className="requirements-grid">
            <div className="requirement-card">
              <h3>🖥️ Local AEM Author Instance</h3>
              <p>Cloud Service SDK or 6.5.14+</p>
            </div>
            <div className="requirement-card">
              <h3>☕ Java™ 11</h3>
              <p>Required runtime environment</p>
            </div>
            <div className="requirement-card">
              <h3>📦 Apache Maven</h3>
              <p>Version 3.3.9 or newer</p>
            </div>
            <div className="requirement-card">
              <h3>🟢 Node.js</h3>
              <p>LTS - Long-Term Support version</p>
            </div>
            <div className="requirement-card">
              <h3>📋 npm 6+</h3>
              <p>Package manager for Node.js</p>
            </div>
            <div className="requirement-card">
              <h3>🔧 Git</h3>
              <p>Version control system</p>
            </div>
            <div className="requirement-card">
              <h3>💻 Visual Studio Code</h3>
              <p>Or equivalent IDE</p>
            </div>
            <div className="requirement-card">
              <h3>🔄 VSCode AEM Sync</h3>
              <p>Tool used throughout tutorial</p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Helpful Resources</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🆕 New to AEM as a Cloud Service?</h3>
              <p>
                Check out the guide for setting up a local development environment using the 
                AEM as a Cloud Service SDK.
              </p>
            </div>
            <div className="feature-card">
              <h3>🏛️ New to AEM 6.5?</h3>
              <p>
                Check out the guide for setting up a local development environment for AEM 6.5.
              </p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>GitHub Repository</h2>
          <p>
            The code from this tutorial can be found on GitHub in the AEM Guide repo:
          </p>
          <div className="github-section">
            <h3>📂 GitHub: WKND Sites Project</h3>
            <p>
              In addition, each part of the tutorial has its own branch in GitHub. A user can begin 
              the tutorial at any point by simply checking out the branch that corresponds to the 
              previous part.
            </p>
          </div>
        </div>

        <div className="home-section">
          <h2>Next Steps</h2>
          <p>
            What are you waiting for? Start the tutorial by navigating to the Project Setup chapter 
            and learn how to generate a new Adobe Experience Manager project using the AEM Project Archetype.
          </p>
          <div className="navigation-links">
            <div className="nav-link">
              <span className="nav-label">Previous page:</span>
              <span className="nav-title">WKND Tutorial Overview</span>
            </div>
            <div className="nav-link">
              <span className="nav-label">Next page:</span>
              <span className="nav-title">1 - Project Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage; 