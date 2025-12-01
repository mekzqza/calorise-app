# Calorie App Monorepo

A three-part workspace for experimenting with calorie tracking via a mobile client, Node.js API, and FastAPI-based AI service.

## Project Layout

```
calorie-app/
├── mobile-app      # Expo React Native client (TypeScript)
├── backend         # Node.js + Express REST API
└── ai-model        # FastAPI service for ML experiments
```

## Getting Started

### 1. Mobile App (Expo + TypeScript)
```
cd mobile-app
npm install
npm start
```

### 2. Backend (Node.js + Express)
```
cd backend
npm install
node server.js
```

### 3. AI Model (FastAPI + TensorFlow)
```
cd ai-model
source .venv/bin/activate
uvicorn main:app --reload
```

## Next Steps
1. Wire the mobile app service calls to the Express API once it exposes real endpoints.
2. Implement persistence and validation on the backend (MongoDB connection, multer storage, auth, etc.).
3. Replace the AI stub with a trained TensorFlow or Torch model, persisting artifacts under `ai-model/models/`.
4. Add shared environment configuration (.env files) and secrets management for all services.
5. Configure linting, formatting, and CI workflows for consistent quality across the repo.
