# 🚀 SmartBite Vercel Deployment Guide

## 📋 Prerequisites

1. GitHub account with SmartBite repository
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas database (already configured)

## 🔧 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your `SmartBite` repository from GitHub
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Select "Other"
   - **Root Directory**: Leave as `.` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add these environment variables in Vercel:
   
   ```
   MONGODB_URI=mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood?retryWrites=true&w=majority
   RAZORPAY_KEY_ID=rzp_test_89g1mV1jcYw8DI
   RAZORPAY_KEY_SECRET=bJPjh2Av0vctSaHaSwIa6kFu
   PORT=5000
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at: `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "f:\2024 COURSE\PROJECT++\mernapp"
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name? `smartbite`
   - Directory? `./`
   - Override settings? `N`

5. **Add Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add RAZORPAY_KEY_ID
   vercel env add RAZORPAY_KEY_SECRET
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔐 Environment Variables Required

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood?retryWrites=true&w=majority` |
| `RAZORPAY_KEY_ID` | `rzp_test_89g1mV1jcYw8DI` |
| `RAZORPAY_KEY_SECRET` | `bJPjh2Av0vctSaHaSwIa6kFu` |
| `PORT` | `5000` |

## 📝 Important Notes

1. **Frontend and Backend Together**
   - Both frontend and backend are deployed in the same Vercel project
   - API routes are accessible at `/api/*`
   - Frontend is served from the root `/`

2. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

3. **Automatic Deployments**
   - Every push to `main` branch triggers auto-deployment
   - Preview deployments created for pull requests

4. **Update API URL**
   - After deployment, note your Vercel URL
   - Update `frontend/.env.production` if needed:
     ```
     REACT_APP_API_URL=https://your-app.vercel.app
     ```

## 🎯 Post-Deployment

1. **Test Your Deployment**
   - Visit your Vercel URL
   - Test user registration/login
   - Test food ordering
   - Test chatbot functionality

2. **Monitor Logs**
   - Check Vercel Dashboard → Deployments → View Function Logs
   - Monitor for any errors

3. **Update CORS in Backend**
   - If using a custom domain, update `backend/index.js` CORS origin

## 🐛 Troubleshooting

### Issue: "Module not found"
**Solution**: Ensure all dependencies are in `package.json`

### Issue: "API not responding"
**Solution**: Check environment variables are set correctly

### Issue: "CORS error"
**Solution**: Update CORS origin in `backend/index.js` to include your Vercel URL

### Issue: "MongoDB connection failed"
**Solution**: 
- Check MongoDB Atlas whitelist (allow 0.0.0.0/0)
- Verify connection string in environment variables

## 🔄 Redeploy

To redeploy after changes:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically redeploy!

## 📱 Access Your App

After successful deployment:
- **Frontend**: `https://your-project-name.vercel.app`
- **API**: `https://your-project-name.vercel.app/api/*`

---

**Happy Deploying! 🎉**
