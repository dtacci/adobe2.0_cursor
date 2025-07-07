const { v4: uuidv4 } = require('uuid');
const componentService = require('../services/componentService');

// Mock data for components (in a real app, this would come from a database)
const mockComponents = [
  {
    id: uuidv4(),
    name: 'Button',
    description: 'Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs.',
    category: 'Actions',
    props: {
      variant: { type: 'string', default: 'primary', options: ['primary', 'secondary', 'accent', 'negative'] },
      size: { type: 'string', default: 'medium', options: ['small', 'medium', 'large'] },
      disabled: { type: 'boolean', default: false },
      children: { type: 'string', default: 'Button' }
    },
    examples: [
      {
        id: uuidv4(),
        title: 'Primary Button',
        code: '<Button variant="primary">Click me</Button>',
        description: 'Standard primary button for main actions'
      }
    ],
    tags: ['interactive', 'form', 'navigation'],
    metadata: {
      version: '1.0.0',
      status: 'stable',
      accessibility: 'WCAG AA compliant'
    },
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-15').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Avatar',
    description: 'Avatars are used to represent a person or entity. They can display an image, initials, or an icon.',
    category: 'Content',
    props: {
      src: { type: 'string', default: '' },
      alt: { type: 'string', default: '' },
      size: { type: 'string', default: 'medium', options: ['small', 'medium', 'large'] },
      initials: { type: 'string', default: '' }
    },
    examples: [
      {
        id: uuidv4(),
        title: 'Avatar with Image',
        code: '<Avatar src="/path/to/image.jpg" alt="User Avatar" />',
        description: 'Avatar displaying a user image'
      },
      {
        id: uuidv4(),
        title: 'Avatar with Initials',
        code: '<Avatar initials="JD" alt="John Doe" />',
        description: 'Avatar displaying user initials'
      }
    ],
    tags: ['user', 'profile', 'image'],
    metadata: {
      version: '1.0.0',
      status: 'stable',
      accessibility: 'WCAG AA compliant'
    },
    created_at: new Date('2024-01-02').toISOString(),
    updated_at: new Date('2024-01-16').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Textfield',
    description: 'Text fields allow users to enter text. They can be used for single-line or multi-line text input.',
    category: 'Forms',
    props: {
      placeholder: { type: 'string', default: '' },
      value: { type: 'string', default: '' },
      disabled: { type: 'boolean', default: false },
      invalid: { type: 'boolean', default: false },
      required: { type: 'boolean', default: false }
    },
    examples: [
      {
        id: uuidv4(),
        title: 'Basic Text Field',
        code: '<Textfield placeholder="Enter your name" />',
        description: 'A basic text input field'
      }
    ],
    tags: ['input', 'form', 'text'],
    metadata: {
      version: '1.0.0',
      status: 'stable',
      accessibility: 'WCAG AA compliant'
    },
    created_at: new Date('2024-01-03').toISOString(),
    updated_at: new Date('2024-01-17').toISOString()
  }
];

// Mock usage data
const mockUsageData = {
  views: 1250,
  downloads: 89,
  implementations: 45,
  trend: '+12%'
};

