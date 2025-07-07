const express = require('express');
const router = express.Router();

// Import route modules
const componentsRoutes = require('./api/components');
const analyticsRoutes = require('./api/analytics');
const docsRoutes = require('./api/docs');
const assetsRoutes = require('./api/assets');

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Adobe Spectrum Backend API',
    version: '1.0.0',
    endpoints: {
      components: '/api/components',
      analytics: '/api/analytics',
      docs: '/api/docs',
      assets: '/api/assets',
    },
    documentation: 'https://spectrum.adobe.com/api-docs',
  });
});

// Mount route modules
router.use('/components', componentsRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/docs', docsRoutes);
router.use('/assets', assetsRoutes);

module.exports = router;