# Ball-Ops Architecture

## Overview

Ball-Ops is a Next.js 16 application that provides live 2026 FIFA World Cup coverage. It displays match fixtures, live scores, group standings, team lineups, and news — all in a mobile-first, dark-themed UI.

---

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                      ESPN API                            │
│  https://site.api.espn.com/apis/site/v2/sports/          │
│                    soccer/fifa.world/scoreboard           │
└────────────────────────┬────────────────────────────────┘
                         │ (free, no key required)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Server-Side Layer                        │
│                                                          │
│  scripts/fetch-data.ts     src/app/api/live/route.ts     │
│  (build-time, generates    (runtime proxy for client     │
│   static data files)        polling)                     │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Data Files (src/data/)                   │
│                                                          │
│  matches.ts        — Mock fallback data                  │
│  generated-matches.ts — Auto-generated from ESPN         │
│  standings.ts      — Mock fallback data                  │
│  generated-standings.ts — Auto-generated from ESPN       │
│  data-timestamp.ts — Last fetch timestamp                │
│  teams.ts          — Static team definitions + squads    │
│  news.ts           — Static news articles                │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Zustand Store (src/store/)               │
│                                                          │
│  appStore.ts — Global state: matches, news, favorites    │
│               + helpers: buildMatchLookup()              │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Client Layer                             │
│                                                          │
│  hooks/useLiveRefresh.ts — polls /api/live every 30s     │
│  app/(tabs)/matches/page.tsx — Live match list           │
│  app/(tabs)/standings/page.tsx — Group tables + bracket  │
│  components/ — UI components (MatchCard, LeagueGroup...) │
└─────────────────────────────────────────────────────────┘
```

---

## Data Sources

### Primary: ESPN Public API
- **Endpoint**: `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard`
- **Authentication**: None (public, no key required)
- **Rate Limit**: None documented (typical usage limits apply)
- **Data**: Live scores, fixtures, match events, stats, standings
- **Coverage**: 2026 FIFA World Cup (48 teams, groups A-P)

### Fallback: Static Mock Data
- `src/data/matches.ts` — 32-team mock matches (Groups A-H)
- `src/data/standings.ts` — Mock group tables and bracket
- `src/data/news.ts` — Static news articles
- These are used when generated data hasn't been fetched yet

---

## Key Modules

### `src/lib/espn.ts`
The core ESPN API client. Handles:
- Fetching scoreboard data (`fetchESPNScoreboard`)
- Fetching by date range (`fetchESPNMatchesForDate`)
- Mapping ESPN response types → app's `Match`, `Team`, `MatchEvent`, `MatchStats` types
- Status mapping (ESPN type IDs → SCHEDULED/LIVE/HALFTIME/FT)
- Team ID mapping (ESPN abbreviations → app team IDs)
- Stats and events parsing

### `src/app/api/live/route.ts`
Next.js API route (`GET /api/live`) that:
- Proxies ESPN API requests server-side
- Supports optional `?dates=` and `?ids=` query params
- Returns `{ matches: Match[], timestamp: string }`
- No caching (`Cache-Control: no-store`)

### `scripts/fetch-data.ts`
Build-time data generation script. Run with `npm run fetch-data`.
- Fetches all current World Cup data from ESPN
- Generates `src/data/generated-matches.ts`
- Generates `src/data/generated-standings.ts`
- Calculates group standings from match results
- Generates `src/data/data-timestamp.ts`

### `src/hooks/useLiveRefresh.ts`
Client-side React hook:
- Polls `/api/live` at configurable interval (default 30s)
- Deep-merges live data into the Zustand store
- Adds new matches not in static data
- Triggers on pull-to-refresh

---

## State Management

**Store**: Zustand (`src/store/appStore.ts`)

| State | Type | Description |
|-------|------|-------------|
| `matches` | `Match[]` | All matches (static + live) |
| `news` | `NewsArticle[]` | News articles |
| `selectedMatchdayId` | `MatchdayId` | Current filter (md-1, md-2, etc.) |

| Action | Description |
|--------|-------------|
| `setMatches()` | Replace all matches |
| `updateLiveMatch()` | Partial merge for live updates |
| `toggleFavoriteMatch()` | Toggle `isFavorite` on a match |
| `setSelectedMatchdayId()` | Change matchday filter |

---

## Component Tree (Matches Tab)

```
MatchesPage (src/app/(tabs)/matches/page.tsx)
├── useLiveRefresh() — polls /api/live every 30s
├── DateScroller
└── PullToRefresh
    └── LeagueGroup (per group or knockout stage)
        └── MatchCard (per match)
            ├── TeamLogo (home)
            ├── Score display
            ├── Status indicator (LIVE/FT/Scheduled)
            └── TeamLogo (away)
```

---

## Match Object Flow

```
ESPN API → espn.ts → api/live → useLiveRefresh → appStore.updateLiveMatch()
                                                      │
                                                      ▼
                                              Match Card re-renders
                                              with new score/status
```

---

## Types

See `src/types/index.ts` for full type definitions.

Key types: `Match`, `Team`, `MatchEvent`, `MatchStats`, `Player`, `Lineups`, `GroupTable`, `GroupTableEntry`, `BracketMatch`, `NewsArticle`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run fetch-data` | Fetch live data from ESPN → generate data files |
| `npm run lint` | Run ESLint |

---

## 2026 World Cup Notes

- The 2026 tournament has **48 teams** across **groups A through P** (not just A-H like 2022)
- Groups are A, B, C, D, E, F, G, H, J, K, L, M — note 'I' is skipped by FIFA
- The type system supports all groups (string type, not union)
- The old static mock data (`src/data/matches.ts`) only covers 32 teams (Groups A-H)
- New teams from ESPN (e.g. Austria, Jordan, Congo DR, Panama, Uzbekistan) use dynamic IDs like `t-espn-aut`

---

## Future Improvements

1. **Standings page** — Update `standings/page.tsx` to use `GENERATED_STANDINGS` for live group tables
2. **Knockout bracket** — Auto-populate bracket from match results
3. **Deployment cron** — Set up Vercel cron or GitHub Actions to run `fetch-data` daily
4. **Match detail page** — Connect lineups/events from ESPN data
5. **News integration** — Hook up ESPN news feed
6. **Error handling** — Improve graceful degradation when ESPN is unreachable