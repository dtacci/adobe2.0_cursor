import React from 'react';

const AccessibilityPage = () => {
  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">Accessibility</h1>
        <p className="component-description">
          Accessibility is fundamental to creating inclusive experiences. Our components are built with accessibility in mind from the ground up.
        </p>
      </div>
      
      <div className="home-content">
        <div className="home-section">
          <h2>Our Commitment to Accessibility</h2>
          <p>
            We believe that technology should be accessible to everyone, regardless of their abilities or disabilities. 
            Our design system follows WCAG 2.1 AA guidelines and incorporates accessibility best practices throughout.
          </p>
          <p>
            Every component is designed to work seamlessly with assistive technologies and provides multiple ways 
            for users to interact with and understand content.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎯 Perceivable</h3>
            <p>
              Information and UI components must be presentable in ways users can perceive. 
              We ensure sufficient color contrast, provide text alternatives, and support multiple sensory channels.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>4.5:1 contrast ratio for normal text</li>
              <li>3:1 contrast ratio for large text</li>
              <li>Meaningful alt text for images</li>
              <li>Color is not the only visual means of conveying information</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>⌨️ Operable</h3>
            <p>
              UI components and navigation must be operable by all users. 
              We provide full keyboard navigation support and ensure all interactive elements are accessible.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Full keyboard navigation support</li>
              <li>Visible focus indicators</li>
              <li>No seizure-inducing content</li>
              <li>Sufficient time to read and use content</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🧠 Understandable</h3>
            <p>
              Information and operation of UI must be understandable. 
              We use clear language, predictable functionality, and helpful error messages.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Clear, simple language</li>
              <li>Predictable navigation and functionality</li>
              <li>Input assistance and error identification</li>
              <li>Consistent design patterns</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>🔧 Robust</h3>
            <p>
              Content must be robust enough to work with a wide variety of assistive technologies. 
              We use semantic HTML and proper ARIA attributes.
            </p>
            <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
              <li>Valid, semantic HTML</li>
              <li>Proper ARIA labels and roles</li>
              <li>Compatible with assistive technologies</li>
              <li>Progressive enhancement</li>
            </ul>
          </div>
        </div>

        <div className="home-section">
          <h2>Accessibility Features</h2>
          <p>Our components include built-in accessibility features:</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Keyboard Navigation</h3>
              <p>All interactive elements can be reached and operated using only the keyboard.</p>
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--spectrum-gray-100)', borderRadius: '4px' }}>
                <strong>Common keyboard shortcuts:</strong><br />
                <code>Tab</code> - Move focus forward<br />
                <code>Shift + Tab</code> - Move focus backward<br />
                <code>Enter/Space</code> - Activate buttons<br />
                <code>Arrow keys</code> - Navigate within components
              </div>
            </div>

            <div className="feature-card">
              <h3>Screen Reader Support</h3>
              <p>All components work seamlessly with popular screen readers like NVDA, JAWS, and VoiceOver.</p>
              <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
                <li>Proper semantic markup</li>
                <li>ARIA labels and descriptions</li>
                <li>Live region announcements</li>
                <li>Logical reading order</li>
              </ul>
            </div>

            <div className="feature-card">
              <h3>High Contrast Support</h3>
              <p>Our design system works well with high contrast modes and custom user stylesheets.</p>
              <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
                <li>Windows High Contrast Mode support</li>
                <li>Respects user's contrast preferences</li>
                <li>Focus indicators remain visible</li>
                <li>Icons have sufficient contrast</li>
              </ul>
            </div>

            <div className="feature-card">
              <h3>Reduced Motion</h3>
              <p>We respect user preferences for reduced motion and provide alternatives to animations.</p>
              <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '14px' }}>
                <li>Respects prefers-reduced-motion</li>
                <li>Essential animations remain functional</li>
                <li>No auto-playing content</li>
                <li>Transition alternatives provided</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Testing for Accessibility</h2>
          <p>We recommend regular accessibility testing using both automated tools and manual testing methods:</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Automated Testing</h3>
              <ul style={{ marginLeft: '16px', fontSize: '14px' }}>
                <li><strong>axe-core:</strong> Industry-standard accessibility testing</li>
                <li><strong>WAVE:</strong> Web accessibility evaluation tool</li>
                <li><strong>Lighthouse:</strong> Built-in Chrome accessibility audits</li>
                <li><strong>Pa11y:</strong> Command-line accessibility testing</li>
              </ul>
            </div>

            <div className="feature-card">
              <h3>Manual Testing</h3>
              <ul style={{ marginLeft: '16px', fontSize: '14px' }}>
                <li><strong>Keyboard navigation:</strong> Navigate using only the keyboard</li>
                <li><strong>Screen reader testing:</strong> Test with NVDA, JAWS, or VoiceOver</li>
                <li><strong>Color contrast:</strong> Verify text meets contrast requirements</li>
                <li><strong>High contrast mode:</strong> Test in Windows High Contrast</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Component-Specific Guidelines</h2>
          <p>Each component type has specific accessibility considerations:</p>
          
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Form Controls</h4>
              <p>Buttons, inputs, checkboxes, and radio buttons include proper labels, state announcements, and keyboard support.</p>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Navigation</h4>
              <p>Menus, tabs, and links provide clear navigation structure with proper ARIA roles and keyboard navigation.</p>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Feedback</h4>
              <p>Alerts, toasts, and progress indicators announce important changes to screen reader users.</p>
            </div>
            
            <div style={{ padding: '16px', border: '1px solid var(--spectrum-gray-300)', borderRadius: '4px' }}>
              <h4>Data Display</h4>
              <p>Tables, cards, and lists provide proper structure and relationships between data elements.</p>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Resources</h2>
          <p>Learn more about accessibility best practices:</p>
          
          <ul style={{ marginLeft: '24px', lineHeight: '1.8', marginTop: '16px' }}>
            <li><strong>WCAG 2.1 Guidelines:</strong> Official web accessibility guidelines</li>
            <li><strong>WebAIM:</strong> Resources and training for web accessibility</li>
            <li><strong>A11y Project:</strong> Community-driven effort to make web accessibility easier</li>
            <li><strong>Deque University:</strong> Comprehensive accessibility training</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;