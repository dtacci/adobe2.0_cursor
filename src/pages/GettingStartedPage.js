import React from 'react';

const GettingStartedPage = () => {
  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">Getting Started</h1>
        <p className="component-description">
          Learn how to set up and use Adobe Spectrum Design System components in your React application.
        </p>
      </div>
      
      <div className="home-content">
        <div className="home-section">
          <h2>Quick Start</h2>
          <p>
            Get up and running with Spectrum components in minutes. This guide will help you install, 
            configure, and start using our component library in your React project.
          </p>
        </div>

        <div className="home-section">
          <h2>Installation</h2>
          <p>Install the package using your preferred package manager:</p>
          
          <div style={{ 
            backgroundColor: 'var(--spectrum-gray-100)', 
            padding: '16px', 
            borderRadius: '4px', 
            fontFamily: 'monospace',
            fontSize: '14px',
            marginTop: '16px',
            border: '1px solid var(--spectrum-gray-300)'
          }}>
            <div># Using npm</div>
            <div style={{ color: 'var(--spectrum-blue-600)' }}>npm install @adobe/react-spectrum</div>
            <br />
            <div># Using yarn</div>
            <div style={{ color: 'var(--spectrum-blue-600)' }}>yarn add @adobe/react-spectrum</div>
            <br />
            <div># Using pnpm</div>
            <div style={{ color: 'var(--spectrum-blue-600)' }}>pnpm add @adobe/react-spectrum</div>
          </div>
        </div>

        <div className="home-section">
          <h2>Provider Setup</h2>
          <p>Wrap your application with the Provider component to enable theming and localization:</p>
          
          <div style={{ 
            backgroundColor: 'var(--spectrum-gray-100)', 
            padding: '16px', 
            borderRadius: '4px', 
            fontFamily: 'monospace',
            fontSize: '14px',
            marginTop: '16px',
            border: '1px solid var(--spectrum-gray-300)'
          }}>
            <div style={{ color: 'var(--spectrum-green-600)' }}>import</div> {`{Provider, defaultTheme} `}<div style={{ color: 'var(--spectrum-green-600)' }}>from</div> <div style={{ color: 'var(--spectrum-red-500)' }}>'@adobe/react-spectrum'</div>;<br />
            <br />
            <div style={{ color: 'var(--spectrum-blue-600)' }}>function</div> App() {`{`}<br />
            <div style={{ marginLeft: '20px' }}>
              <div style={{ color: 'var(--spectrum-purple-600)' }}>return</div> (<br />
              <div style={{ marginLeft: '20px' }}>
                {`<Provider theme={defaultTheme}>`}<br />
                <div style={{ marginLeft: '20px' }}>{`<YourApp />`}</div><br />
                {`</Provider>`}
              </div><br />
              );
            </div><br />
            {`}`}
          </div>
        </div>

        <div className="home-section">
          <h2>Basic Usage</h2>
          <p>Import and use components in your React application:</p>
          
          <div style={{ 
            backgroundColor: 'var(--spectrum-gray-100)', 
            padding: '16px', 
            borderRadius: '4px', 
            fontFamily: 'monospace',
            fontSize: '14px',
            marginTop: '16px',
            border: '1px solid var(--spectrum-gray-300)'
          }}>
            <div style={{ color: 'var(--spectrum-green-600)' }}>import</div> {`{Button, TextField, Checkbox} `}<div style={{ color: 'var(--spectrum-green-600)' }}>from</div> <div style={{ color: 'var(--spectrum-red-500)' }}>'@adobe/react-spectrum'</div>;<br />
            <br />
            <div style={{ color: 'var(--spectrum-blue-600)' }}>function</div> MyComponent() {`{`}<br />
            <div style={{ marginLeft: '20px' }}>
              <div style={{ color: 'var(--spectrum-purple-600)' }}>return</div> (<br />
              <div style={{ marginLeft: '20px' }}>
                {`<div>`}<br />
                <div style={{ marginLeft: '20px' }}>
                  {`<TextField label="Name" />`}<br />
                  {`<Checkbox>Subscribe to newsletter</Checkbox>`}<br />
                  {`<Button variant="accent">Submit</Button>`}
                </div><br />
                {`</div>`}
              </div><br />
              );
            </div><br />
            {`}`}
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>📋 Components</h3>
            <p>Comprehensive set of accessible, production-ready components built with React.</p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Form controls (Button, TextField, Checkbox)</li>
              <li>Navigation (Menu, Tabs, Link)</li>
              <li>Layout (Flex, Grid, Divider)</li>
              <li>Data display (Table, Badge, ProgressBar)</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🎨 Theming</h3>
            <p>Built-in support for light and dark themes with customizable design tokens.</p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Light and dark theme variants</li>
              <li>Customizable color schemes</li>
              <li>CSS custom properties support</li>
              <li>Responsive scaling options</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>♿ Accessibility</h3>
            <p>Full accessibility support with keyboard navigation and screen reader compatibility.</p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>WCAG 2.1 AA compliant</li>
              <li>Keyboard navigation support</li>
              <li>Screen reader optimized</li>
              <li>High contrast mode support</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>Components work seamlessly across desktop, tablet, and mobile devices.</p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Touch-friendly interfaces</li>
              <li>Responsive breakpoints</li>
              <li>Adaptive component sizing</li>
              <li>Mobile-first approach</li>
            </ul>
          </div>
        </div>

        <div className="home-section">
          <h2>Theming</h2>
          <p>Customize the appearance of components using themes and CSS custom properties:</p>
          
          <div style={{ 
            backgroundColor: 'var(--spectrum-gray-100)', 
            padding: '16px', 
            borderRadius: '4px', 
            fontFamily: 'monospace',
            fontSize: '14px',
            marginTop: '16px',
            border: '1px solid var(--spectrum-gray-300)'
          }}>
            <div style={{ color: 'var(--spectrum-green-600)' }}>import</div> {`{Provider, theme} `}<div style={{ color: 'var(--spectrum-green-600)' }}>from</div> <div style={{ color: 'var(--spectrum-red-500)' }}>'@adobe/react-spectrum'</div>;<br />
            <br />
            <div style={{ color: 'var(--spectrum-gray-600)' }}>{/* Light theme */}</div><br />
            {`<Provider theme={theme.light}>`}<br />
            <div style={{ marginLeft: '20px' }}>{`<App />`}</div><br />
            {`</Provider>`}<br />
            <br />
            <div style={{ color: 'var(--spectrum-gray-600)' }}>{/* Dark theme */}</div><br />
            {`<Provider theme={theme.dark}>`}<br />
            <div style={{ marginLeft: '20px' }}>{`<App />`}</div><br />
            {`</Provider>`}
          </div>
        </div>

        <div className="home-section">
          <h2>Component Properties</h2>
          <p>Most components accept common properties for customization:</p>

          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Variants</h4>
              <p>Control the visual style of components using the <code>variant</code> prop.</p>
              <div style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '8px', color: 'var(--spectrum-gray-600)' }}>
                {`<Button variant="accent">Primary</Button>`}<br />
                {`<Button variant="secondary">Secondary</Button>`}
              </div>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Sizes</h4>
              <p>Adjust component dimensions using the <code>size</code> prop.</p>
              <div style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '8px', color: 'var(--spectrum-gray-600)' }}>
                {`<Button size="small">Small</Button>`}<br />
                {`<Button size="medium">Medium</Button>`}<br />
                {`<Button size="large">Large</Button>`}
              </div>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>States</h4>
              <p>Handle interactive states like disabled, loading, or selected.</p>
              <div style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '8px', color: 'var(--spectrum-gray-600)' }}>
                {`<Button isDisabled>Disabled</Button>`}<br />
                {`<Checkbox isSelected>Selected</Checkbox>`}
              </div>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Next Steps</h2>
          <p>Now that you have the basics set up, explore more features:</p>
          
          <ul style={{ marginLeft: '24px', lineHeight: '1.8', marginTop: '16px' }}>
            <li><strong>Browse Components:</strong> Explore our complete component library</li>
            <li><strong>Design Tokens:</strong> Learn about our design token system</li>
            <li><strong>Accessibility:</strong> Understand accessibility features and best practices</li>
            <li><strong>Custom Theming:</strong> Create your own custom themes</li>
          </ul>
        </div>

        <div className="home-section">
          <h2>Support</h2>
          <p>Need help? Here are some resources:</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📚 Documentation</h3>
              <p>Comprehensive guides and API references for all components.</p>
            </div>

            <div className="feature-card">
              <h3>💬 Community</h3>
              <p>Join our community forums to ask questions and share experiences.</p>
            </div>

            <div className="feature-card">
              <h3>🐛 Issues</h3>
              <p>Report bugs and request features on our GitHub repository.</p>
            </div>

            <div className="feature-card">
              <h3>📧 Support</h3>
              <p>Contact our support team for enterprise and technical assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;