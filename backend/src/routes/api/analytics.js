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

// Mock analytics data
const mockAnalytics = {
  totalViews: 15420,
  totalComponents: 67,
  activeUsers: 234,
  popularCategories: [
    { name: 'Actions', views: 4230, percentage: 27.4 },
    { name: 'Forms', views: 3810, percentage: 24.7 },
    { name: 'Content', views: 3200, percentage: 20.8 },
    { name: 'Navigation', views: 2180, percentage: 14.1 },
    { name: 'Feedback', views: 2000, percentage: 13.0 }
  ],
  topComponents: [
    { name: 'Button', views: 2100, trend: '+15%' },
    { name: 'Textfield', views: 1890, trend: '+8%' },
    { name: 'Avatar', views: 1650, trend: '+22%' },
    { name: 'Menu', views: 1420, trend: '+5%' },
    { name: 'Badge', views: 1100, trend: '+12%' }
  ],
  usageOverTime: [
    { date: '2024-01-01', views: 450 },
    { date: '2024-01-02', views: 520 },
    { date: '2024-01-03', views: 380 },
    { date: '2024-01-04', views: 690 },
    { date: '2024-01-05', views: 750 },
    { date: '2024-01-06', views: 620 },
    { date: '2024-01-07', views: 580 }
  ]
};

// POST /api/analytics/track - Track component view
router.post('/track',
  [
    body('component_id').isUUID().withMessage('Valid component ID required'),
    body('event_type').isIn(['view', 'copy', 'download']).withMessage('Valid event type required'),
    body('user_id').optional().isUUID(),
    body('metadata').optional().isObject(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { component_id, event_type, user_id, metadata } = req.body;
      
      // In a real app, this would save to database
      const trackingEvent = {
        id: require('uuid').v4(),
        component_id,
        event_type,
        user_id,
        metadata: metadata || {},
        timestamp: new Date().toISOString(),
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      };
      
      console.log('Tracking event:', trackingEvent);
      
      res.status(201).json({
        message: 'Event tracked successfully',
        event_id: trackingEvent.id
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/analytics/overview - Get analytics overview
router.get('/overview',
  [
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { period = 'month' } = req.query;
      
      // Mock data - in real app, would query from database
      const overview = {
        ...mockAnalytics,
        period,
        last_updated: new Date().toISOString()
      };
      
      res.json(overview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/analytics/components/popular - Get popular components
router.get('/components/popular',
  [
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { limit = 10, period = 'month' } = req.query;
      
      const popularComponents = mockAnalytics.topComponents
        .slice(0, limit)
        .map(comp => ({
          ...comp,
          period
        }));
      
      res.json(popularComponents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/analytics/categories - Get category analytics
router.get('/categories',
  [
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { period = 'month' } = req.query;
      
      const categoryAnalytics = {
        categories: mockAnalytics.popularCategories,
        period,
        total_views: mockAnalytics.totalViews,
        last_updated: new Date().toISOString()
      };
      
      res.json(categoryAnalytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/analytics/usage/timeline - Get usage timeline
router.get('/usage/timeline',
  [
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
    query('component_id').optional().isUUID(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { period = 'week', component_id } = req.query;
      
      let timelineData = mockAnalytics.usageOverTime;
      
      // Filter by component if specified
      if (component_id) {
        // In real app, would filter by component
        timelineData = timelineData.map(item => ({
          ...item,
          component_id,
          views: Math.floor(item.views * 0.3) // Mock component-specific data
        }));
      }
      
      res.json({
        timeline: timelineData,
        period,
        component_id: component_id || 'all',
        total_points: timelineData.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/analytics/components/:id/stats - Get specific component analytics
router.get('/components/:id/stats',
  [
    param('id').isUUID().withMessage('Valid component ID required'),
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { period = 'month' } = req.query;
      
      // Mock component-specific analytics
      const componentStats = {
        component_id: id,
        period,
        views: Math.floor(Math.random() * 2000) + 500,
        unique_users: Math.floor(Math.random() * 150) + 50,
        copies: Math.floor(Math.random() * 100) + 20,
        downloads: Math.floor(Math.random() * 50) + 5,
        trend: Math.random() > 0.5 ? `+${Math.floor(Math.random() * 25) + 1}%` : `-${Math.floor(Math.random() * 10) + 1}%`,
        top_properties_used: [
          { property: 'variant', usage_count: 450 },
          { property: 'size', usage_count: 380 },
          { property: 'disabled', usage_count: 120 }
        ],
        usage_by_day: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          views: Math.floor(Math.random() * 100) + 20
        })),
        last_updated: new Date().toISOString()
      };
      
      res.json(componentStats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/analytics/search - Get search analytics
router.get('/search',
  [
    query('period').optional().isIn(['day', 'week', 'month', 'year']),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { period = 'month' } = req.query;
      
      const searchAnalytics = {
        top_searches: [
          { term: 'button', count: 145 },
          { term: 'form', count: 98 },
          { term: 'input', count: 87 },
          { term: 'navigation', count: 65 },
          { term: 'modal', count: 54 }
        ],
        total_searches: 1247,
        unique_searches: 892,
        no_results_searches: 23,
        period,
        last_updated: new Date().toISOString()
      };
      
      res.json(searchAnalytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// DELETE /api/analytics/data - Clear analytics data (admin only)
router.delete('/data',
  async (req, res) => {
    try {
      // In a real app, this would require admin authentication
      // and would clear analytics data from database
      
      console.log('Analytics data cleared by admin');
      
      res.json({
        message: 'Analytics data cleared successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;