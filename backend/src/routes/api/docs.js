const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array(),
    });
  }
  next();
};

// Mock documentation data
const mockDocs = {
  'button': {
    id: 'button',
    component_name: 'Button',
    overview: 'Buttons allow users to perform an action or to navigate to another page.',
    usage_guidelines: [
      'Use primary buttons for the most important actions',
      'Limit to one primary button per page or dialog',
      'Use secondary buttons for less important actions',
      'Provide clear, action-oriented labels'
    ],
    accessibility: {
      description: 'Buttons are fully keyboard accessible and screen reader compatible',
      guidelines: [
        'All buttons must have accessible names',
        'Use aria-labels for icon-only buttons',
        'Ensure sufficient color contrast',
        'Support keyboard navigation'
      ],
      wcag_compliance: 'AA'
    },
    props: [
      {
        name: 'variant',
        type: 'string',
        default: 'primary',
        options: ['primary', 'secondary', 'accent', 'negative'],
        description: 'The visual style variant of the button'
      },
      {
        name: 'size',
        type: 'string',
        default: 'medium',
        options: ['small', 'medium', 'large'],
        description: 'The size of the button'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        description: 'Whether the button is disabled'
      }
    ],
    examples: [
      {
        title: 'Primary Button',
        description: 'The main call-to-action button',
        code: '<Button variant="primary">Save Changes</Button>'
      },
      {
        title: 'Secondary Button',
        description: 'Secondary actions',
        code: '<Button variant="secondary">Cancel</Button>'
      }
    ],
    design_tokens: {
      colors: ['--spectrum-button-primary-background-color', '--spectrum-button-primary-border-color'],
      spacing: ['--spectrum-button-padding-x', '--spectrum-button-padding-y'],
      typography: ['--spectrum-button-font-size', '--spectrum-button-font-weight']
    },
    related_components: ['ActionButton', 'Link'],
    changelog: [
      {
        version: '1.2.0',
        date: '2024-01-15',
        changes: ['Added negative variant', 'Improved accessibility']
      },
      {
        version: '1.1.0',
        date: '2024-01-01',
        changes: ['Added large size option', 'Fixed focus styles']
      }
    ],
    last_updated: '2024-01-15T10:30:00Z'
  }
};

// GET /api/docs - List all component documentation
router.get('/',
  [
    query('search').optional().isString().trim(),
    query('category').optional().isString().trim(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { search, category } = req.query;
      
      // In a real app, this would query the database
      let docs = Object.values(mockDocs);
      
      // Apply filters
      if (search) {
        docs = docs.filter(doc => 
          doc.component_name.toLowerCase().includes(search.toLowerCase()) ||
          doc.overview.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      res.json({
        docs: docs.map(doc => ({
          id: doc.id,
          component_name: doc.component_name,
          overview: doc.overview,
          last_updated: doc.last_updated
        })),
        total: docs.length,
        filters: { search, category }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/docs/:componentId - Get documentation for a specific component
router.get('/:componentId',
  [
    param('componentId').isString().trim().notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      res.json(doc);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// PUT /api/docs/:componentId - Update component documentation
router.put('/:componentId',
  [
    param('componentId').isString().trim().notEmpty(),
    body('overview').optional().isString().trim(),
    body('usage_guidelines').optional().isArray(),
    body('accessibility').optional().isObject(),
    body('props').optional().isArray(),
    body('examples').optional().isArray(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const updates = req.body;
      
      let doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        // Create new documentation
        doc = {
          id: componentId.toLowerCase(),
          component_name: componentId,
          overview: '',
          usage_guidelines: [],
          accessibility: {},
          props: [],
          examples: [],
          design_tokens: {},
          related_components: [],
          changelog: [],
          last_updated: new Date().toISOString()
        };
      }
      
      // Update documentation
      const updatedDoc = {
        ...doc,
        ...updates,
        last_updated: new Date().toISOString()
      };
      
      mockDocs[componentId.toLowerCase()] = updatedDoc;
      
      res.json(updatedDoc);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/docs/:componentId/accessibility - Get accessibility documentation
router.get('/:componentId/accessibility',
  [
    param('componentId').isString().trim().notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      res.json(doc.accessibility);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/docs/:componentId/props - Get component props documentation
router.get('/:componentId/props',
  [
    param('componentId').isString().trim().notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      res.json({
        component_name: doc.component_name,
        props: doc.props
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/docs/:componentId/examples - Get component examples
router.get('/:componentId/examples',
  [
    param('componentId').isString().trim().notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      res.json({
        component_name: doc.component_name,
        examples: doc.examples
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /api/docs/:componentId/examples - Add example to component documentation
router.post('/:componentId/examples',
  [
    param('componentId').isString().trim().notEmpty(),
    body('title').isString().trim().notEmpty(),
    body('description').optional().isString().trim(),
    body('code').isString().trim().notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const { title, description, code } = req.body;
      
      let doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      const newExample = {
        id: require('uuid').v4(),
        title,
        description: description || '',
        code,
        created_at: new Date().toISOString()
      };
      
      doc.examples.push(newExample);
      doc.last_updated = new Date().toISOString();
      
      res.status(201).json(newExample);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/docs/:componentId/changelog - Get component changelog
router.get('/:componentId/changelog',
  [
    param('componentId').isString().trim().notEmpty(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      res.json({
        component_name: doc.component_name,
        changelog: doc.changelog
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /api/docs/:componentId/changelog - Add changelog entry
router.post('/:componentId/changelog',
  [
    param('componentId').isString().trim().notEmpty(),
    body('version').isString().trim().notEmpty(),
    body('changes').isArray().notEmpty(),
    body('date').optional().isISO8601(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      const { version, changes, date } = req.body;
      
      let doc = mockDocs[componentId.toLowerCase()];
      
      if (!doc) {
        return res.status(404).json({ error: 'Documentation not found' });
      }
      
      const changelogEntry = {
        version,
        date: date || new Date().toISOString().split('T')[0],
        changes
      };
      
      doc.changelog.unshift(changelogEntry); // Add to beginning
      doc.last_updated = new Date().toISOString();
      
      res.status(201).json(changelogEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/docs/search - Search documentation
router.get('/search/query',
  [
    query('q').isString().trim().notEmpty().withMessage('Search query required'),
    query('type').optional().isIn(['overview', 'props', 'examples', 'accessibility']),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { q, type } = req.query;
      
      const results = [];
      
      Object.values(mockDocs).forEach(doc => {
        const matches = [];
        
        // Search in overview
        if (!type || type === 'overview') {
          if (doc.overview.toLowerCase().includes(q.toLowerCase())) {
            matches.push({
              type: 'overview',
              content: doc.overview,
              highlight: true
            });
          }
        }
        
        // Search in props
        if (!type || type === 'props') {
          doc.props.forEach(prop => {
            if (prop.name.toLowerCase().includes(q.toLowerCase()) || 
                prop.description.toLowerCase().includes(q.toLowerCase())) {
              matches.push({
                type: 'prop',
                content: prop,
                highlight: true
              });
            }
          });
        }
        
        // Search in examples
        if (!type || type === 'examples') {
          doc.examples.forEach(example => {
            if (example.title.toLowerCase().includes(q.toLowerCase()) ||
                example.code.toLowerCase().includes(q.toLowerCase())) {
              matches.push({
                type: 'example',
                content: example,
                highlight: true
              });
            }
          });
        }
        
        if (matches.length > 0) {
          results.push({
            component: {
              id: doc.id,
              name: doc.component_name
            },
            matches
          });
        }
      });
      
      res.json({
        query: q,
        type: type || 'all',
        results,
        total_results: results.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;