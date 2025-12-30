# My Blog App - Unified Application

This is an integrated blog application with a React frontend and Express.js backend running as a single application.

## Project Structure

```
my-blog-app/
├── Blog/                 # Express backend
│   ├── app.js           # Main server file
│   ├── package.json
│   ├── public/          # Static assets
│   └── views/           # EJS templates (legacy, can be removed)
├── frontend/            # React frontend
│   ├── src/            # React components and pages
│   ├── dist/           # Build output (generated)
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── package.json         # Root package.json for unified management
```

## Setup Instructions

### 1. Install Dependencies

From the root directory, install all dependencies:

```bash
npm install
cd Blog && npm install
cd ../frontend && npm install
cd ..
```

### 2. Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:
- Backend only: `npm run backend:dev`
- Frontend only: `npm run frontend:dev`

### 3. Production Build

Build the entire application:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

The React frontend will be built to `frontend/dist/` and served by Express.

## API Endpoints

- `GET /api/posts` - Get all blog posts
- `POST /api/compose` - Create a new blog post
- `GET /api/posts/:postID` - Get a specific post
- `GET /api/about` - Get about page content
- `GET /api/contact` - Get contact page content

## How It Works

1. **Development Mode** (`npm run dev`):
   - React dev server runs on `http://localhost:5173`
   - Express server runs on `http://localhost:3000`
   - Frontend and backend communicate via API

2. **Production Mode** (`npm start`):
   - React app is built to static files (`frontend/dist`)
   - Express serves these static files
   - Single server on `http://localhost:3000`

## Frontend Integration

The React app in `frontend/` should be configured to:
- Call API endpoints on `http://localhost:3000/api/*`
- Use React Router for client-side navigation

Example API call from React:
```javascript
const response = await fetch('/api/posts');
const data = await response.json();
```

## Notes

- The old EJS views in `Blog/views/` are no longer used but kept for reference
- In development, the React dev server proxies API requests to Express
- In production, everything is served by a single Express server
