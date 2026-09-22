# Flight Booking India — Frontend

React + Vite + Tailwind CSS frontend for AeroBook, a domestic Indian flight search & booking site. Fares are shown in INR across 15 major Indian cities and 6 airlines.

## Tech stack
- React 18 (Vite)
- Tailwind CSS (custom navy/marigold theme, `Sora` + `Inter` fonts)
- React Router
- Recharts (admin dashboard charts)
- lucide-react (icons)
- Axios

## Pages
- **Home** — hero + flight search form
- **Search results** — filterable, sortable flight list
- **Booking** — passenger details + live fare summary
- **Booking confirmation** — PNR and trip summary
- **My bookings** — booking history with cancellation
- **Login / Register**
- **Admin dashboard** — summary cards + line, pie and bar charts (bookings/revenue over time, bookings by airline, popular routes)

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and point it at your backend:
   ```bash
   cp .env.example .env
   # VITE_API_URL=http://localhost:5000/api
   ```
3. Make sure the backend (see the companion `-backend` repo) is running and seeded.
4. Start the dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173`. Log in with the seeded demo account (`demo@flightbooking.in` / `demo1234`) or the admin account (`admin@flightbooking.in` / `admin123`) to view `/admin`.

## Deploying to Netlify

1. Push this folder to a GitHub repo named `project-name-frontend`.
2. On [netlify.com](https://www.netlify.com), click **Add new site → Import an existing project** and connect the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Site settings → Environment variables**, add `VITE_API_URL` pointing at your deployed Render backend, e.g. `https://your-app.onrender.com/api`.
5. Because this is a single-page app using React Router, add a `public/_redirects` file (already included) so refreshing a route like `/search` doesn't 404 on Netlify.
6. Deploy. Once live, add the Netlify URL to the backend's `CLIENT_URL` environment variable on Render so CORS allows requests from it.
