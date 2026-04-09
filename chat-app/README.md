# Chat App Monorepo

A production-ready starter monorepo for a real-time chat system using:

- **Frontend:** React + Vite + Tailwind + Framer Motion
- **Backend:** FastAPI + WebSocket + JWT auth
- **Database:** MongoDB (Motor)
- **Infra:** Docker + Docker Compose

## Project Structure

```text
chat-app/
├── client/
├── server/
├── docs/
├── .env.example
├── docker-compose.yml
└── README.md
```

## Quick Start (Docker)

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```
2. Start services:
   ```bash
   docker compose up --build
   ```
3. Open:
   - Client: http://localhost:5173
   - API docs: http://localhost:8000/docs

## Local Development

### Backend
```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Features

- Email/password signup and login
- JWT-based access control
- Real-time chat over WebSocket
- Persistent message history in MongoDB
- Online/offline presence tracking
- iOS-like glassmorphism responsive interface

## Testing

```bash
cd server
pytest -q
```

