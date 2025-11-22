# Vercel Deployment Guide for SmartBite

## Overview
This project needs TWO separate Vercel deployments:
1. **Backend API** - Deploy from root directory
2. **Frontend** - Deploy from frontend directory

## Backend Deployment

### Step 1: Deploy Backend
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `chikkucoder/Smartbite`
4. **Root Directory**: Leave as `/` (root)
5. **Framework Preset**: Other
6. Click "Deploy"

### Step 2: Set Backend Environment Variables
After deployment, go to Project Settings → Environment Variables and add:
```
MONGODB_URI=mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood
PORT=5000
RAZORPAY_KEY_ID=rzp_test_89g1mV1jcYw8DI
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Step 3: Note Backend URL
Copy your backend URL (e.g., `https://smartbite-api.vercel.app`)

---

## Frontend Deployment

### Step 1: Update Frontend API URL
Before deploying frontend, update `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

### Step 2: Deploy Frontend
1. Go to Vercel Dashboard
2. Click "Add New Project"
3. Import the SAME repository: `chikkucoder/Smartbite`
4. **Root Directory**: Set to `frontend`
5. **Framework Preset**: Create React App
6. Click "Deploy"

---

## Quick Deploy (Current Setup)

The root `vercel.json` is configured for **BACKEND ONLY**.

### To deploy:

**Option A: Root deployment (Backend)**
```bash
# This will deploy the backend
vercel --prod
```

**Option B: Separate deployments**
```bash
# Deploy backend from root
cd /path/to/mernapp
vercel --prod

# Deploy frontend separately
cd frontend
vercel --prod
```

---

## Important Notes

1. **Two Projects**: You'll have two Vercel projects:
   - `smartbite` or `smartbite-backend` (backend API)
   - `smartbite-frontend` (React app)

2. **CORS**: Backend already configured to accept requests from Vercel domains

3. **Environment Variables**: 
   - Backend needs MongoDB URI and Razorpay keys
   - Frontend needs backend API URL

4. **Database**: Using MongoDB Atlas (already configured)

---

## Current Deployment URLs
- Frontend: https://smartbite-eight.vercel.app
- Backend: (Set in frontend `.env.production`)

## Troubleshooting

### 404 Error
- Make sure you're deploying from the correct directory
- Backend: root directory
- Frontend: `frontend` subdirectory

### Build Errors
- Check environment variables are set
- Verify `CI=false` in frontend package.json build script
