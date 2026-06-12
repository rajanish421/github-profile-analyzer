# GitHub Profile Analyzer

A backend API project that fetches GitHub user profile data, analyzes key metrics, and stores the analyzed results in MySQL for fast retrieval.

## Live Demo

[Live Demo](https://github-profile-analyzer-ancw.onrender.com)

> Note: This is hosted on Render free tier, so the first request can take a short time if the service is waking up.

## Why this project stands out

- Integrates with the real GitHub public API
- Persists analyzed profile insights in a relational database
- Uses clean controller/service/route architecture
- Includes practical APIs recruiters can test immediately

## Tech Stack

- Node.js
- Express.js
- MySQL (`mysql2/promise`)
- Axios
- Dotenv

## Project Structure

```text
server.js
src/
  app.js
  config/db.js
  routes/githubRoutes.js
  controllers/githubController.js
  services/githubService.js
```

## Features

- Analyze a GitHub profile by username
- Compute account age (in days)
- Save or update analyzed data in MySQL (`ON DUPLICATE KEY UPDATE`)
- Fetch all analyzed profiles
- Fetch one analyzed profile by username
- Health endpoints for API and DB check

## API Endpoints

Base URL (local): `http://localhost:3000`

### Health

- `GET /` → API status
- `GET /db-test` → database connectivity test

### GitHub Analysis

- `GET /api/github/profile_analyze/:userName`
  - Fetches GitHub profile from GitHub API
  - Calculates account age in days
  - Inserts/updates profile in `github_profiles`

- `GET /api/github/get_analyzed_profiles`
  - Returns all analyzed profiles from database

- `GET /api/github/get_single_profile/:userName`
  - Returns a single analyzed profile by username

## Database

This app expects a MySQL table named `github_profiles` with fields used in the controller:

- `username` (should be unique for upsert behavior)
- `name`
- `followers`
- `following`
- `public_repos`
- `public_gists`
- `account_age_days`
- `profile_url`

Example schema:

```sql
CREATE TABLE github_profiles (
  username VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  public_repos INT DEFAULT 0,
  public_gists INT DEFAULT 0,
  account_age_days INT DEFAULT 0,
  profile_url TEXT
);
```

## Getting Started

### 1) Clone and install dependencies

```bash
git clone https://github.com/rajanish421/github-profile-analyzer.git
cd github-profile-analyzer
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-database-name
```

### 3) Run the project

Development:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Recruiter Snapshot

This project demonstrates practical backend engineering skills:

- REST API design and route layering
- Third-party API integration
- Async/await error handling patterns
- Database persistence and upsert logic
- Environment-based configuration

## Postman Collection

You can import:

`./Github-Analyzer.postman_collection.json`

This file is available in the project root and contains ready-to-use requests for all main endpoints.
