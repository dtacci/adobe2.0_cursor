const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
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

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, SVGs, and JSON files
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'application/json',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, SVGs, and JSON files are allowed.'));
    }
  }
});

// Mock assets database
const mockAssets = [
  {
    id: uuidv4(),
    filename: 'spectrum-logo.svg',
    original_name: 'spectrum-logo.svg',
    mimetype: 'image/svg+xml',
    size: 2048,
    component_id: null,
    category: 'brand',
    tags: ['logo', 'brand', 'svg'],
    metadata: {
      width: 100,
      height: 40,
      color_scheme: 'light'
    },
    url: '/assets/spectrum-logo.svg',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: uuidv4(),
    filename: 'button-states.png',
    original_name: 'button-states-example.png',
    mimetype: 'image/png',
    size: 15632,
    component_id: 'button-component-id',
    category: 'example',
    tags: ['button', 'states', 'example'],
    metadata: {
      width: 400,
      height: 200,
      description: 'Visual example of button states'
    },
    url: '/assets/button-states.png',
    created_at: '2024-01-02T14:30:00Z',
    updated_at: '2024-01-02T14:30:00Z'
  }
];

// GET /api/assets - List all assets
router.get('/',
  [
    query('category').optional().isString().trim(),
    query('component_id').optional().isUUID(),
    query('tags').optional().isString().trim(),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { category, component_id, tags, page = 1, limit = 20 } = req.query;
      
      let assets = [...mockAssets];
      
      // Apply filters
      if (category) {
        assets = assets.filter(asset => asset.category === category);
      }
      
      if (component_id) {
        assets = assets.filter(asset => asset.component_id === component_id);
      }
      
      if (tags) {
        const tagList = tags.split(',').map(tag => tag.trim().toLowerCase());
        assets = assets.filter(asset => 
          asset.tags.some(tag => tagList.includes(tag.toLowerCase()))
        );
      }
      
      // Paginate
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAssets = assets.slice(startIndex, endIndex);
      
      res.json({
        assets: paginatedAssets,
        pagination: {
          page,
          limit,
          total: assets.length,
          pages: Math.ceil(assets.length / limit)
        },
        filters: { category, component_id, tags }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/assets/:id - Get single asset
router.get('/:id',
  [
    param('id').isUUID().withMessage('Valid asset ID required'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const asset = mockAssets.find(a => a.id === id);
      
      if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
      }
      
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /api/assets/upload - Upload new asset
router.post('/upload',
  upload.single('file'),
  [
    body('category').optional().isString().trim(),
    body('component_id').optional().isUUID(),
    body('tags').optional().isString().trim(),
    body('metadata').optional().isJSON(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const { category = 'general', component_id, tags, metadata } = req.body;
      
      // Generate unique filename
      const fileExtension = path.extname(req.file.originalname);
      const filename = `${uuidv4()}${fileExtension}`;
      
      // Parse tags
      const tagList = tags ? tags.split(',').map(tag => tag.trim()) : [];
      
      // Parse metadata
      let parsedMetadata = {};
      if (metadata) {
        try {
          parsedMetadata = JSON.parse(metadata);
        } catch (e) {
          return res.status(400).json({ error: 'Invalid metadata JSON' });
        }
      }
      
      // Add image dimensions for images
      if (req.file.mimetype.startsWith('image/')) {
        // In a real app, you'd use a library like sharp to get image dimensions
        parsedMetadata.width = parsedMetadata.width || 100;
        parsedMetadata.height = parsedMetadata.height || 100;
      }
      
      const newAsset = {
        id: uuidv4(),
        filename,
        original_name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        component_id: component_id || null,
        category,
        tags: tagList,
        metadata: parsedMetadata,
        url: `/assets/${filename}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // In a real app, you'd save the file to storage (S3, local filesystem, etc.)
      console.log('File would be saved:', {
        filename,
        originalname: req.file.originalname,
        size: req.file.size,
        buffer: req.file.buffer.length + ' bytes'
      });
      
      mockAssets.push(newAsset);
      
      res.status(201).json(newAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// PUT /api/assets/:id - Update asset metadata
router.put('/:id',
  [
    param('id').isUUID().withMessage('Valid asset ID required'),
    body('category').optional().isString().trim(),
    body('component_id').optional().isUUID(),
    body('tags').optional().isString().trim(),
    body('metadata').optional().isObject(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const assetIndex = mockAssets.findIndex(a => a.id === id);
      
      if (assetIndex === -1) {
        return res.status(404).json({ error: 'Asset not found' });
      }
      
      // Parse tags if provided
      if (updates.tags) {
        updates.tags = updates.tags.split(',').map(tag => tag.trim());
      }
      
      const updatedAsset = {
        ...mockAssets[assetIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      mockAssets[assetIndex] = updatedAsset;
      
      res.json(updatedAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// DELETE /api/assets/:id - Delete asset
router.delete('/:id',
  [
    param('id').isUUID().withMessage('Valid asset ID required'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const assetIndex = mockAssets.findIndex(a => a.id === id);
      
      if (assetIndex === -1) {
        return res.status(404).json({ error: 'Asset not found' });
      }
      
      const asset = mockAssets[assetIndex];
      
      // In a real app, you'd delete the file from storage
      console.log('File would be deleted:', asset.filename);
      
      mockAssets.splice(assetIndex, 1);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/assets/categories - Get asset categories
router.get('/categories/list',
  async (req, res) => {
    try {
      const categories = [...new Set(mockAssets.map(asset => asset.category))];
      const categoriesWithCounts = categories.map(category => ({
        name: category,
        count: mockAssets.filter(asset => asset.category === category).length
      }));
      
      res.json(categoriesWithCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/assets/tags - Get all tags
router.get('/tags/list',
  async (req, res) => {
    try {
      const allTags = mockAssets.flatMap(asset => asset.tags);
      const tagCounts = {};
      
      allTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
      
      const tagsWithCounts = Object.entries(tagCounts).map(([tag, count]) => ({
        name: tag,
        count
      }));
      
      res.json(tagsWithCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/assets/components/:componentId - Get assets for specific component
router.get('/components/:componentId',
  [
    param('componentId').isUUID().withMessage('Valid component ID required'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { componentId } = req.params;
      
      const componentAssets = mockAssets.filter(asset => 
        asset.component_id === componentId
      );
      
      res.json({
        component_id: componentId,
        assets: componentAssets,
        total: componentAssets.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /api/assets/bulk-upload - Upload multiple assets
router.post('/bulk-upload',
  upload.array('files', 10), // Max 10 files
  [
    body('category').optional().isString().trim(),
    body('component_id').optional().isUUID(),
    body('tags').optional().isString().trim(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
      
      const { category = 'general', component_id, tags } = req.body;
      const tagList = tags ? tags.split(',').map(tag => tag.trim()) : [];
      
      const uploadedAssets = [];
      
      for (const file of req.files) {
        const fileExtension = path.extname(file.originalname);
        const filename = `${uuidv4()}${fileExtension}`;
        
        const newAsset = {
          id: uuidv4(),
          filename,
          original_name: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          component_id: component_id || null,
          category,
          tags: tagList,
          metadata: {},
          url: `/assets/${filename}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        mockAssets.push(newAsset);
        uploadedAssets.push(newAsset);
        
        console.log('File would be saved:', {
          filename,
          originalname: file.originalname,
          size: file.size
        });
      }
      
      res.status(201).json({
        message: `${uploadedAssets.length} files uploaded successfully`,
        assets: uploadedAssets
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Error handler for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 10 files.' });
    }
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
});

module.exports = router;