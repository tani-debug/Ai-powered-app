# AI Blog Generator - Unified Application

An integrated blog application featuring a **React frontend** (Vite) and **Express.js backend** running as a single application. The backend serves the built React frontend, and users can generate and manage blog posts.

## Project Structure

```
my-blog-app/
├── Blog/                           # Express.js backend
│   ├── app.js                     # Main server (serves frontend, APIs)
│   ├── package.json
│   ├── posts.json                 # JSON storage for blog posts
│   └── public/                    # Backend static assets
├── frontend/                       # React (Vite) frontend
│   ├── src/
│   │   ├── App.jsx                # Main React component
│   │   ├── Generator.js           # AI blog post generator component
│   │   ├── App.css                # Styling
│   │   └── main.jsx               # Entry point
│   ├── index.html
│   ├── dist/                      # Production build output (generated)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
├── INTEGRATION_GUIDE.md            # This file
├── package.json                    # Root package.json
└── .gitignore
```

## Quick Start (5 minutes)

**Prerequisites:** Node.js v18+ and npm installed

1. **Install all dependencies:**
```powershell
cd C:\Users\TANISHA\my-blog-app
npm install
cd Blog && npm install
cd ../frontend && npm install
cd ..
```

2. **Run backend + frontend together (two terminals):**

Terminal 1 — Backend:
```powershell
cd Blog
node app.js
```
Expected: `Server started on port 3000`

Terminal 2 — Frontend dev server:
```powershell
cd frontend
npm run dev
```
Expected: `http://localhost:5173` in browser

3. **Open browser:** http://localhost:5173 (frontend) connects to http://localhost:3000 (backend API)

---

## Local Setup & Running (Detailed)

### 1. Clone & Install Dependencies

```powershell
# Navigate to project root
cd C:\Users\TANISHA\my-blog-app

# Install root dependencies (if any)
npm install

# Install backend (Blog) dependencies
cd Blog
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Development Workflows

**Option A: Development Mode (Recommended for development)**

Open two PowerShell terminals side-by-side:

**Terminal 1 — Express Backend:**
```powershell
cd C:\Users\TANISHA\my-blog-app\Blog
node app.js
```
This serves:
- Backend API on `http://localhost:3000/api/*`
- Static frontend (if built) on `http://localhost:3000`

**Terminal 2 — React Dev Server:**
```powershell
cd C:\Users\TANISHA\my-blog-app\frontend
npm run dev
```
This serves:
- React app with hot-reload on `http://localhost:5173`
- Proxies API calls to backend

**Open browser:** `http://localhost:5173`

---

**Option B: Production Build & Serve (Test final output)**

```powershell
# Step 1: Build React app to static files
cd C:\Users\TANISHA\my-blog-app\frontend
npm run build
# Output: frontend/dist/

# Step 2: Start backend (which serves the built frontend)
cd ..\Blog
node app.js
# Output: Server started on port 3000
```

**Open browser:** `http://localhost:3000`

---

**Option C: Build-only (verify build works)**

```powershell
cd C:\Users\TANISHA\my-blog-app\frontend
npm run build
```
Check output: `dist/index.html`, `dist/assets/*`

---

### 3. Project Commands

**Frontend (from `frontend/` folder):**
```powershell
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Build to dist/ for production
npm start         # Serve built dist/ with http-server
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

**Backend (from `Blog/` folder):**
```powershell
node app.js       # Start Express server (http://localhost:3000)
# Add npm start script in package.json if needed
```

**Root (from project root):**
```powershell
npm install       # Install root dependencies
```

## API Endpoints

All endpoints run on the backend server (`http://localhost:3000` or Railway URL):

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts` | Retrieve all blog posts + home content |
| `POST` | `/api/compose` | Create a new blog post |
| `GET` | `/api/posts/:postID` | Get a specific post by title |
| `DELETE` | `/api/posts/:postIndex` | Delete a post by index |
| `GET` | `/api/about` | Get about page content |
| `GET` | `/api/contact` | Get contact page content |

### Example API Calls (from browser console or Postman)

**Get all posts:**
```javascript
fetch('http://localhost:3000/api/posts')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Create a post:**
```javascript
fetch('http://localhost:3000/api/compose', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    postTitle: 'My First Post',
    postContent: 'This is the content of my blog post.'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

**Delete a post (by index):**
```javascript
fetch('http://localhost:3000/api/posts/0', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data))
```

---

## Testing the App Locally

### 1. Start both services (as shown in "Quick Start")

### 2. Frontend Navigation
- Visit `http://localhost:5173`
- Click on **Home**, **About**, **Contact** (React Router handles navigation)
- Use **Generator** component to create blog posts via AI
- View posts in the blog list

