import React from 'react';

const DesignTokensPage = () => {
  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">Design Tokens</h1>
        <p className="component-description">
          Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.
        </p>
      </div>
      
      <div className="home-content">
        <div className="home-section">
          <h2>What are Design Tokens?</h2>
          <p>
            Design tokens are a methodology for expressing design decisions in a platform-agnostic way so that they can be shared across different disciplines, tools, and technologies.
          </p>
          <p>
            They represent the small, repeated design decisions that make up a design system's visual style. Tokens replace static values (such as hex codes for color, pixel values for spacing) with self-explanatory names.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Colors</h3>
            <p>Our color palette includes semantic colors for different states and contexts, ensuring consistency across all components.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-blue-600)', 
                borderRadius: '4px',
                border: '1px solid var(--spectrum-gray-300)'
              }} title="Blue 600"></div>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-red-600)', 
                borderRadius: '4px',
                border: '1px solid var(--spectrum-gray-300)'
              }} title="Red 600"></div>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-green-600)', 
                borderRadius: '4px',
                border: '1px solid var(--spectrum-gray-300)'
              }} title="Green 600"></div>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-orange-600)', 
                borderRadius: '4px',
                border: '1px solid var(--spectrum-gray-300)'
              }} title="Orange 600"></div>
            </div>
          </div>

          <div className="feature-card">
            <h3>Typography</h3>
            <p>Our typography scale provides consistent text sizing and hierarchy throughout the application.</p>
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: 'var(--spectrum-font-size-300)', fontWeight: 'var(--spectrum-font-weight-bold)', marginBottom: '4px' }}>
                Heading Large
              </div>
              <div style={{ fontSize: 'var(--spectrum-font-size-200)', fontWeight: 'var(--spectrum-font-weight-medium)', marginBottom: '4px' }}>
                Heading Medium
              </div>
              <div style={{ fontSize: 'var(--spectrum-font-size-100)', marginBottom: '4px' }}>
                Body Text
              </div>
              <div style={{ fontSize: 'var(--spectrum-font-size-75)', color: 'var(--spectrum-gray-600)' }}>
                Detail Text
              </div>
            </div>
          </div>

          <div className="feature-card">
            <h3>Spacing</h3>
            <p>Consistent spacing tokens ensure proper alignment and visual hierarchy across all components.</p>
            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '4px', height: '16px', backgroundColor: 'var(--spectrum-blue-600)' }}></div>
                <span style={{ fontSize: '12px' }}>4px - Spacing 50</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '8px', height: '16px', backgroundColor: 'var(--spectrum-blue-600)' }}></div>
                <span style={{ fontSize: '12px' }}>8px - Spacing 100</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--spectrum-blue-600)' }}></div>
                <span style={{ fontSize: '12px' }}>16px - Spacing 300</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '16px', backgroundColor: 'var(--spectrum-blue-600)' }}></div>
                <span style={{ fontSize: '12px' }}>24px - Spacing 400</span>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <h3>Border Radius</h3>
            <p>Consistent corner radius values create a cohesive visual language across all interface elements.</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-gray-200)', 
                borderRadius: 'var(--spectrum-corner-radius-75)',
                border: '1px solid var(--spectrum-gray-400)'
              }} title="3px"></div>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-gray-200)', 
                borderRadius: 'var(--spectrum-corner-radius-100)',
                border: '1px solid var(--spectrum-gray-400)'
              }} title="4px"></div>
              <div style={{ 
                width: '40px', height: '40px', 
                backgroundColor: 'var(--spectrum-gray-200)', 
                borderRadius: 'var(--spectrum-corner-radius-200)',
                border: '1px solid var(--spectrum-gray-400)'
              }} title="8px"></div>
            </div>
          </div>
        </div>

        <div className="home-section">
          <h2>Token Categories</h2>
          <p>Our design tokens are organized into logical categories:</p>
          
          <div className="token-category">
            <h3>Global Tokens</h3>
            <p>Context-agnostic tokens that represent the foundational scales and palettes of the design system.</p>
            <ul style={{ marginLeft: '24px', lineHeight: '1.8' }}>
              <li>Color palettes (gray, blue, red, green, etc.)</li>
              <li>Font sizes and weights</li>
              <li>Spacing scale</li>
              <li>Border radius values</li>
              <li>Animation durations</li>
            </ul>
          </div>

          <div className="token-category">
            <h3>Semantic Tokens</h3>
            <p>Context-specific tokens that communicate the intended purpose of a token.</p>
            <ul style={{ marginLeft: '24px', lineHeight: '1.8' }}>
              <li>Background colors (primary, secondary, accent)</li>
              <li>Text colors (default, muted, inverse)</li>
              <li>Border colors (default, hover, focus)</li>
              <li>Component-specific dimensions</li>
            </ul>
          </div>

          <div className="token-category">
            <h3>Component Tokens</h3>
            <p>Tokens that represent the visual properties of specific components.</p>
            <ul style={{ marginLeft: '24px', lineHeight: '1.8' }}>
              <li>Button heights and padding</li>
              <li>Form field dimensions</li>
              <li>Icon sizes</li>
              <li>Component-specific spacing</li>
            </ul>
          </div>
        </div>

        <div className="home-section">
          <h2>Using Design Tokens</h2>
          <p>Design tokens are implemented as CSS custom properties and can be used throughout your stylesheets:</p>
          
          <div style={{ 
            backgroundColor: 'var(--spectrum-gray-100)', 
            padding: '16px', 
            borderRadius: '4px', 
            fontFamily: 'monospace',
            fontSize: '14px',
            marginTop: '16px',
            border: '1px solid var(--spectrum-gray-300)'
          }}>
            <div>{/* Using color tokens */}</div>
            <div>background-color: var(--spectrum-accent-background-color-default);</div>
            <div>color: var(--spectrum-neutral-content-color-default);</div>
            <br />
            <div>{/* Using spacing tokens */}</div>
            <div>padding: var(--spectrum-spacing-300);</div>
            <div>margin: var(--spectrum-spacing-200) 0;</div>
            <br />
            <div>{/* Using typography tokens */}</div>
            <div>font-size: var(--spectrum-font-size-200);</div>
            <div>font-weight: var(--spectrum-font-weight-medium);</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTokensPage;