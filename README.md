# HostelMate Backend

A hostel student platform where students going out can post trips and peers can request items from those trips.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **Validation**: express-validator

## Setup Instructions

### 1. Database Setup
Run the SQL commands in `setup.sql` in your Supabase SQL Editor to create the necessary tables.

### 2. Environment Variables
Create a `.env` file (or set these in your deployment dashboard) based on `.env.example`:
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for backend access).
- `CLERK_SECRET_KEY`: Your Clerk secret key.
- `CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key.
- `FRONTEND_URL`: The URL of your frontend application.

### 3. Installation
```bash
npm install
```

### 4. Running the App
- **Development**: `npm run dev`
- **Production**: `npm start`

## API Endpoints

### Trips
- `GET /api/trips`: List all active trips.
- `POST /api/trips`: Create a new trip.
- `GET /api/trips/:id`: Get trip details with requests.
- `PATCH /api/trips/:id`: Update trip status.
- `DELETE /api/trips/:id`: Delete a trip.

### Requests
- `POST /api/requests/trips/:id/requests`: Create a request on a trip.
- `PATCH /api/requests/:id`: Update request status.
- `GET /api/requests/:id`: Get request details.
- `POST /api/requests/:id/qr`: Generate QR for delivery.
- `POST /api/requests/:id/verify-qr`: Verify QR for delivery.

### Chat
- `GET /api/chat/requests/:id/chat`: Get chat messages for a request.
- `POST /api/chat/:request_id`: Send a chat message.

### Ratings
- `POST /api/ratings`: Submit a rating.

### Users
- `GET /api/users/me`: Get current user profile.
- `GET /api/users/:id`: Get user profile with stats.

## Deployment on Railway
1. Push code to GitHub.
2. Connect repo to Railway.app.
3. Add environment variables in Railway dashboard.
4. Railway auto-detects Node.js and runs `npm start`.
