const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const componentController = require('../../controllers/componentController');

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

// GET /api/components - List all components
router.get('/', 
  [
    query('category').optional().isString().trim(),
    query('search').optional().isString().trim(),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('sort').optional().isIn(['name', 'category', 'created_at', 'updated_at']),
    query('order').optional().isIn(['asc', 'desc']),
  ],
  validateRequest,
  componentController.listComponents
);

// GET /api/components/:id - Get single component
router.get('/:id',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
  ],
  validateRequest,
  componentController.getComponent
);

// POST /api/components - Create new component
router.post('/',
  [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('description').optional().isString().trim(),
    body('category').isString().trim().notEmpty().withMessage('Category is required'),
    body('props').optional().isObject(),
    body('examples').optional().isArray(),
    body('tags').optional().isArray(),
  ],
  validateRequest,
  componentController.createComponent
);

// PUT /api/components/:id - Update component
router.put('/:id',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
    body('name').optional().isString().trim().notEmpty(),
    body('description').optional().isString().trim(),
    body('category').optional().isString().trim().notEmpty(),
    body('props').optional().isObject(),
    body('examples').optional().isArray(),
    body('tags').optional().isArray(),
  ],
  validateRequest,
  componentController.updateComponent
);

// DELETE /api/components/:id - Delete component
router.delete('/:id',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
  ],
  validateRequest,
  componentController.deleteComponent
);

// GET /api/components/:id/metadata - Get component metadata
router.get('/:id/metadata',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
  ],
  validateRequest,
  componentController.getComponentMetadata
);

// PUT /api/components/:id/metadata - Update component metadata
router.put('/:id/metadata',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
    body('metadata').isObject().withMessage('Metadata must be an object'),
  ],
  validateRequest,
  componentController.updateComponentMetadata
);

// GET /api/components/:id/usage - Get component usage statistics
router.get('/:id/usage',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
  ],
  validateRequest,
  componentController.getComponentUsage
);

// GET /api/components/:id/examples - Get component examples
router.get('/:id/examples',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
  ],
  validateRequest,
  componentController.getComponentExamples
);

// POST /api/components/:id/examples - Add component example
router.post('/:id/examples',
  [
    param('id').isUUID().withMessage('Invalid component ID'),
    body('title').isString().trim().notEmpty().withMessage('Title is required'),
    body('code').isString().trim().notEmpty().withMessage('Code is required'),
    body('description').optional().isString().trim(),
    body('props').optional().isObject(),
  ],
  validateRequest,
  componentController.addComponentExample
);

// GET /api/components/categories - Get all categories
router.get('/categories/list', componentController.getCategories);

// GET /api/components/popular - Get popular components
router.get('/popular/list', 
  [
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  ],
  validateRequest,
  componentController.getPopularComponents
);

// GET /api/components/recent - Get recently updated components
router.get('/recent/list',
  [
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  ],
  validateRequest,
  componentController.getRecentComponents
);

module.exports = router;