const { v4: uuidv4 } = require('uuid');

class ComponentService {
  constructor() {
    // In a real app, this would connect to a database
    this.components = [];
  }

  /**
   * Validate component data
   * @param {Object} componentData - The component data to validate
   * @returns {Object} - Validation result
   */
  validateComponent(componentData) {
    const errors = [];

    if (!componentData.name || typeof componentData.name !== 'string') {
      errors.push('Component name is required and must be a string');
    }

    if (componentData.name && componentData.name.length < 2) {
      errors.push('Component name must be at least 2 characters long');
    }

    if (!componentData.category || typeof componentData.category !== 'string') {
      errors.push('Component category is required and must be a string');
    }

    if (componentData.props && typeof componentData.props !== 'object') {
      errors.push('Component props must be an object');
    }

    if (componentData.examples && !Array.isArray(componentData.examples)) {
      errors.push('Component examples must be an array');
    }

    if (componentData.tags && !Array.isArray(componentData.tags)) {
      errors.push('Component tags must be an array');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Transform component data for API response
   * @param {Object} component - Raw component data
   * @returns {Object} - Transformed component data
   */
  transformComponent(component) {
    return {
      id: component.id,
      name: component.name,
      description: component.description || '',
      category: component.category,
      props: component.props || {},
      examples: component.examples || [],
      tags: component.tags || [],
      metadata: component.metadata || {},
      created_at: component.created_at,
      updated_at: component.updated_at,
      // Computed fields
      example_count: (component.examples || []).length,
      prop_count: Object.keys(component.props || {}).length,
      tag_count: (component.tags || []).length
    };
  }

  /**
   * Generate component slug for URLs
   * @param {string} name - Component name
   * @returns {string} - URL-friendly slug
   */
  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Search components by various criteria
   * @param {Object} criteria - Search criteria
   * @returns {Array} - Filtered components
   */
  searchComponents(components, criteria) {
    let filtered = [...components];

    // Text search in name, description, and tags
    if (criteria.search) {
      const searchTerm = criteria.search.toLowerCase();
      filtered = filtered.filter(component => 
        component.name.toLowerCase().includes(searchTerm) ||
        (component.description && component.description.toLowerCase().includes(searchTerm)) ||
        (component.tags && component.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        ))
      );
    }

    // Category filter
    if (criteria.category) {
      filtered = filtered.filter(component => 
        component.category.toLowerCase() === criteria.category.toLowerCase()
      );
    }

    // Tag filter
    if (criteria.tags) {
      const searchTags = Array.isArray(criteria.tags) 
        ? criteria.tags 
        : criteria.tags.split(',').map(tag => tag.trim());
      
      filtered = filtered.filter(component => 
        component.tags && searchTags.some(searchTag => 
          component.tags.some(componentTag => 
            componentTag.toLowerCase().includes(searchTag.toLowerCase())
          )
        )
      );
    }

    // Status filter
    if (criteria.status) {
      filtered = filtered.filter(component => 
        component.metadata && 
        component.metadata.status === criteria.status
      );
    }

    return filtered;
  }

  /**
   * Sort components by specified field and order
   * @param {Array} components - Components to sort
   * @param {string} sortBy - Field to sort by
   * @param {string} order - Sort order (asc/desc)
   * @returns {Array} - Sorted components
   */
  sortComponents(components, sortBy = 'name', order = 'asc') {
    const sortMultiplier = order === 'desc' ? -1 : 1;

    return components.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'created_at':
        case 'updated_at':
          aValue = new Date(a[sortBy]);
          bValue = new Date(b[sortBy]);
          break;
        case 'popularity':
          // Mock popularity based on some criteria
          aValue = (a.examples?.length || 0) + (a.tags?.length || 0);
          bValue = (b.examples?.length || 0) + (b.tags?.length || 0);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (aValue < bValue) return -1 * sortMultiplier;
      if (aValue > bValue) return 1 * sortMultiplier;
      return 0;
    });
  }

  /**
   * Paginate components array
   * @param {Array} components - Components to paginate
   * @param {number} page - Page number (1-based)
   * @param {number} limit - Items per page
   * @returns {Object} - Paginated result
   */
  paginateComponents(components, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const paginatedItems = components.slice(offset, offset + limit);
    
    return {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total: components.length,
        pages: Math.ceil(components.length / limit),
        has_next: offset + limit < components.length,
        has_prev: page > 1
      }
    };
  }

  /**
   * Get component usage statistics
   * @param {string} componentId - Component ID
   * @param {string} period - Time period (day, week, month, year)
   * @returns {Object} - Usage statistics
   */
  getUsageStats(componentId, period = 'month') {
    // Mock usage statistics - in a real app, this would query analytics data
    const baseViews = Math.floor(Math.random() * 1000) + 100;
    const multiplier = {
      day: 0.1,
      week: 0.3,
      month: 1,
      year: 12
    }[period] || 1;

    return {
      component_id: componentId,
      period,
      views: Math.floor(baseViews * multiplier),
      unique_users: Math.floor(baseViews * multiplier * 0.3),
      copies: Math.floor(baseViews * multiplier * 0.1),
      downloads: Math.floor(baseViews * multiplier * 0.05),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trend_percentage: Math.floor(Math.random() * 20) + 1,
      last_updated: new Date().toISOString()
    };
  }

  /**
   * Generate component code example
   * @param {Object} component - Component data
   * @param {Object} props - Props to include in example
   * @returns {string} - Generated code example
   */
  generateCodeExample(component, props = {}) {
    const componentName = component.name;
    const propStrings = [];

    // Add props to the example
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === 'string') {
        propStrings.push(`${key}="${value}"`);
      } else if (typeof value === 'boolean') {
        propStrings.push(value ? key : `${key}={false}`);
      } else {
        propStrings.push(`${key}={${JSON.stringify(value)}}`);
      }
    });

    const propsString = propStrings.length > 0 ? ` ${propStrings.join(' ')}` : '';
    
    // Check if component typically has children
    const hasChildren = component.props && 
      Object.keys(component.props).includes('children');

    if (hasChildren) {
      const childrenText = props.children || componentName;
      return `<${componentName}${propsString}>\n  ${childrenText}\n</${componentName}>`;
    } else {
      return `<${componentName}${propsString} />`;
    }
  }

  /**
   * Extract unique categories from components
   * @param {Array} components - Array of components
   * @returns {Array} - Array of unique categories with counts
   */
  extractCategories(components) {
    const categoryMap = {};
    
    components.forEach(component => {
      const category = component.category;
      if (categoryMap[category]) {
        categoryMap[category]++;
      } else {
        categoryMap[category] = 1;
      }
    });

    return Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Extract unique tags from components
   * @param {Array} components - Array of components
   * @returns {Array} - Array of unique tags with counts
   */
  extractTags(components) {
    const tagMap = {};
    
    components.forEach(component => {
      if (component.tags && Array.isArray(component.tags)) {
        component.tags.forEach(tag => {
          if (tagMap[tag]) {
            tagMap[tag]++;
          } else {
            tagMap[tag] = 1;
          }
        });
      }
    });

    return Object.entries(tagMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Find related components based on category and tags
   * @param {Object} component - Target component
   * @param {Array} allComponents - All available components
   * @param {number} limit - Maximum number of related components
   * @returns {Array} - Array of related components
   */
  findRelatedComponents(component, allComponents, limit = 5) {
    const related = allComponents
      .filter(c => c.id !== component.id)
      .map(c => {
        let score = 0;
        
        // Same category gets higher score
        if (c.category === component.category) {
          score += 10;
        }
        
        // Shared tags get additional score
        if (component.tags && c.tags) {
          const sharedTags = component.tags.filter(tag => 
            c.tags.includes(tag)
          );
          score += sharedTags.length * 3;
        }
        
        return { ...c, similarity_score: score };
      })
      .filter(c => c.similarity_score > 0)
      .sort((a, b) => b.similarity_score - a.similarity_score)
      .slice(0, limit);

    return related;
  }

  /**
   * Validate component example
   * @param {Object} example - Example to validate
   * @returns {Object} - Validation result
   */
  validateExample(example) {
    const errors = [];

    if (!example.title || typeof example.title !== 'string') {
      errors.push('Example title is required and must be a string');
    }

    if (!example.code || typeof example.code !== 'string') {
      errors.push('Example code is required and must be a string');
    }

    if (example.description && typeof example.description !== 'string') {
      errors.push('Example description must be a string');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = new ComponentService();