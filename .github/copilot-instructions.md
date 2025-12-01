# Calorie App Agent Guide

## Architecture
- Monorepo lives under `calorie-app/` with three services: `mobile-app` (Expo + TypeScript), `backend` (Express + Mongo via Mongoose), and `ai-model` (FastAPI + Pillow/Numpy).
- Services communicate over HTTP only: the Expo client calls the Express REST API (default `http://localhost:4000`), and the API will later call the FastAPI `/predict` endpoint for ML results.
- Each service owns its dependencies and start command; there is no root-level package manager wiring, so always `cd` into the specific folder.

## Mobile App (Expo)
- Entry is `mobile-app/App.tsx`, wiring a single `HomeScreen` via React Navigation; new screens should follow this stack navigator pattern.
- API calls are centralized in `src/services/api.ts`; respect the `EXPO_PUBLIC_BACKEND_URL` env var when pointing to non-local servers.
- `HomeScreen` demonstrates the expected async flow: request Expo permissions, launch image picker, and call `fetchHealthPing`; mirror this pattern (state via hooks + `useCallback`) for future device integrations.
- Shared UI should be composed through `src/components` (e.g., `AppCard`) with light styling and Expo-compatible primitives; prefer these components over inline duplication.
- Logging goes through `src/utils/logger.ts` so that noisy output is stripped from production builds; import `log` instead of `console.log` when instrumenting React Native code.

## Backend (Express API)
- `backend/package.json` is ESM (`"type": "module"`); always use `import`/`export` syntax and keep controllers, routes, models, and middleware under their existing folders.
- `server.js` initializes CORS, JSON/urlencoded parsing, and `multer`'s `upload.none()` to handle multipart forms; reuse that multer instance (via dependency injection or a shared module) when adding routes that accept files.
- Database access is centralized in `config/db.js` with `MONGO_URI` defaulting to `mongodb://127.0.0.1:27017/calorie-app`; call `connectDB()` once at startup and keep new Mongoose models under `models/` (see `CalorieEntry.js` for timestamps + required fields pattern).
- All routes should register on the shared `app` instance and terminate by either responding or passing errors to `next`; `errorHandler.js` already normalizes JSON responses.
- Development workflow: `npm install`, `npm run dev` (or `node server.js`), and optionally `node --check server.js` to catch syntax issues before running.

## AI Model (FastAPI)
- `ai-model/main.py` exposes `/` for health and `/predict` for uploads; keep new routes typed with FastAPI decorators and return plain dicts or `JSONResponse`.
- Image uploads stream through `utils/image_loader.py` into PIL objects, then to `services/predictor.py`; implement real preprocessing inside `preprocess()` and keep inference side-effect free.
- Dependencies live in `requirements.txt`; use a virtualenv (`python -m venv .venv && source .venv/bin/activate`) before running `uvicorn main:app --reload`.
- The current `predict` stub returns static data; when you replace it, ensure the contract remains `{ "calories": number, "confidence": number }` so the API and mobile layers stay compatible.

## Cross-Service Workflow
- Start services independently: `npm start` (Expo) on port 8081 tunnel, `npm run dev` (Express) on 4000, and `uvicorn main:app --reload` (FastAPI) on 8000; mobile clients hit the backend through the Expo metro server's network tunnel.
- When adding endpoints, update both `backend/routes/*` and the matching client helper in `mobile-app/src/services/api.ts`; keep response shapes stable and documented in JSDoc/TS types.
- Use environment variables for secrets and hosts (`EXPO_PUBLIC_BACKEND_URL`, `PORT`, `MONGO_URI`); do not hardcode service URLs or credentials in source.
- Prefer lightweight, easily restartable changes: no shared state between services, and each repo section should be testable in isolation before wiring the trio together.
