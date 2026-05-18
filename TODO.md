# TODO - Deploy fixes

## Step 1
Fix Render backend start script mismatch:
- Ensure Render runs `npm start` inside `backend/` (set working directory/root directory on Render) OR change repo root package.json scripts to include a `start` that forwards to backend.

## Step 2
Fix backend runtime for production:
- Update `backend/src/server.js` so it starts listening even in production when running on Render (currently it only listens when `NODE_ENV !== "production"`).

## Step 3
Validate token route auth:
- If further errors persist, verify Clerk auth shape and adjust `protectRoute` / `getStreamToken` accordingly.

## Step 4
Fix frontend backend URL configuration:
- Replace hardcoded backend URL in `frontend/src/lib/axios.js` with `import.meta.env.VITE_BACKEND_URL` (so deploy uses correct backend endpoint).

## Step 5
Add a backend healthcheck endpoint for deployment verification.

