# Architecture Overview

## Backend layers

- **routes/**: FastAPI route registration and HTTP contracts
- **controllers/**: request orchestration and DTO conversion
- **services/**: business logic
- **models/**: persistence-level MongoDB document definitions
- **schemas/**: API and socket payload validation (Pydantic)
- **sockets/**: WebSocket connection manager and events
- **db/**: DB client and collection wiring
- **core/**: config, auth, and cross-cutting concerns

## Frontend layers

- **pages/**: route-level compositions
- **components/**: reusable visual building blocks
- **context/**: global auth + chat state
- **services/**: API and WebSocket integration
- **hooks/**: custom stateful behavior
- **utils/**: pure utility helpers
- **styles/**: global CSS and design tokens

