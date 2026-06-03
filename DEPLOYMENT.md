# EthioCV AI — Deployment Guide

Backend → Railway  
Frontend → Vercel

---

## Before You Start

Make sure your code is pushed to GitHub. Both Vercel and Railway deploy directly from a GitHub repo.

```bash
git add .
git commit -m "ready for deployment"
git push origin main
```

---

## Part 1 — Deploy Backend to Railway

### 1. Create a Railway account
Go to https://railway.app and sign up with GitHub.

### 2. Create a new project
- Click **New Project**
- Select **Deploy from GitHub repo**
- Choose your `ethio-cv-ai` repository

### 3. Set the root directory
Railway will detect the whole repo. You need to tell it to use only the `backend` folder:
- Go to your service → **Settings** tab
- Under **Source**, set **Root Directory** to `backend`

### 4. Verify Railway detects the correct start command
Railway reads your `Procfile` automatically:
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
If it doesn't detect it, go to **Settings → Deploy → Start Command** and paste the line above.

### 5. Add environment variables
Go to your service → **Variables** tab → click **New Variable** and add:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | your OpenRouter API key |

Do NOT commit your `.env` file. Railway injects this at runtime.

### 6. Deploy
Click **Deploy** — Railway will install from `requirements.txt` and start the server.

### 7. Get your backend URL
After deploy succeeds, go to **Settings → Networking → Generate Domain**.  
You'll get a URL like:
```
https://ethiocv-backend-production.up.railway.app
```
Copy this — you'll need it for the frontend.

---

## Part 2 — Update Frontend to Use Production Backend

Before deploying the frontend, update the API URL in `CVForm.tsx`.

Open `frontend/app/dashboard/components/CVForm.tsx` and replace:
```ts
"http://127.0.0.1:8000/ai/generate-summary"
```
with your Railway URL:
```ts
"https://your-railway-url.up.railway.app/ai/generate-summary"
```

Or better — use an environment variable so you don't hardcode it:

1. In `CVForm.tsx`, change the URL to:
```ts
`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/generate-summary`
```

2. Add to `frontend/.env.local` for local dev:
```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

3. Add to Vercel environment variables (next section):
```
NEXT_PUBLIC_BACKEND_URL=https://your-railway-url.up.railway.app
```

---

## Part 3 — Deploy Frontend to Vercel

### 1. Create a Vercel account
Go to https://vercel.com and sign up with GitHub.

### 2. Import your project
- Click **Add New → Project**
- Select your `ethio-cv-ai` GitHub repository
- Under **Root Directory**, click **Edit** and set it to `frontend`
- Framework preset will auto-detect as **Next.js**

### 3. Add environment variables
Before clicking Deploy, expand **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
| `NEXT_PUBLIC_BACKEND_URL` | your Railway backend URL |

These values are in your `frontend/.env.local` file locally.

### 4. Deploy
Click **Deploy**. Vercel will run `npm run build` and host your Next.js app.

### 5. Get your frontend URL
After deploy you'll get a URL like:
```
https://ethiocv-ai.vercel.app
```

---

## Part 4 — Fix CORS for Production

Your backend currently allows all origins (`allow_origins=["*"]`), which works fine.  
Once live, you can tighten it to only allow your Vercel domain.

In `backend/app/main.py`, update:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-app.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
Add the Railway `FRONTEND_URL` as an env variable and reference it here for cleaner config.

---

## Part 5 — Supabase Setup Checklist

Make sure these are configured in your Supabase project before going live:

1. **Auth → URL Configuration**  
   Add your Vercel URL to **Site URL** and **Redirect URLs**:
   ```
   https://your-app.vercel.app
   https://your-app.vercel.app/**
   ```

2. **Storage → profile-images bucket**  
   Make sure the `profile-images` bucket exists and has a public policy:
   - Go to **Storage → profile-images → Policies**
   - Add a policy allowing `INSERT` and `SELECT` for authenticated users

3. **Database → cvs table**  
   Make sure the `cvs` table exists with these columns:
   ```
   id           uuid (default: gen_random_uuid())
   user_id      uuid
   full_name    text
   email        text
   phone        text
   address      text
   education    text
   experience   text
   skills       text
   created_at   timestamp (default: now())
   ```

---

## Quick Reference

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://your-app.vercel.app |
| Backend (Railway) | https://your-app.up.railway.app |
| Supabase Dashboard | https://supabase.com/dashboard |
| Railway Dashboard | https://railway.app/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |

---

## Redeployment

**Frontend**: Push to `main` — Vercel auto-deploys.  
**Backend**: Push to `main` — Railway auto-deploys.

No manual steps needed after initial setup.