### 3. Backend Direct API Test (using curl or browser)

```powershell
# Get all posts
curl http://localhost:3000/api/posts

# Get about content
curl http://localhost:3000/api/about

# Get contact content
curl http://localhost:3000/api/contact
```

### 4. File Persistence
- Posts are saved to `Blog/posts.json`
- Refresh backend → posts persist (file-based storage)
- Check the file: `cat Blog/posts.json` (or open in editor)

---

## Key Features

- **React Frontend (Vite)**: Built with Vite for fast development and optimized production builds.
  - Hot Module Replacement (HMR) — changes reload instantly during dev.
  - AI Blog Post Generator — integrated component to generate content.
  - Tailwind CSS — utility-first styling.
  
- **Express Backend**: Lightweight Node.js server handling API routes and serving static files.
  - RESTful JSON API for posts management.
  - Serves built React app from `frontend/dist/`.
  - Environment-aware PORT configuration.
  
- **JSON Storage**: Posts stored in `Blog/posts.json` (file-based; persists across restarts).
  - Simple, no database setup needed.
  - Easy to inspect and backup.
  
- **Single Application**: Backend serves frontend + API, single deployment target.
  - Development: separate dev servers for fast iteration.
  - Production: unified server on port 3000.

## How It Works

**Development:**
- React dev server (Vite) runs on `http://localhost:5173`
- Express backend runs on `http://localhost:3000`
- Frontend proxies API calls to backend

**Production:**
- React app is built to static files (`frontend/dist/`)
- Express serves both the React app and API routes
- Single server on `http://localhost:3000`

## Deployment

### GitHub
1. Create a GitHub repository and push your code:
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/AI-Blog-Generator.git
git push -u origin main
```

### Railway
1. Sign up at https://railway.app
2. Create a new project and connect your GitHub repository
3. Add two services:

   **Frontend Service:**
   - Root Directory: `frontend`
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm run start` (or `npx serve -s dist`)
   
   **Backend Service:**
   - Root Directory: `Blog`
   - Build Command: `npm ci`
   - Start Command: `node app.js`

4. Enable automatic deploys from GitHub on push to `main`
5. View logs in Railway dashboard to verify successful deployment

## Troubleshooting

### Common Issues & Solutions

**Port already in use**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port (edit Blog/app.js)
```

**`npm install` fails or lockfile errors on Railway**
- Solution: Run `npm install` (not `npm ci`) locally and commit `package-lock.json`
- Or in Railway: Change **Install Command** to `npm install`

**Frontend build fails**
- Ensure `frontend/package-lock.json` is in sync:
```powershell
cd frontend
rm -r node_modules
npm install
npm run build
```

**Frontend can't find backend API**
- Ensure backend is running on `http://localhost:3000`
- Check browser console for CORS or fetch errors
- Verify API endpoint URLs in React code start with `/api/*`

**Posts not persisting**
```powershell
# Check posts.json exists and is writable
cat Blog/posts.json
# Should show JSON array of posts
```

**Vite dev server not starting**
```powershell
cd frontend
npm run dev -- --host 0.0.0.0 --port 5173
```

**"Cannot find module" errors**
```powershell
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

---

## Notes

- Backend uses `process.env.PORT` for deployment flexibility (Railway injects this automatically)
- Frontend expects API calls to `/api/*` — configure CORS if needed
- In production, ensure `frontend/dist/` is built before starting the backend
- For persistent data in production, consider migrating from JSON to a database (PostgreSQL, MongoDB, etc.)
