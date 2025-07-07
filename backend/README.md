# Adobe Spectrum Backend API

Backend API for the Adobe Spectrum Components React App. This API provides endpoints for managing components, documentation, analytics, and assets.

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

The API will be available at `http://localhost:3001`

### Production Setup

```bash
# Install dependencies
npm install --production

# Set NODE_ENV to production
export NODE_ENV=production

# Start server
npm start
```

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:3001/api`
- Production: `https://your-domain.com/api`

### Health Check
```http
GET /health
```

### API Information
```http
GET /api
```

## 🧩 Components API

### List Components
```http
GET /api/components
```

**Query Parameters:**
- `category` (string) - Filter by category
- `search` (string) - Search in name, description, tags
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 20, max: 100)
- `sort` (string) - Sort field: name, category, created_at, updated_at
- `order` (string) - Sort order: asc, desc

**Response:**
```json
{
  "components": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 67,
    "pages": 4
  },
  "filters": {
    "category": "Actions",
    "search": "button"
  }
}
```

### Get Component
```http
GET /api/components/:id
```

### Create Component
```http
POST /api/components
Content-Type: application/json

{
  "name": "Button",
  "description": "A clickable button component",
  "category": "Actions",
  "props": {
    "variant": {
      "type": "string",
      "default": "primary",
      "options": ["primary", "secondary"]
    }
  },
  "examples": [...],
  "tags": ["interactive", "form"]
}
```

### Update Component
```http
PUT /api/components/:id
Content-Type: application/json

{
  "description": "Updated description",
  "tags": ["interactive", "form", "button"]
}
```

### Delete Component
```http
DELETE /api/components/:id
```

### Component Metadata
```http
GET /api/components/:id/metadata
PUT /api/components/:id/metadata
```

### Component Usage Statistics
```http
GET /api/components/:id/usage?period=month
```

### Component Examples
```http
GET /api/components/:id/examples
POST /api/components/:id/examples
```

### Get Categories
```http
GET /api/components/categories/list
```

### Popular Components
```http
GET /api/components/popular/list?limit=10
```

### Recent Components
```http
GET /api/components/recent/list?limit=10
```

## 📊 Analytics API

### Track Events
```http
POST /api/analytics/track
Content-Type: application/json

{
  "component_id": "uuid",
  "event_type": "view",
  "user_id": "uuid",
  "metadata": {}
}
```

### Analytics Overview
```http
GET /api/analytics/overview?period=month
```

### Popular Components Analytics
```http
GET /api/analytics/components/popular?limit=10&period=month
```

### Category Analytics
```http
GET /api/analytics/categories?period=month
```

### Usage Timeline
```http
GET /api/analytics/usage/timeline?period=week&component_id=uuid
```

### Component Statistics
```http
GET /api/analytics/components/:id/stats?period=month
```

### Search Analytics
```http
GET /api/analytics/search?period=month
```

## 📚 Documentation API

### List Documentation
```http
GET /api/docs?search=button&category=Actions
```

### Get Component Documentation
```http
GET /api/docs/:componentId
```

### Update Documentation
```http
PUT /api/docs/:componentId
Content-Type: application/json

{
  "overview": "Updated overview",
  "usage_guidelines": [...],
  "accessibility": {...},
  "props": [...],
  "examples": [...]
}
```

### Accessibility Documentation
```http
GET /api/docs/:componentId/accessibility
```

### Props Documentation
```http
GET /api/docs/:componentId/props
```

### Examples Documentation
```http
GET /api/docs/:componentId/examples
POST /api/docs/:componentId/examples
```

### Changelog
```http
GET /api/docs/:componentId/changelog
POST /api/docs/:componentId/changelog
```

### Search Documentation
```http
GET /api/docs/search/query?q=button&type=overview
```

## 🗂️ Assets API

### List Assets
```http
GET /api/assets?category=brand&component_id=uuid&tags=logo,icon
```

### Get Asset
```http
GET /api/assets/:id
```

### Upload Asset
```http
POST /api/assets/upload
Content-Type: multipart/form-data

{
  "file": [File],
  "category": "example",
  "component_id": "uuid",
  "tags": "button,states,example",
  "metadata": "{\"width\": 400, \"height\": 200}"
}
```

### Update Asset
```http
PUT /api/assets/:id
Content-Type: application/json

{
  "category": "updated-category",
  "tags": "new,tags",
  "metadata": {...}
}
```

### Delete Asset
```http
DELETE /api/assets/:id
```

### Asset Categories
```http
GET /api/assets/categories/list
```

### Asset Tags
```http
GET /api/assets/tags/list
```

### Component Assets
```http
GET /api/assets/components/:componentId
```

### Bulk Upload
```http
POST /api/assets/bulk-upload
Content-Type: multipart/form-data

{
  "files": [File, File, ...],
  "category": "examples",
  "component_id": "uuid",
  "tags": "button,examples"
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database (for future use)
DATABASE_URL=postgresql://username:password@localhost:5432/spectrum_db

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

See `.env.example` for all available configuration options.

### File Upload Configuration

- **Max file size**: 5MB
- **Allowed types**: JPEG, PNG, GIF, SVG, JSON, TXT
- **Storage**: Memory (development), configurable for production

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **Input Validation**: Request validation with express-validator
- **File Upload Restrictions**: Type and size limits

## 📝 Logging

The API uses Morgan for HTTP request logging and console logging for application events.

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel
The backend can be deployed to Vercel using serverless functions.

### Heroku
```bash
# Deploy to Heroku
heroku create spectrum-api
git push heroku main
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 Monitoring

- Health check endpoint: `/health`
- Request logging with Morgan
- Error tracking (implement Sentry for production)

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL)
- [ ] User authentication & authorization
- [ ] Real-time analytics with WebSockets
- [ ] Search with Elasticsearch
- [ ] File storage with AWS S3
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] Caching with Redis
- [ ] Email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Projects

- [Frontend React App](../README.md)
- [Adobe Spectrum Design System](https://spectrum.adobe.com/)

## 📞 Support

For questions and support, please open an issue on GitHub or contact the development team.