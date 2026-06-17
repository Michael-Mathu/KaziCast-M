# Ball-Ops — Project Handoff

## Project Overview
A Next.js 16 mobile-first web app for live 2026 FIFA World Cup coverage. Displays match fixtures, live scores, group standings, team lineups, and news in a dark-themed UI.

## Recent Changes (June 17, 2026)

### Added: Auto-Updating World Cup Data System
The app previously used hardcoded mock data only. Now it fetches **real live data** from ESPN's free public API.

### New Files Created
| File | Purpose |
|------|---------|
| `src/lib/espn.ts` | ESPN API client — fetches/maps live World Cup data (no API key needed) |
| `src/app/api/live/route.ts` | Next.js API route proxying ESPN for client-side polling |
| `src/hooks/useLiveRefresh.ts` | React hook — polls /api/live every 30s, merges into Zustand store |
| `scripts/fetch-data.ts` | Build-time script — fetches ESPN data → generates static data files |
| `src/data/generated-matches.ts` | Auto-generated match data (run `npm run fetch-data`) |
| `src/data/generated-standings.ts` | Auto-generated group standings (from match results) |
| `src/data/data-timestamp.ts` | Tracks last data fetch timestamp |
| `docs/ARCHITECTURE.md` | Full system architecture documentation |

### Files Modified
| File | Change |
|------|--------|
| `package.json` | Added `"fetch-data": "npx tsx scripts/fetch-data.ts"` script |
| `src/app/(tabs)/matches/page.tsx` | Integrated `useLiveRefresh` — live scores auto-update + pull-to-refresh |
| `src/store/appStore.ts` | Added `toggleFavoriteMatch()`, `buildMatchLookup()` helper |
| `src/types/index.ts` | Updated `group`/`groupId` types to support 2026 groups A-P |

## Data Source: ESPN Public API
- **Endpoint**: `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard`
- **Auth**: None — completely free, no key required
- **Covers**: Full 2026 World Cup (48 teams, groups A-P)
- **Data**: Live scores, fixtures, events, stats, standings

## How To Update Data
1. **Build-time**: `npm run fetch-data` → `npm run build` (regenerates static files)
2. **Live client-side**: Matches page auto-polls `/api/live` every 30s
3. **Pull-to-refresh**: Drag down on matches list → calls live API

## Key Architecture
```
ESPN API → src/lib/espn.ts → src/app/api/live (proxy) → useLiveRefresh hook → Zustand store → UI
                              scripts/fetch-data.ts → static data files (build-time)
```

## 2026 World Cup Notes
- 48 teams across groups A-P (FIFA skips 'I')
- Old mock data only covers 32 teams (Groups A-H)
- New teams from ESPN use dynamic IDs like `t-espn-aut`
- The app gracefully falls back to mock data when no generated data exists

## Known Issues / Future Work
1. Standings page still uses mock data — should use `GENERATED_STANDINGS`
2. Knockout bracket needs auto-population from match results
3. No deployment cron for automated data refreshes
4. Match detail page (lineups) doesn't use ESPN data yet
5. News feed is still fully static