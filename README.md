# ClassPilot — Frontend

A modern single-page frontend for ClassPilot: a lightweight class & student management app built with React, Vite, Redux Toolkit and Tailwind CSS.

This README is targeted at frontend developers and maintainers. It covers local setup, builds, deployment, common issues, and project organization.

---

## Table of contents

- About
- Tech stack
- Quick start
- Scripts
- Environment variables
- Development conveniences (API proxy)
- Deployment (Vercel & Netlify)
- Troubleshooting & common issues
- Project structure
- Contributing
- License

---

## About

ClassPilot frontend is a responsive web application for managing classes, enrolling students, and tracking grades. The UI integrates with a separate backend API which exposes endpoints under `/api`.

This repo contains only the frontend application. The backend must be running or reachable via `VITE_API_URL` for API calls to function.

---

## Tech stack

- React 19 (Vite)
- Redux Toolkit for state management
- Tailwind CSS for styling
- Axios for HTTP requests
- Lucide icons

---

## Quick start

Prerequisites:

- Node.js 18+ and npm

Clone and install:

```powershell
git clone <repo-url>
cd ClassPilot
npm install
```

Run development server:

```powershell
npm run dev
```

Open http://localhost:5173

Build production bundle:

```powershell
npm run build
```

Preview production build locally:

```powershell
npm run preview
```

---

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint

---

## Environment variables

Use Vite environment variables (prefixed with `VITE_`). The main one used by this frontend is:

- `VITE_API_URL` — Backend base URL (e.g. `https://classpilot-chi.vercel.app`).

Local `.env` example:

```
VITE_API_URL=https://classpilot-chi.vercel.app
```

Note: The dev server proxies `/api` to the backend (see `vite.config.js`), so you may not need `VITE_API_URL` during development.

---

## Development conveniences

- `vite.config.js` configures a dev proxy for `/api` to the configured backend. This allows you to call `/api/...` in code while developing locally.
- The frontend expects an auth token to be stored in `localStorage` under `token` and uses it as a Bearer token for protected requests.

---

## Deployment

### Vercel (recommended)

1. Create a Vercel project and connect this repository.
2. Project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add Environment Variable `VITE_API_URL` pointing to your backend URL.
4. Deploy.

Notes:

- Ensure your backend CORS allows the Vercel domain.
- `vercel.json` in the repo rewrites all routes to `index.html` for SPA routing.

### Netlify

1. Connect repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add SPA redirects (create `public/_redirects`) with the single line:

```
/* /index.html 200
```

---

## Troubleshooting & common issues

- CORS errors when calling API: Configure CORS on the backend to allow the frontend origin. Browsers will block cross-origin requests without the proper `Access-Control-Allow-Origin` header.

- 403 Forbidden on enroll or protected endpoints: Ensure the frontend sends a valid Bearer token and the backend authorizes the user.

- 500 Internal Server Error from grades API: Check backend logs and stack traces — this indicates a server-side exception.

- Case-sensitive import failures on CI (Vercel/Netlify): Ensure imports match the exact folder/file casing. Local Windows/macOS may be case-insensitive but Linux CI is not.

- Large bundle warnings during build: Use code-splitting (dynamic import) or configure manualChunks in `vite.config.js`.

---

## Project structure (important files)

- `src/` — application source
  - `Pages/` — top-level route pages
  - `Components/` — shared components and UI bits
  - `Store/` — Redux slices and store setup
  - `lib/` — utilities
  - `main.jsx` — app entry
- `vite.config.js` — Vite config (dev proxy, aliases)
- `vercel.json` — Vercel build & rewrite settings

---

## Contributing

- Create a branch for your work
- Run linting and local build
- Open a Pull Request with clear description and screenshots

---

## License

Add a LICENSE file if you plan to open-source this repo publicly.

---

If you want, I can:

- Add `netlify.toml` and `public/_redirects` for Netlify
- Add CI checks (GitHub Actions) for lint and build
- Add a short `DEPLOY.md` with exact Vercel/Netlify steps and required env vars

Which one would you like next?
