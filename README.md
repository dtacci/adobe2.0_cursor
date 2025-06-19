# Adobe Spectrum Components React App

A faithful recreation of Adobe's Spectrum Design System components built with React. This project provides a comprehensive library of Spectrum components with proper styling, theming, and interactive functionality.

## 🌐 Live Demo

**[View Live Demo →](https://adobe2-0-cursor.vercel.app)**

Experience the components in action with our interactive demo site featuring all available components, themes, and scales. Test the complete Adobe Spectrum component library with real-time theme switching and responsive design.

## 🎨 Features

- **Complete Spectrum Component Library** - Faithful recreations of Adobe Spectrum components
- **Theme Support** - Light and dark themes with proper token-based styling
- **Scale Support** - Medium and large scale options
- **Interactive Documentation** - Live component demos with code examples
- **Responsive Design** - Mobile-friendly responsive layout
- **Modern React** - Built with React 18 and modern hooks

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dtacci/adobe2.0_cursor.git
cd adobe2.0_cursor

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📚 Available Components

### Form Controls
- **Button** - Primary, secondary, and accent button variants
- **Textfield** - Standard text input with validation states
- **Checkbox** - Boolean selection with indeterminate state
- **Radio** - Single selection from a group
- **Switch** - Binary toggle control
- **Slider** - Range selection with multiple handles
- **Search** - Specialized text input for search functionality

### Navigation
- **Link** - Text links with proper styling
- **Menu** - Dropdown and context menus
- **Picker** - Dropdown selection component

### Data Display
- **Badge** - Status indicators and labels
- **Progress Bar** - Linear progress indication
- **Toast** - Temporary notification messages
- **Divider** - Content separation

### Color Tools
- **Color Field** - Hex color input
- **Color Area** - 2D color picker area
- **Color Slider** - 1D color selection
- **Color Wheel** - Circular color picker
- **Color Picker** - Complete color selection interface

### Layout & Structure
- **Icon** - Spectrum icon system
- **Action Button** - Icon-based action triggers

### Form Components
- **Combobox** - Searchable dropdown selection

## 🎛️ Theme Configuration

The app supports Adobe Spectrum's theming system:

### Themes
- **Light Theme** - Default light appearance
- **Dark Theme** - High contrast dark appearance

### Scales
- **Medium Scale** - Standard component sizing
- **Large Scale** - Increased sizing for accessibility

## 🏗️ Project Structure

```
src/
├── components/
│   ├── spectrum/          # Individual Spectrum components
│   │   ├── Button.js
│   │   ├── Button.css
│   │   └── ...
│   ├── ComponentView.js   # Component documentation viewer
│   └── Sidebar.js        # Navigation sidebar
├── pages/
│   └── HomePage.js       # Landing page
├── styles/
│   ├── spectrum-tokens.css # Design tokens
│   └── App.css            # Application styles
└── App.js                # Main application component
```

## 🎨 Design Tokens

The project uses Adobe Spectrum design tokens for:
- Colors (semantic and base)
- Typography scales
- Spacing system
- Border radius values
- Animation durations
- Component dimensions

## 🔧 Development

### Adding New Components

1. Create component files in `src/components/spectrum/`
2. Follow the naming convention: `ComponentName.js` and `ComponentName.css`
3. Add the component to the navigation in `App.js`
4. Update the component viewer in `ComponentView.js`

### CSS Architecture

- Each component has its own CSS file
- Uses CSS custom properties for theming
- Follows Spectrum design token naming conventions
- Responsive design with mobile-first approach

## 📖 Component Documentation

Each component includes:
- **Live Demo** - Interactive component preview
- **Code Examples** - Copy-paste ready code snippets
- **Props Documentation** - Available properties and usage
- **Variants** - Different component states and styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-component`)
3. Commit your changes (`git commit -am 'Add new component'`)
4. Push to the branch (`git push origin feature/new-component`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 References

- [Adobe Spectrum Design System](https://spectrum.adobe.com/)
- [Spectrum CSS](https://opensource.adobe.com/spectrum-css/)
- [React Documentation](https://reactjs.org/)

## 🚧 Roadmap

- [ ] 📦 Add remaining Spectrum components
- [ ] ♿ Implement accessibility features (ARIA, keyboard navigation)
- [ ] ✅ Add component prop validation
- [ ] 📚 Create Storybook integration
- [ ] 🧪 Add unit tests
- [ ] ✨ Implement animations and transitions
- [ ] 🔷 Add TypeScript support 