class ComponentController {
  // GET /api/components - List all components
  async listComponents(req, res) {
    try {
      const { category, search, page = 1, limit = 20, sort = 'name', order = 'asc' } = req.query;
      
      let components = [...mockComponents];
      
      // Filter by category
      if (category) {
        components = components.filter(comp => 
          comp.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Search filter
      if (search) {
        components = components.filter(comp => 
          comp.name.toLowerCase().includes(search.toLowerCase()) ||
          comp.description.toLowerCase().includes(search.toLowerCase()) ||
          comp.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        );
      }
      
      // Sort
      components.sort((a, b) => {
        const aValue = a[sort];
        const bValue = b[sort];
        if (order === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
      
      // Paginate
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedComponents = components.slice(startIndex, endIndex);
      
      res.json({
        components: paginatedComponents,
        pagination: {
          page,
          limit,
          total: components.length,
          pages: Math.ceil(components.length / limit)
        },
        filters: {
          category,
          search,
          sort,
          order
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/:id - Get single component
  async getComponent(req, res) {
    try {
      const { id } = req.params;
      const component = mockComponents.find(comp => comp.id === id);
      
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      res.json(component);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /api/components - Create new component
  async createComponent(req, res) {
    try {
      const { name, description, category, props, examples, tags } = req.body;
      
      // Check if component already exists
      const existingComponent = mockComponents.find(comp => 
        comp.name.toLowerCase() === name.toLowerCase()
      );
      
      if (existingComponent) {
        return res.status(409).json({ error: 'Component already exists' });
      }
      
      const newComponent = {
        id: uuidv4(),
        name,
        description,
        category,
        props: props || {},
        examples: examples || [],
        tags: tags || [],
        metadata: {
          version: '1.0.0',
          status: 'draft',
          accessibility: 'Not assessed'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      mockComponents.push(newComponent);
      
      res.status(201).json(newComponent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/components/:id - Update component
  async updateComponent(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const componentIndex = mockComponents.findIndex(comp => comp.id === id);
      
      if (componentIndex === -1) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      const updatedComponent = {
        ...mockComponents[componentIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      mockComponents[componentIndex] = updatedComponent;
      
      res.json(updatedComponent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE /api/components/:id - Delete component
  async deleteComponent(req, res) {
    try {
      const { id } = req.params;
      const componentIndex = mockComponents.findIndex(comp => comp.id === id);
      
      if (componentIndex === -1) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      mockComponents.splice(componentIndex, 1);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/:id/metadata - Get component metadata
  async getComponentMetadata(req, res) {
    try {
      const { id } = req.params;
      const component = mockComponents.find(comp => comp.id === id);
      
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      res.json(component.metadata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/components/:id/metadata - Update component metadata
  async updateComponentMetadata(req, res) {
    try {
      const { id } = req.params;
      const { metadata } = req.body;
      
      const component = mockComponents.find(comp => comp.id === id);
      
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      component.metadata = { ...component.metadata, ...metadata };
      component.updated_at = new Date().toISOString();
      
      res.json(component.metadata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/:id/usage - Get component usage statistics
  async getComponentUsage(req, res) {
    try {
      const { id } = req.params;
      const { period = 'month' } = req.query;
      
      const component = mockComponents.find(comp => comp.id === id);
      
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      // Mock usage data - in a real app, this would come from analytics
      const usageData = {
        ...mockUsageData,
        period,
        component_id: id,
        component_name: component.name
      };
      
      res.json(usageData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/:id/examples - Get component examples
  async getComponentExamples(req, res) {
    try {
      const { id } = req.params;
      const component = mockComponents.find(comp => comp.id === id);
      
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      res.json(component.examples);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /api/components/:id/examples - Add component example
  async addComponentExample(req, res) {
    try {
      const { id } = req.params;
      const { title, code, description, props } = req.body;
      
      const component = mockComponents.find(comp => comp.id === id);
      
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      
      const newExample = {
        id: uuidv4(),
        title,
        code,
        description,
        props: props || {},
        created_at: new Date().toISOString()
      };
      
      component.examples.push(newExample);
      component.updated_at = new Date().toISOString();
      
      res.status(201).json(newExample);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/categories - Get all categories
  async getCategories(req, res) {
    try {
      const categories = [...new Set(mockComponents.map(comp => comp.category))];
      const categoriesWithCounts = categories.map(category => ({
        name: category,
        count: mockComponents.filter(comp => comp.category === category).length
      }));
      
      res.json(categoriesWithCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/popular - Get popular components
  async getPopularComponents(req, res) {
    try {
      const { limit = 10 } = req.query;
      
      // Mock popularity based on component index (in real app, would use analytics)
      const popularComponents = mockComponents
        .slice(0, limit)
        .map(comp => ({
          ...comp,
          popularity_score: Math.floor(Math.random() * 100) + 1
        }))
        .sort((a, b) => b.popularity_score - a.popularity_score);
      
      res.json(popularComponents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/components/recent - Get recently updated components
  async getRecentComponents(req, res) {
    try {
      const { limit = 10 } = req.query;
      
      const recentComponents = mockComponents
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, limit);
      
      res.json(recentComponents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ComponentController();