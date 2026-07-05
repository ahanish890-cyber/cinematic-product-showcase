# GitHub Pages Setup Guide

## Configuration Steps

### 1. Update Vite Config (✓ Already Done)
The `vite.config.ts` now supports a `BASE_PATH` environment variable for the repository name.

### 2. Update your Repository Remote
Add your GitHub repository if not already added:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### 3. For Subdirectory Deployments (if needed)
If deploying to a project site (not user/org site), set the base path:

**Option A: Using Environment Variable**
```bash
BASE_PATH=/your-repo-name npm run build
```

**Option B: Update vite.config.ts directly**
```typescript
base: '/your-repo-name/',
```

### 4. Install gh-pages (if deploying locally)
```bash
npm install
```

### 5. Deploy Options

**Option A: Automatic Deployment (Recommended)**
- Push to `main` or `master` branch
- GitHub Actions will automatically build and deploy to GitHub Pages
- Check workflow status in `.github/workflows/deploy.yml`

**Option B: Manual Deployment**
```bash
npm run deploy
```
(Requires GitHub CLI or git credentials configured)

### 6. Configure GitHub Pages Settings
1. Go to your repository → Settings → Pages
2. Under "Build and deployment":
   - Select "Deploy from a branch" or "GitHub Actions"
   - Choose branch: `gh-pages`
   - Leave folder as `/ (root)`

### 7. Access Your Site
Your site will be available at:
- **User/Org Site**: `https://YOUR_USERNAME.github.io`
- **Project Site**: `https://YOUR_USERNAME.github.io/YOUR_REPO`

## Troubleshooting

### Assets not loading
- Check if the `base` path in `vite.config.ts` matches your repository name
- Ensure all asset paths use relative paths or import statements

### Build fails
- Check GitHub Actions logs in the Actions tab
- Ensure Node.js version is compatible (v18+)

### Site not updating
- Clear browser cache
- Wait a few minutes for deployment to complete
- Check that `gh-pages` branch was created/updated

## Files Modified
- `vite.config.ts` - Added base path configuration
- `package.json` - Added `gh-pages` dependency and deploy script
- `.github/workflows/deploy.yml` - Added GitHub Actions workflow
