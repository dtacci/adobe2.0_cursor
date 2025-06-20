import React from 'react';

const FoundationsPage = () => {
  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">Design Foundations</h1>
        <p className="component-description">
          The core principles and foundations that guide Adobe Spectrum's design philosophy and decision-making process.
        </p>
      </div>
      
      <div className="home-content">
        <div className="home-section">
          <h2>Design Philosophy</h2>
          <p>
            Spectrum is built on principles that ensure every design decision serves a clear purpose and creates 
            meaningful experiences for our users. These foundations guide how we approach every aspect of the design system.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎯 Human-Centered</h3>
            <p>
              Designed for real people creating real things, with empathy and understanding at the core. 
              We prioritize user needs and create experiences that feel natural and intuitive.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>User research drives design decisions</li>
              <li>Empathy guides every interaction</li>
              <li>Real-world testing validates solutions</li>
              <li>Feedback loops inform iteration</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🌍 Inclusive</h3>
            <p>
              Built for everyone, ensuring accessibility and usability across diverse users and contexts. 
              We design for different abilities, cultures, and ways of working.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>WCAG 2.1 AA compliance</li>
              <li>Multi-language support</li>
              <li>Cultural sensitivity</li>
              <li>Device and context flexibility</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🔄 Coherent</h3>
            <p>
              Consistent patterns and behaviors that create predictable, learnable experiences. 
              Users can apply knowledge from one context to another.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Consistent interaction patterns</li>
              <li>Unified visual language</li>
              <li>Predictable behavior</li>
              <li>Transferable knowledge</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🎯 Purposeful</h3>
            <p>
              Every element serves a clear purpose, eliminating unnecessary complexity and friction. 
              We focus on what matters most to users and their goals.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Essential functionality first</li>
              <li>Clear information hierarchy</li>
              <li>Minimal cognitive load</li>
              <li>Goal-oriented design</li>
            </ul>
          </div>
        </div>

        <div className="home-section">
          <h2>Visual Language</h2>
          <p>Our visual foundation creates a cohesive and recognizable Adobe experience:</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Typography</h3>
              <p>Clear, readable typography that establishes hierarchy and guides users through content.</p>
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Adobe Clean
                </div>
                <div style={{ fontSize: '14px', color: 'var(--spectrum-gray-600)' }}>
                  Our primary typeface provides excellent readability across all sizes and contexts.
                </div>
              </div>
            </div>

            <div className="feature-card">
              <h3>Color</h3>
              <p>A carefully crafted color system that communicates meaning and creates emotional connection.</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#378ef0', borderRadius: '50%' }} title="Primary Blue"></div>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#e34850', borderRadius: '50%' }} title="Error Red"></div>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#2d9d78', borderRadius: '50%' }} title="Success Green"></div>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#e68619', borderRadius: '50%' }} title="Warning Orange"></div>
              </div>
            </div>

            <div className="feature-card">
              <h3>Iconography</h3>
              <p>Consistent, recognizable icons that communicate quickly and universally.</p>
              <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--spectrum-gray-600)' }}>
                • 18px grid system<br />
                • 2px stroke weight<br />
                • Rounded corners<br />
                • Optical alignment
              </div>
            </div>

            <div className="feature-card">
              <h3>Layout</h3>
              <p>Structured, flexible layouts that work across different screen sizes and contexts.</p>
              <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--spectrum-gray-600)' }}>
                • 8px base unit<br />
                • Responsive grid system<br />
                • Consistent spacing<br />
                • Flexible containers
              </div>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Interaction Principles</h2>
          <p>How users interact with our interfaces is as important as how they look:</p>
          
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Feedback</h4>
              <p>Immediate, clear feedback helps users understand the results of their actions and maintains confidence in the system.</p>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Affordances</h4>
              <p>Interactive elements clearly communicate their function through visual cues, making interfaces intuitive to use.</p>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Progressive Disclosure</h4>
              <p>Information and options are revealed progressively, preventing overwhelming users while keeping advanced features accessible.</p>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Error Prevention</h4>
              <p>Design patterns that help prevent errors from occurring, and when they do happen, provide clear paths to resolution.</p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Content Strategy</h2>
          <p>Words are as important as visuals in creating great user experiences:</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Voice & Tone</h3>
              <p>Our voice is helpful, confident, and human. Our tone adapts to the context and user's emotional state.</p>
            </div>

            <div className="feature-card">
              <h3>Clarity</h3>
              <p>Clear, concise language that helps users understand what they need to do and why it matters.</p>
            </div>

            <div className="feature-card">
              <h3>Consistency</h3>
              <p>Consistent terminology and writing patterns that reduce cognitive load and build familiarity.</p>
            </div>

            <div className="feature-card">
              <h3>Inclusivity</h3>
              <p>Language that welcomes everyone and avoids assumptions about users' knowledge, abilities, or context.</p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Implementation Guidelines</h2>
          <p>These foundations translate into practical guidelines for using the design system:</p>
          
          <ul style={{ marginLeft: '24px', lineHeight: '1.8', marginTop: '16px' }}>
            <li><strong>Start with user needs:</strong> Every design decision should serve a clear user goal</li>
            <li><strong>Use established patterns:</strong> Leverage proven solutions before creating new ones</li>
            <li><strong>Test early and often:</strong> Validate designs with real users in real contexts</li>
            <li><strong>Consider edge cases:</strong> Design for error states, loading states, and empty states</li>
            <li><strong>Plan for scale:</strong> Solutions should work across different products and contexts</li>
            <li><strong>Document decisions:</strong> Share the reasoning behind design choices with your team</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoundationsPage;