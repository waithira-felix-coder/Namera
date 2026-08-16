# Namera

Namera is a full-stack baby-naming platform designed to help families discover names with cultural context, meaning, style, sound, and fit. The product combines a modern marketing front end with a data-powered backend so names are not just displayed, but explored with richer details and filtering.

## What this project contains

The repository is split into two main app layers:

- apps/web
  - Next.js 16 front end
  - landing pages, search experience, comparison flows, collections, and navigation
  - UI built with React, TypeScript, and Tailwind

- apps/api
  - FastAPI backend service
  - SQLAlchemy data model for names
  - endpoints for list/search retrieval and record details
  - access to the larger dataset stored in PostgreSQL

Additional project folders:

- docs/
  - product brief and project notes
- infrastructure/
  - deployment and infrastructure setup
- packages/
  - reusable code or future shared packages
- scripts/
  - database import and enrichment tooling

## How the project works

1. The frontend loads the name experience from the web app.
2. The API provides name records from the database.
3. The database contains a large seeded dataset of names, not just the six sample names used in static fallback content.
4. Search, filtering, and detail pages use the API response and present enrichments such as:
   - gender
   - origin
   - meaning
   - style
   - vibe
   - pronunciation
   - tags
   - popularity
   - compatibility hints

## Skills gained while building this project

This project covers a broad range of practical software-development skills:

- Full-stack product architecture
- Next.js app routing and responsive UI building
- FastAPI backend design and API route creation
- PostgreSQL + SQLAlchemy model design
- Database seeding and import workflows
- Data enrichment pipelines for a large catalog
- Search/filter UX and client-side data handling
- Debugging live API and frontend integration issues
- Environment configuration and local app startup
- Deployment-minded project structure and documentation

## Local access to the 50K names

The 50,000 names are not stored in the front-end fallback file. They live in the database behind the API.

The local app may only show 6 names when the frontend is using its fallback dataset instead of the live API. That fallback file is in:

- apps/web/lib/data/names.ts

This local fallback is only a sample dataset for development and demo purposes. It is not the full database.

To access the full catalog locally:

1. Start the backend API:

```bash
cd apps/api
# activate the project venv if you are using one
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

2. Start the frontend app:

```bash
cd apps/web
npm install
npm run dev
```

3. Make sure the frontend is pointed at the live API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_LIVE_API=true
```

4. Open the app and visit the search route:

- http://localhost:3000/search

If the API is running correctly, the app will fetch from the backend and load the larger dataset instead of the six fallback records.

## Database access pattern

The live API endpoint is:

- http://localhost:8000/api/v1/names

This returns the list of names from the database.

You can verify the full dataset by checking the API directly in a browser or via curl:

```bash
curl http://localhost:8000/api/v1/names | python -c "import sys, json; data=json.load(sys.stdin); print(len(data)); print(data[0])"
```

If the count is around 50,000, you are connected to the real database-backed catalog. If you still see just six records, the app is likely falling back to the sample file and the live API is not running or not enabled.

## Navigation and flow

The app includes a sticky top navigation bar across the main pages so users can move easily around the product.

There is also a Back button in the navbar that returns to the previous page using browser history.

## Run locally

```bash
# Terminal 1: API
cd apps/api
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Web app
cd apps/web
npm install
npm run dev
```

Then open:

- http://localhost:3000

## Project brief

The product direction is documented in [docs/NAMERA_PROJECT_BRIEF.md](docs/NAMERA_PROJECT_BRIEF.md).
