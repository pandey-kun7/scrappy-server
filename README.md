# Scrappy Server

A small Express server that aggregates hackathon/event listings from multiple sources and exposes them through a single JSON API.

## What it does

This project:

- fetches event data from external JSON sources
- normalizes the data into a shared format
- writes the merged result to `hack.json`
- serves the aggregated data from an API endpoint
- refreshes the source data on a cron schedule

Right now the server pulls from:

- Unstop
- Devfolio
- Hack2Skill

## How it works

The app flow is:

1. `index.js` starts an Express server
2. `auto.js` schedules a cron job that runs every minute
3. the cron job downloads source JSON files with `curl.exe`
4. `hacks.js` transforms the source files into a single array
5. the merged output is written to `hack.json`
6. `GET /api/hacks/live` returns the current contents of `hack.json`

## Project structure

```text
scrappy-server/
├── index.js         # Express API server
├── auto.js          # Cron-based refresh flow
├── hacks.js         # Source normalization and merge logic
├── hack.json        # Aggregated output served by the API
├── unstop.json      # Downloaded source data
├── devfolio.json    # Downloaded source data
├── h2s.json         # Downloaded source data
└── package.json
```

## Requirements

- Node.js 18+
- npm
- Windows environment or `curl.exe` available on PATH

> Note: the refresh flow currently calls `curl.exe` directly, so this repo is currently tailored to Windows-style environments unless you change that implementation.

## Installation

```bash
npm install
```

## Environment variables

Create a `.env` file in the project root with the following values:

```env
PORT=3000
UNSTOP_HACKATHONS_JSON_URL=https://example.com/unstop.json
DEVFOLIO_HACKATHONS_JSON_URL=https://example.com/devfolio.json
HACK2SKILL_HACKATHONS_JSON_URL=https://example.com/h2s.json
```

### Variables

- `PORT` — port used by the Express server
- `UNSTOP_HACKATHONS_JSON_URL` — source JSON URL for Unstop data
- `DEVFOLIO_HACKATHONS_JSON_URL` — source JSON URL for Devfolio data
- `HACK2SKILL_HACKATHONS_JSON_URL` — source JSON URL for Hack2Skill data

## Running the server

### Production-style start

```bash
npm start
```

### Development with auto-restart

```bash
npm run dev-server
```

Once the server is running, the API will be available at:

```text
http://localhost:PORT/api/hacks/live
```

Example with the default port:

```text
http://localhost:3000/api/hacks/live
```

## API

### `GET /api/hacks/live`

Returns the aggregated event list from `hack.json`.

### Example response shape

```json
{
  "success": true,
  "data": [
    {
      "evnt_name": "Example Hackathon",
      "reg_started": "2026-06-26T00:00:00+05:30",
      "reg_ended": "2026-07-10T00:00:00+05:30",
      "paid": false,
      "location": "online",
      "site": "https://example.com/event",
      "logo_url": "https://example.com/logo.png",
      "visibility": "public",
      "skills": ["JavaScript", "React"],
      "min_team_size": 1,
      "max_team_size": 4
    }
  ]
}
```

## Available scripts

From `package.json`:

- `npm start` — run the server with Node
- `npm run dev-server` — run the server with Nodemon
- `npm run lint` — run `oxlint`

There are also Vite-related scripts in `package.json`, but this repository currently appears to be using only the Node/Express server files shown above.

## Notes and caveats

- The refresh job is scheduled to run every minute.
- The server loads `hack.json` once at startup and serves that in-memory data.
- Source files like `unstop.json`, `devfolio.json`, and `h2s.json` are generated locally and are mostly ignored by Git.
- Some fields in the merged output may differ slightly across providers depending on the source schema.

## Main files

- `index.js` — server bootstrapping and API route
- `auto.js` — scheduled fetching logic
- `hacks.js` — normalization and merged output generation

## Future improvements

A few useful next steps for this project could be:

- reload `hack.json` after each refresh instead of only at startup
- wait for downloads to finish before running `hacks.js`
- add health and refresh endpoints
- add tests for source normalization
- make the fetch flow cross-platform instead of relying on `curl.exe`

## License

No license is currently specified in this repository.
