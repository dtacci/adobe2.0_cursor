import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import all spectrum components
import Accordion from './spectrum/Accordion';
import Avatar from './spectrum/Avatar';
import Badge from './spectrum/Badge';
import Breadcrumbs from './spectrum/Breadcrumbs';
import Button from './spectrum/Button';
import ActionButton from './spectrum/ActionButton';
import Card from './spectrum/Card';
import Checkbox from './spectrum/Checkbox';
import Radio from './spectrum/Radio';
import ColorField from './spectrum/ColorField';
import ColorArea from './spectrum/ColorArea';
import ColorWheel from './spectrum/ColorWheel';
import Combobox from './spectrum/Combobox';
import Menu from './spectrum/Menu';
import Picker from './spectrum/Picker';
import Search from './spectrum/Search';
import Slider from './spectrum/Slider';
import Switch from './spectrum/Switch';
import Tabs from './spectrum/Tabs';
import Textfield from './spectrum/Textfield';
import Toast from './spectrum/Toast';
import Icon from './spectrum/Icon';
import Divider from './spectrum/Divider';
import Link from './spectrum/Link';
import ProgressBar from './spectrum/ProgressBar';

const ComponentView = ({ componentName, theme, scale }) => {
  const [props, setProps] = useState({});

  const updateProp = (key, value) => {
    setProps(prev => ({ ...prev, [key]: value }));
  };

  const getComponentDescription = (name) => {
    const descriptions = {
      Accordion: "Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page. They allow users to choose what they want to read or ignore.",
      Avatar: "Avatars are used to represent a person or entity. They can display an image, initials, or an icon and come in different sizes for various contexts.",
      Badge: "Badges are used for showing a small amount of color-coded metadata, which are ideal for getting a user's attention.",
      Breadcrumbs: "Breadcrumbs show hierarchy and navigational context for a user's location within an application. They provide a way to navigate back to previous levels.",
      Button: "Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs, and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.",
      ActionButton: "Action buttons allow users to perform an action. They're used for similar, related actions that a user can take.",
      Card: "Cards are used to group information and actions about a single subject. They make information easy to scan and provide clear entry points for more detailed information.",
      Checkbox: "Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.",
      Radio: "Radio buttons allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.",
      ColorField: "A color field allows users to enter a color value. It includes a color swatch that shows the current color value.",
      ColorArea: "A color area allows users to visually select a color from a two-dimensional area. It's commonly used as a part of a color picker.",
      ColorWheel: "A color wheel allows users to select a color from a circular HSV color space. It provides intuitive color selection by combining hue and saturation in a wheel format.",
      Combobox: "A combobox combines a text input with a listbox, allowing users to filter a list of options to items matching a query.",
      Menu: "Menus display a list of actions or options that a user can choose.",
      Picker: "A picker displays a collapsible list of options and allows a user to select one of them.",
      Search: "A search field allows a user to enter a search query. It includes a search icon and can include additional functionality like clear and submit actions.",
      Slider: "Sliders allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.",
      Switch: "Switches allow users to turn an individual option on or off. They are usually used to activate or deactivate a specific setting.",
      Tabs: "Tabs organize content into multiple sections and allow users to navigate between them. They should be used when the content sections are at the same level of hierarchy.",
      Textfield: "Text fields allow users to enter text. They can be used for single-line or multi-line text input.",
      Toast: "Toasts display brief, temporary notifications. They're meant to be noticed without disrupting a user's experience or requiring an action to be taken.",
      Icon: "Icons are visual symbols used to represent ideas, objects, or actions. They communicate messages at a glance, afford interactivity, and draw attention to important information.",
      Divider: "Dividers bring clarity to a layout by grouping and dividing content in close proximity. They can also be used to establish rhythm and hierarchy.",
      Link: "Links allow users to navigate to a different location. They can be presented inline inside a paragraph or as standalone text.",
      ProgressBar: "Progress bars show the progression of a system operation such as downloading, uploading, loading data, submitting a form, or saving updates."
    };
    return descriptions[name] || "A Spectrum component with various interactive states and properties.";
  };

  const renderComponent = () => {
    if (!componentName) return null;

    // Handle component name variations and spaces
    const normalizedName = componentName.replace(/\s+/g, '').replace(/[^a-zA-Z]/g, '');
    
    switch (normalizedName) {
      case 'Accordion':
        return (
          <Accordion allowMultiple={props.allowMultiple || false}>
            <Accordion.Item title="First Section" disabled={props.isDisabled || false}>
              This is the content for the first accordion section. It can contain any type of content including text, links, or other components.
            </Accordion.Item>
            <Accordion.Item title="Second Section">
              This is the content for the second accordion section. Accordions are great for organizing information into collapsible sections.
            </Accordion.Item>
            <Accordion.Item title="Third Section">
              This is the content for the third accordion section. Users can expand and collapse sections as needed.
            </Accordion.Item>
          </Accordion>
        );
      case 'Avatar':
        return (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar
              size={props.size || 'medium'}
              disabled={props.isDisabled || false}
              src={props.src || 'https://i.pravatar.cc/150?img=1'}
              alt={props.alt || 'John Doe'}
              initials={props.initials}
            />
            {!props.src && (
              <Avatar
                size={props.size || 'medium'}
                disabled={props.isDisabled || false}
                initials={props.initials || 'JD'}
                alt="Jane Doe"
              />
            )}
          </div>
        );
      case 'Breadcrumbs':
        return (
          <Breadcrumbs 
            size={props.size || 'medium'} 
            multiline={props.multiline || false}
            showRoot={props.showRoot !== false}
          >
            <Breadcrumbs.Item href="#" disabled={props.isDisabled || false}>Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#" disabled={props.isDisabled || false}>Category</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#" disabled={props.isDisabled || false}>Subcategory</Breadcrumbs.Item>
            <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
          </Breadcrumbs>
        );
      case 'Card':
        return (
          <Card
            variant={props.variant || 'primary'}
            layout={props.layout || 'vertical'}
            selectable={props.selectable || false}
            selected={props.selected || false}
            disabled={props.isDisabled || false}
            style={{ width: '300px' }}
          >
            <Card.Header>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle>Card Subtitle</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              This is the main content area of the card. It can contain any type of content including text, images, or other components.
            </Card.Body>
            <Card.Footer>
              Card footer content
            </Card.Footer>
          </Card>
        );
      case 'Tabs':
        return (
          <Tabs
            orientation={props.orientation || 'horizontal'}
            size={props.size || 'medium'}
            emphasized={props.emphasized || false}
            disabled={props.isDisabled || false}
            defaultTab="tab1"
          >
            <Tabs.Item tabId="tab1">First Tab</Tabs.Item>
            <Tabs.Item tabId="tab2" disabled={props.itemDisabled || false}>Second Tab</Tabs.Item>
            <Tabs.Item tabId="tab3">Third Tab</Tabs.Item>
            <Tabs.Panel tabId="tab1">
              <h3>First Tab Content</h3>
              <p>This is the content for the first tab. It can contain any type of content.</p>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab2">
              <h3>Second Tab Content</h3>
              <p>This is the content for the second tab.</p>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab3">
              <h3>Third Tab Content</h3>
              <p>This is the content for the third tab.</p>
            </Tabs.Panel>
          </Tabs>
        );
      case 'Button':
        return (
          <Button
            variant={props.variant || 'primary'}
            size={props.size || 'medium'}
            isQuiet={props.isQuiet || false}
            isDisabled={props.isDisabled || false}
          >
            {props.children || 'Button'}
          </Button>
        );
      case 'ActionButton':
        return (
          <ActionButton
            variant={props.variant || 'default'}
            size={props.size || 'medium'}
            quiet={props.isQuiet || false}
            disabled={props.isDisabled || false}
            selected={props.selected || false}
          >
            {props.children || 'Action'}
          </ActionButton>
        );
      case 'Checkbox':
        return (
          <Checkbox
            checked={props.isChecked || false}
            indeterminate={props.isIndeterminate || false}
            disabled={props.isDisabled || false}
            invalid={props.isInvalid || false}
            emphasized={props.isEmphasized || false}
            label={props.children || 'Checkbox'}
          />
        );
      case 'Radio':
        return (
          <Radio
            checked={props.isSelected || false}
            disabled={props.isDisabled || false}
            invalid={props.isInvalid || false}
            emphasized={props.isEmphasized || false}
            value={props.value || 'radio'}
            label={props.children || 'Radio'}
          />
        );
      case 'ColorField':
        return (
          <ColorField
            value={props.value || '#ff0000'}
            isDisabled={props.isDisabled || false}
            isInvalid={props.isInvalid || false}
            isQuiet={props.isQuiet || false}
            placeholder={props.placeholder || 'Enter color'}
          />
        );
      case 'ColorArea':
        return (
          <ColorArea
            value={props.value || '#ff0000'}
            isDisabled={props.isDisabled || false}
          />
        );
      case 'ColorWheel':
        return (
          <ColorWheel
            value={props.value || { hue: 0, saturation: 100, value: 100 }}
            disabled={props.isDisabled || false}
            size={props.size || 'medium'}
            onChange={(color) => console.log('Color changed:', color)}
          />
        );
      case 'Combobox':
        return (
          <Combobox
            placeholder={props.placeholder || 'Search...'}
            isDisabled={props.isDisabled || false}
            isInvalid={props.isInvalid || false}
            isQuiet={props.isQuiet || false}
            options={props.options || ['Option 1', 'Option 2', 'Option 3']}
          />
        );
      case 'Menu':
        return (
          <Menu
            selectionMode={props.selectionMode || 'none'}
            items={props.items || [
              { id: '1', label: 'Menu Item 1' },
              { id: '2', label: 'Menu Item 2' },
              { id: '3', label: 'Menu Item 3' }
            ]}
          />
        );
      case 'Picker':
        return (
          <Picker
            placeholder={props.placeholder || 'Select an option'}
            isDisabled={props.isDisabled || false}
            isInvalid={props.isInvalid || false}
            isQuiet={props.isQuiet || false}
            options={props.options || ['Option 1', 'Option 2', 'Option 3']}
          />
        );
      case 'Search':
        return (
          <Search
            placeholder={props.placeholder || 'Search'}
            isDisabled={props.isDisabled || false}
            isQuiet={props.isQuiet || false}
            value={props.value || ''}
          />
        );
      case 'Slider':
        return (
          <Slider
            value={props.value || 50}
            min={props.min || 0}
            max={props.max || 100}
            step={props.step || 1}
            isDisabled={props.isDisabled || false}
            size={props.size || 'medium'}
            formatOptions={props.formatOptions}
          />
        );
      case 'Switch':
        return (
          <Switch
            isSelected={props.isSelected || false}
            isDisabled={props.isDisabled || false}
            isEmphasized={props.isEmphasized || false}
            size={props.size || 'medium'}
          >
            {props.children || 'Switch'}
          </Switch>
        );
      case 'Textfield':
        return (
          <Textfield
            placeholder={props.placeholder || 'Enter text'}
            value={props.value || ''}
            isDisabled={props.isDisabled || false}
            isInvalid={props.isInvalid || false}
            isQuiet={props.isQuiet || false}
            isMultiline={props.isMultiline || false}
            label={props.label || 'Text Field'}
            helpText={props.helpText}
            errorMessage={props.errorMessage}
          />
        );
      case 'Toast':
        return (
          <Toast
            variant={props.variant || 'positive'}
            timeout={props.timeout || 5000}
          >
            {props.children || 'Toast message'}
          </Toast>
        );
      case 'Icon':
        return (
          <Icon
            name={props.name || 'CheckmarkCircle'}
            size={props.size || 'medium'}
          />
        );
      case 'Divider':
        return (
          <Divider
            orientation={props.orientation || 'horizontal'}
            variant={props.variant || 'medium'}
          />
        );
      case 'Link':
        return (
          <Link
            variant={props.variant || 'primary'}
            isQuiet={props.isQuiet || false}
            href={props.href || '#'}
          >
            {props.children || 'Link text'}
          </Link>
        );
      case 'Badge':
        return (
          <Badge
            variant={props.variant || 'neutral'}
            size={props.size || 'm'}
          >
            {props.children || 'Badge'}
          </Badge>
        );
      case 'ProgressBar':
        return (
          <ProgressBar
            value={props.value || 50}
            variant={props.variant || 'informative'}
            size={props.size || 'medium'}
            isIndeterminate={props.isIndeterminate || false}
            showValueLabel={props.showValueLabel !== false}
          />
        );
      case 'ActionBar':
      case 'Action Bar':
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Action Bar Component</h3>
            <p>This component will contain action buttons in a horizontal layout.</p>
            <p style={{ fontSize: '14px' }}>
              Controls will be added once the component is implemented.
            </p>
          </div>
        );
      case 'ActionGroup':
      case 'Action Group':
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Action Group Component</h3>
            <p>This component will group related action buttons together.</p>
            <p style={{ fontSize: '14px' }}>
              Controls will be added once the component is implemented.
            </p>
          </div>
        );
      case 'Actionmenu':
      case 'Action menu':
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Action Menu Component</h3>
            <p>This component will provide a menu of actions triggered by a button.</p>
            <p style={{ fontSize: '14px' }}>
              Controls will be added once the component is implemented.
            </p>
          </div>
        );
      case 'AlertBanner':
      case 'Alert Banner':
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Alert Banner Component</h3>
            <p>This component will display important alerts and notifications.</p>
            <p style={{ fontSize: '14px' }}>
              Controls will be added once the component is implemented.
            </p>
          </div>
        );
      case 'AlertDialog':
      case 'Alert Dialog':
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Alert Dialog Component</h3>
            <p>This component will display modal alert dialogs for critical information.</p>
            <p style={{ fontSize: '14px' }}>
              Controls will be added once the component is implemented.
            </p>
          </div>
        );
      case 'Asset':
        return (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Asset Component</h3>
            <p>This component will display and manage digital assets.</p>
            <p style={{ fontSize: '14px' }}>
              Controls will be added once the component is implemented.
            </p>
          </div>
        );
      default:
        return (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: 'var(--storybook-text-muted)',
            fontSize: '16px'
          }}>
            <h3>Component Not Yet Implemented</h3>
            <p>The <strong>{componentName}</strong> component is coming soon!</p>
            <p style={{ fontSize: '14px', marginTop: '20px' }}>
              This component exists in the actual Storybook but hasn't been recreated in our React version yet.
            </p>
          </div>
        );
    }
  };

  const renderControls = () => {
    if (!componentName) return null;

    const controls = [];

    // Accordion controls
    if (componentName === 'Accordion') {
      controls.push(
        <div key="allowMultiple" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.allowMultiple || false} 
              onChange={(e) => updateProp('allowMultiple', e.target.checked)}
            />
            Allow Multiple
          </label>
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    // ActionButton controls
    if (componentName === 'ActionButton') {
      controls.push(
        <div key="variant" className="control-item">
          <label className="control-label">Variant</label>
          <select 
            className="control-input"
            value={props.variant || 'default'} 
            onChange={(e) => updateProp('variant', e.target.value)}
          >
            <option value="default">Default</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="accent">Accent</option>
            <option value="negative">Negative</option>
            <option value="over-background">Over Background</option>
          </select>
        </div>,
        <div key="size" className="control-item">
          <label className="control-label">Size</label>
          <select 
            className="control-input"
            value={props.size || 'medium'} 
            onChange={(e) => updateProp('size', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>,
        <div key="children" className="control-item">
          <label className="control-label">Text</label>
          <input 
            className="control-input"
            type="text" 
            value={props.children || 'Action'} 
            onChange={(e) => updateProp('children', e.target.value)}
          />
        </div>,
        <div key="isQuiet" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isQuiet || false} 
              onChange={(e) => updateProp('isQuiet', e.target.checked)}
            />
            Quiet
          </label>
        </div>,
        <div key="selected" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.selected || false} 
              onChange={(e) => updateProp('selected', e.target.checked)}
            />
            Selected
          </label>
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    // Avatar controls
    if (componentName === 'Avatar') {
      controls.push(
        <div key="size" className="control-item">
          <label className="control-label">Size</label>
          <select 
            className="control-input"
            value={props.size || 'medium'} 
            onChange={(e) => updateProp('size', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra Large</option>
          </select>
        </div>,
        <div key="src" className="control-item">
          <label className="control-label">Image URL</label>
          <input 
            className="control-input"
            type="text" 
            value={props.src || 'https://i.pravatar.cc/150?img=1'} 
            onChange={(e) => updateProp('src', e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>,
        <div key="initials" className="control-item">
          <label className="control-label">Initials</label>
          <input 
            className="control-input"
            type="text" 
            value={props.initials || ''} 
            onChange={(e) => updateProp('initials', e.target.value)}
            placeholder="JD"
            maxLength="2"
          />
        </div>,
        <div key="alt" className="control-item">
          <label className="control-label">Alt Text</label>
          <input 
            className="control-input"
            type="text" 
            value={props.alt || 'John Doe'} 
            onChange={(e) => updateProp('alt', e.target.value)}
            placeholder="John Doe"
          />
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    // Button controls
    if (componentName === 'Button') {
      controls.push(
        <div key="variant" className="control-item">
          <label className="control-label">Variant</label>
          <select 
            className="control-input"
            value={props.variant || 'primary'} 
            onChange={(e) => updateProp('variant', e.target.value)}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="accent">Accent</option>
            <option value="negative">Negative</option>
            <option value="over-background">Over Background</option>
          </select>
        </div>,
        <div key="size" className="control-item">
          <label className="control-label">Size</label>
          <select 
            className="control-input"
            value={props.size || 'medium'} 
            onChange={(e) => updateProp('size', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>,
        <div key="children" className="control-item">
          <label className="control-label">Text</label>
          <input 
            className="control-input"
            type="text" 
            value={props.children || 'Button'} 
            onChange={(e) => updateProp('children', e.target.value)}
          />
        </div>,
        <div key="isQuiet" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isQuiet || false} 
              onChange={(e) => updateProp('isQuiet', e.target.checked)}
            />
            Quiet
          </label>
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    // Badge controls
    if (componentName === 'Badge') {
      controls.push(
        <div key="variant" className="control-item">
          <label className="control-label">Variant</label>
          <select 
            className="control-input"
            value={props.variant || 'neutral'} 
            onChange={(e) => updateProp('variant', e.target.value)}
          >
            <option value="neutral">Neutral</option>
            <option value="accent">Accent</option>
            <option value="informative">Informative</option>
            <option value="positive">Positive</option>
            <option value="notice">Notice</option>
            <option value="negative">Negative</option>
          </select>
        </div>,
        <div key="size" className="control-item">
          <label className="control-label">Size</label>
          <select 
            className="control-input"
            value={props.size || 'm'} 
            onChange={(e) => updateProp('size', e.target.value)}
          >
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
          </select>
        </div>,
        <div key="children" className="control-item">
          <label className="control-label">Text</label>
          <input 
            className="control-input"
            type="text" 
            value={props.children || 'Badge'} 
            onChange={(e) => updateProp('children', e.target.value)}
          />
        </div>
      );
    }

    // Breadcrumbs controls
    if (componentName === 'Breadcrumbs') {
      controls.push(
        <div key="size" className="control-item">
          <label className="control-label">Size</label>
          <select 
            className="control-input"
            value={props.size || 'medium'} 
            onChange={(e) => updateProp('size', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>,
        <div key="multiline" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.multiline || false} 
              onChange={(e) => updateProp('multiline', e.target.checked)}
            />
            Multiline
          </label>
        </div>,
        <div key="showRoot" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.showRoot !== false} 
              onChange={(e) => updateProp('showRoot', e.target.checked)}
            />
            Show Root
          </label>
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    // Action Bar controls (placeholder)
    if (componentName === 'Action Bar') {
      controls.push(
        <div key="placeholder" className="control-item">
          <label className="control-label">Placeholder Controls</label>
          <p style={{ fontSize: '12px', color: 'var(--storybook-text-muted)', margin: 0 }}>
            Controls will be added when the component is implemented.
          </p>
        </div>
      );
    }

    // Action Group controls (placeholder)
    if (componentName === 'Action Group') {
      controls.push(
        <div key="placeholder" className="control-item">
          <label className="control-label">Placeholder Controls</label>
          <p style={{ fontSize: '12px', color: 'var(--storybook-text-muted)', margin: 0 }}>
            Controls will be added when the component is implemented.
          </p>
        </div>
      );
    }

    // Action menu controls (placeholder)
    if (componentName === 'Action menu') {
      controls.push(
        <div key="placeholder" className="control-item">
          <label className="control-label">Placeholder Controls</label>
          <p style={{ fontSize: '12px', color: 'var(--storybook-text-muted)', margin: 0 }}>
            Controls will be added when the component is implemented.
          </p>
        </div>
      );
    }

    // Alert Banner controls (placeholder)
    if (componentName === 'Alert Banner') {
      controls.push(
        <div key="placeholder" className="control-item">
          <label className="control-label">Placeholder Controls</label>
          <p style={{ fontSize: '12px', color: 'var(--storybook-text-muted)', margin: 0 }}>
            Controls will be added when the component is implemented.
          </p>
        </div>
      );
    }

    // Alert Dialog controls (placeholder)
    if (componentName === 'Alert Dialog') {
      controls.push(
        <div key="placeholder" className="control-item">
          <label className="control-label">Placeholder Controls</label>
          <p style={{ fontSize: '12px', color: 'var(--storybook-text-muted)', margin: 0 }}>
            Controls will be added when the component is implemented.
          </p>
        </div>
      );
    }

    // Asset controls (placeholder)
    if (componentName === 'Asset') {
      controls.push(
        <div key="placeholder" className="control-item">
          <label className="control-label">Placeholder Controls</label>
          <p style={{ fontSize: '12px', color: 'var(--storybook-text-muted)', margin: 0 }}>
            Controls will be added when the component is implemented.
          </p>
        </div>
      );
    }

    // Checkbox controls
    if (componentName === 'Checkbox') {
      controls.push(
        <div key="children" className="control-item">
          <label className="control-label">Text</label>
          <input 
            className="control-input"
            type="text" 
            value={props.children || 'Checkbox'} 
            onChange={(e) => updateProp('children', e.target.value)}
          />
        </div>,
        <div key="isChecked" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isChecked || false} 
              onChange={(e) => updateProp('isChecked', e.target.checked)}
            />
            Checked
          </label>
        </div>,
        <div key="isIndeterminate" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isIndeterminate || false} 
              onChange={(e) => updateProp('isIndeterminate', e.target.checked)}
            />
            Indeterminate
          </label>
        </div>,
        <div key="isEmphasized" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isEmphasized || false} 
              onChange={(e) => updateProp('isEmphasized', e.target.checked)}
            />
            Emphasized
          </label>
        </div>,
        <div key="isInvalid" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isInvalid || false} 
              onChange={(e) => updateProp('isInvalid', e.target.checked)}
            />
            Invalid
          </label>
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    // ColorWheel controls
    if (componentName === 'ColorWheel') {
      controls.push(
        <div key="size" className="control-item">
          <label className="control-label">Size</label>
          <select 
            className="control-input"
            value={props.size || 'medium'} 
            onChange={(e) => updateProp('size', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>,
        <div key="hue" className="control-item">
          <label className="control-label">Hue</label>
          <input 
            className="control-input"
            type="range" 
            min="0"
            max="360"
            value={props.value?.hue || 0} 
            onChange={(e) => updateProp('value', { ...props.value, hue: parseInt(e.target.value) })}
          />
          <span className="control-value">{props.value?.hue || 0}°</span>
        </div>,
        <div key="saturation" className="control-item">
          <label className="control-label">Saturation</label>
          <input 
            className="control-input"
            type="range" 
            min="0"
            max="100"
            value={props.value?.saturation || 100} 
            onChange={(e) => updateProp('value', { ...props.value, saturation: parseInt(e.target.value) })}
          />
          <span className="control-value">{props.value?.saturation || 100}%</span>
        </div>,
        <div key="brightness" className="control-item">
          <label className="control-label">Brightness</label>
          <input 
            className="control-input"
            type="range" 
            min="0"
            max="100"
            value={props.value?.value || 100} 
            onChange={(e) => updateProp('value', { ...props.value, value: parseInt(e.target.value) })}
          />
          <span className="control-value">{props.value?.value || 100}%</span>
        </div>,
        <div key="isDisabled" className="control-item">
          <label className="control-label">
            <input 
              className="control-checkbox"
              type="checkbox" 
              checked={props.isDisabled || false} 
              onChange={(e) => updateProp('isDisabled', e.target.checked)}
            />
            Disabled
          </label>
        </div>
      );
    }

    return controls;
  };

  const generateCode = () => {
    if (!componentName) return '';

    let code = `<${componentName}`;
    
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'boolean') {
          if (value) code += `\n  ${key}`;
        } else if (typeof value === 'string') {
          code += `\n  ${key}="${value}"`;
        } else {
          code += `\n  ${key}={${JSON.stringify(value)}}`;
        }
      }
    });

    if (props.children) {
      code += `>\n  ${props.children}\n</${componentName}>`;
    } else {
      code += ' />';
    }

    return code;
  };

  if (!componentName) {
    return <div>Please select a component from the sidebar</div>;
  }

  return (
    <div className="component-view">
      <div className="component-header">
        <h1 className="component-title">{componentName}</h1>
        <p className="component-description">
          {getComponentDescription(componentName)}
        </p>
      </div>
      
      <div className="component-content">
        <div className="component-demo">
          <div className="demo-container">
            {renderComponent()}
          </div>
          
          <div className="code-section">
            <h3 className="code-title">Code</h3>
            <div className="code-container">
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  fontSize: '12px',
                  lineHeight: '1.5'
                }}
              >
                {generateCode()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        
        <div className="component-controls">
          <h3 className="controls-title">Controls</h3>
          {renderControls()}
        </div>
      </div>
    </div>
  );
};

export default ComponentView; 