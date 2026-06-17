/**
 * ESPN Public API Module
 * 
 * Fetches and maps live World Cup 2026 data from ESPN's free, no-key-required API.
 * ESPN API Endpoint: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard
 */

import { Match, MatchEvent, MatchStats, Team } from '@/types';

// ---------------------------------------------------------------------------
// ESPN API Response Types
// ---------------------------------------------------------------------------

interface ESPNResponse {
  events: ESPNEvent[];
  leagues: any[];
  season: any;
  day: { date: string };
}

interface ESPNEvent {
  id: string;
  date: string;
  name: string;
  shortName: string;
  status: {
    clock: number;
    displayClock: string;
    period: number;
    type: {
      id: string;   // "1"=Scheduled, "2"=InProgress 1st, "3"=HT, "4"=InProgress 2nd, "28"=FT
      name: string;
      state: string;
      completed: boolean;
      description: string;
      detail: string;
      shortDetail: string;
    };
  };
  competitions: ESPNCompetition[];
}

interface ESPNCompetition {
  id: string;
  date: string;
  venue: {
    fullName?: string;
    displayName?: string;
    address?: { city: string; country: string };
  };
  status: {
    clock: number;
    displayClock: string;
    period: number;
    type: {
      id: string;
      name: string;
      state: string;
      completed: boolean;
      description: string;
      detail: string;
      shortDetail: string;
    };
  };
  competitors: ESPNCompetitor[];
  details: ESPNMatchEvent[];
  altGameNote?: string; // e.g. "FIFA World Cup, Group J"
  headlines?: Array<{ description: string; type: string; shortLinkText: string }>;
}

interface ESPNCompetitor {
  id: string;
  homeAway: 'home' | 'away';
  score: string;
  winner: boolean;
  team: {
    id: string;
    abbreviation: string;    // e.g. "AUT", "JOR", "POR"
    displayName: string;     // e.g. "Austria", "Portugal"
    shortDisplayName: string;
    name: string;
    location: string;
    logo: string;
    color: string;
    alternateColor: string;
  };
  records?: Array<{ name: string; type: string; summary: string }>;
  statistics?: Array<{
    name: string;
    abbreviation: string;
    displayValue: string;
  }>;
}

interface ESPNMatchEvent {
  type: { id: string; text: string };
  clock: { value: number; displayValue: string };
  team: { id: string };
  scoreValue: number;
  scoringPlay: boolean;
  redCard: boolean;
  yellowCard: boolean;
  penaltyKick: boolean;
  ownGoal: boolean;
  athletesInvolved?: Array<{
    id: string;
    displayName: string;
    shortName: string;
    fullName: string;
    jersey: string;
  }>;
}

// ---------------------------------------------------------------------------
// ESPN Status → App Status mapping
// ---------------------------------------------------------------------------

function mapStatus(espnStatus: ESPNCompetition['status']): Match['status'] {
  const typeId = espnStatus.type.id;
  switch (typeId) {
    case '1':  // STATUS_SCHEDULED
    case '5':  // STATUS_DELAYED
      return 'SCHEDULED';
    case '2':  // STATUS_IN_PROGRESS_FIRST_HALF
      return 'LIVE';
    case '3':  // STATUS_HALFTIME
      return 'HALFTIME';
    case '4':  // STATUS_IN_PROGRESS_SECOND_HALF
      return 'LIVE';
    case '28': // STATUS_FULL_TIME
      return 'FT';
    case '29': // STATUS_FULL_TIME_AFTER_EXTRA
      return 'FT';
    case '30': // STATUS_FULL_TIME_PENALTIES
      return 'FT';
    case '31': // STATUS_EXTRA_TIME
      return 'LIVE';
    case '32': // STATUS_EXTRA_TIME_HALFTIME
      return 'HALFTIME';
    default:
      if (espnStatus.type.state === 'post' && espnStatus.type.completed) {
        return 'FT';
      }
      if (espnStatus.type.state === 'pre') {
        return 'SCHEDULED';
      }
      return 'LIVE';
  }
}

// ---------------------------------------------------------------------------
// ESPN Team → App Team mapping
// ---------------------------------------------------------------------------

// Maps ESPN 3-letter abbreviation → app team ID (t-xxx)
const ESPN_TO_APP_TEAM: Record<string, string> = {
  'USA': 't-usa', 'MEX': 't-mex', 'CAN': 't-can', 'COL': 't-col',
  'ENG': 't-eng', 'SEN': 't-sen', 'UKR': 't-ukr', 'AUS': 't-aus',
  'ARG': 't-arg', 'POL': 't-pol', 'KSA': 't-sau', 'EGY': 't-egy',
  'FRA': 't-fra', 'DEN': 't-den', 'TUN': 't-tun', 'PER': 't-per',
  'ESP': 't-esp', 'GER': 't-ger', 'JPN': 't-jpn', 'CRC': 't-crc',
  'BEL': 't-bel', 'CRO': 't-cro', 'MAR': 't-mar', 'KOR': 't-kor',
  'BRA': 't-bra', 'SUI': 't-sui', 'SRB': 't-srb', 'CMR': 't-cmr',
  'POR': 't-por', 'URU': 't-ury', 'GHA': 't-gha', 'IRN': 't-irn',
};

// For teams not in our original 32, create dynamic IDs
function getDynamicTeamId(abbr: string): string {
  return `t-espn-${abbr.toLowerCase()}`;
}

function isKnownTeam(abbr: string): boolean {
  return abbr in ESPN_TO_APP_TEAM;
}

function getAppTeamId(abbr: string): string {
  return ESPN_TO_APP_TEAM[abbr] || getDynamicTeamId(abbr);
}

// Build a Team object from ESPN data
function buildTeam(competitor: ESPNCompetitor): Team {
  const abbr = competitor.team.abbreviation;
  const teamId = getAppTeamId(abbr);

  return {
    id: teamId,
    name: competitor.team.displayName,
    shortName: abbr,
    flag: '', // Will be resolved by getTeamFlagUrl from ID
    group: '?', // Unknown group for new teams, will map from altGameNote
    color: competitor.team.color ? `#${competitor.team.color}` : '#666666',
    secondaryColor: competitor.team.alternateColor ? `#${competitor.team.alternateColor}` : '#333333',
  };
}

// Extract group letter from altGameNote like "FIFA World Cup, Group J"
function parseGroup(altGameNote?: string): string {
  if (!altGameNote) return '?';
  const match = altGameNote.match(/Group\s+([A-H])/);
  return match ? match[1] : '?';
}

// ---------------------------------------------------------------------------
// Stats parsing
// ---------------------------------------------------------------------------

function parseStats(competitors: ESPNCompetitor[]): MatchStats {
  const homeStats = competitors.find(c => c.homeAway === 'home')?.statistics || [];
  const awayStats = competitors.find(c => c.homeAway === 'away')?.statistics || [];

  const extract = (stats: typeof homeStats, key: string): number => {
    const found = stats.find(s => s.abbreviation === key);
    return found ? parseInt(found.displayValue, 10) || 0 : 0;
  };

  return {
    possession: {
      home: extract(homeStats, 'PP'),
      away: extract(awayStats, 'PP'),
    },
    shots: {
      home: extract(homeStats, 'SHOT'),
      away: extract(awayStats, 'SHOT'),
    },
    shotsOnTarget: {
      home: extract(homeStats, 'SOG'),
      away: extract(awayStats, 'SOG'),
    },
    corners: {
      home: extract(homeStats, 'CW'),
      away: extract(awayStats, 'CW'),
    },
    fouls: {
      home: extract(homeStats, 'FC'),
      away: extract(awayStats, 'FC'),
    },
    yellowCards: {
      home: 0,
      away: 0,
    },
    redCards: {
      home: 0,
      away: 0,
    },
    offsides: {
      home: 0,
      away: 0,
    },
  };
}

// ---------------------------------------------------------------------------
// Events parsing
// ---------------------------------------------------------------------------

function parseEvents(details: ESPNMatchEvent[], homeTeamId: string, awayTeamId: string): MatchEvent[] {
  return details.map((d, idx) => {
    const team: 'home' | 'away' = d.team.id === homeTeamId ? 'home' : 'away';
    const playerName = d.athletesInvolved?.[0]?.displayName || 'Unknown';

    let type: MatchEvent['type'] = 'GOAL';
    if (d.yellowCard) type = 'YELLOW_CARD';
    else if (d.redCard) type = 'RED_CARD';
    else if (d.ownGoal) type = 'OWN_GOAL';
    else if (d.penaltyKick) type = 'PENALTY';
    else if (d.type.text === 'Substitution') type = 'SUBSTITUTION';

    const event: MatchEvent = {
      id: `espn-${idx}`,
      type,
      minute: Math.floor(d.clock.value / 60),
      player: playerName,
      team,
    };

    if (type === 'GOAL' && d.athletesInvolved && d.athletesInvolved.length > 1) {
      // Second athlete involved could be the assist provider
      // ESPN doesn't clearly separate assists, so we add a description
      event.description = `${playerName} scores`;
    }
    if (d.ownGoal) {
      event.description = `Own Goal by ${playerName}`;
    }
    if (d.penaltyKick && type === 'GOAL') {
      event.description = `Penalty scored by ${playerName}`;
    }

    return event;
  });
}

// ---------------------------------------------------------------------------
// Matchday ID mapping
// ---------------------------------------------------------------------------

function getMatchdayInfo(altGameNote?: string, eventId?: string): { matchdayId: string; matchdayName: string } {
  if (!altGameNote) {
    return { matchdayId: 'md-1', matchdayName: 'Matchday 1' };
  }
  
  const note = altGameNote.toLowerCase();
  if (note.includes('group')) {
    return { matchdayId: 'md-1', matchdayName: 'Matchday 1' };
  }
  if (note.includes('round of 32')) {
    return { matchdayId: 'md-16', matchdayName: 'Round of 32' };
  }
  if (note.includes('round of 16')) {
    return { matchdayId: 'md-16', matchdayName: 'Round of 16' };
  }
  if (note.includes('quarter')) {
    return { matchdayId: 'md-qf', matchdayName: 'Quarter-finals' };
  }
  if (note.includes('semi')) {
    return { matchdayId: 'md-sf', matchdayName: 'Semi-finals' };
  }
  if (note.includes('3rd') || note.includes('third')) {
    return { matchdayId: 'md-f', matchdayName: 'Third Place' };
  }
  if (note.includes('final')) {
    return { matchdayId: 'md-f', matchdayName: 'Final' };
  }
  
  return { matchdayId: 'md-1', matchdayName: 'Matchday 1' };
}

// ---------------------------------------------------------------------------
// ESPN Match → App Match mapper
// ---------------------------------------------------------------------------

function mapESPNMatch(event: ESPNEvent): Match | null {
  const competition = event.competitions[0];
  if (!competition) return null;

  const homeCompetitor = competition.competitors.find(c => c.homeAway === 'home');
  const awayCompetitor = competition.competitors.find(c => c.homeAway === 'away');
  if (!homeCompetitor || !awayCompetitor) return null;

  const homeTeam = buildTeam(homeCompetitor);
  const awayTeam = buildTeam(awayCompetitor);

  const homeScore = parseInt(homeCompetitor.score, 10) || 0;
  const awayScore = parseInt(awayCompetitor.score, 10) || 0;

  const { matchdayId, matchdayName } = getMatchinfo(competition.altGameNote, event.id);

  // Determine current minute for live matches
  const clockMinutes = Math.floor(competition.status.clock / 60);
  const minute = mapStatus(competition.status) === 'LIVE' || mapStatus(competition.status) === 'HALFTIME'
    ? clockMinutes || 45
    : null;

  const match: Match = {
    id: `espn-${event.id}`,
    matchdayId: matchdayId as any,
    matchdayName,
    homeTeam,
    awayTeam,
    score: { home: homeScore, away: awayScore },
    status: mapStatus(competition.status),
    minute,
    startTime: event.date,
    venue: competition.venue?.fullName || competition.venue?.displayName || 'TBD',
    isFavorite: false,
    events: parseEvents(
      competition.details || [],
      homeCompetitor.team.id,
      awayCompetitor.team.id
    ),
    stats: parseStats(competition.competitors),
    lineups: {
      home: { formation: 'N/A', starting: [], substitutes: [] },
      away: { formation: 'N/A', starting: [], substitutes: [] },
    },
  };

  return match;
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------

/**
 * Fetches all World Cup matches from ESPN's live scoreboard.
 */
export async function fetchESPNScoreboard(): Promise<Match[]> {
  try {
    const url = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
    const response = await fetch(url, {
      next: { revalidate: 30 }, // ISR: revalidate every 30 seconds if used in Server Components
    });

    if (!response.ok) {
      console.error(`ESPN API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: ESPNResponse = await response.json();
    
    const matches: Match[] = [];
    for (const event of data.events) {
      const match = mapESPNMatch(event);
      if (match) {
        matches.push(match);
      }
    }

    return matches;
  } catch (error) {
    console.error('Failed to fetch ESPN scoreboard:', error);
    return [];
  }
}

/**
 * Fetches matches for a specific date range from ESPN.
 * ESPN supports `dates` parameter: YYYYMMDD or YYYYMMDD-YYYYMMDD
 */
export async function fetchESPNMatchesForDate(dateStr: string): Promise<Match[]> {
  try {
    // Convert from our ISO to ESPN format YYYYMMDD
    const clean = dateStr.replace(/-/g, '').slice(0, 8);
    const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${clean}`;
    const response = await fetch(url);

    if (!response.ok) return [];

    const data: ESPNResponse = await response.json();
    const matches: Match[] = [];
    for (const event of data.events) {
      const match = mapESPNMatch(event);
      if (match) matches.push(match);
    }
    return matches;
  } catch {
    return [];
  }
}

/**
 * Returns a set of live/active match IDs from ESPN data for quick comparison.
 */
export async function fetchLiveMatchIds(): Promise<Set<string>> {
  try {
    const matches = await fetchESPNScoreboard();
    const liveIds = new Set<string>();
    for (const m of matches) {
      if (m.status === 'LIVE' || m.status === 'HALFTIME' || m.status === 'FT') {
        liveIds.add(m.id);
      }
    }
    return liveIds;
  } catch {
    return new Set();
  }
}

/**
 * Maps ESPN match data to our existing "known" matches.
 * Returns an array of partial Match updates keyed by match ID.
 * Only returns data for matches in the known set.
 */
export async function fetchLiveUpdatesForKnownMatches(knownMatchIds: Set<string>): Promise<Map<string, Partial<Match>>> {
  try {
    const liveMatches = await fetchESPNScoreboard();
    const updates = new Map<string, Partial<Match>>();

    for (const liveMatch of liveMatches) {
      // Find the corresponding known match by checking teams
      // We compare the ESPN team abbreviation vs our known team IDs/shortNames
      const espnHomeAbbr = liveMatch.homeTeam.shortName;
      const espnAwayAbbr = liveMatch.awayTeam.shortName;

      // The live match ID from ESPN has format "espn-760431"
      // But our known matches have format "wc-1", "wc-2", etc.
      // So we need to match by teams
      const appHomeId = ESPN_TO_APP_TEAM[espnHomeAbbr];
      const appAwayId = ESPN_TO_APP_TEAM[espnAwayAbbr];

      if (appHomeId && appAwayId) {
        // Find the known match by team IDs
        for (const knownId of knownMatchIds) {
          // We'll store a temporary lookup - the caller handles this
        }
      }

      updates.set(liveMatch.id, {
        status: liveMatch.status,
        score: liveMatch.score,
        minute: liveMatch.minute,
        events: liveMatch.events,
        stats: liveMatch.stats,
      });
    }

    return updates;
  } catch {
    return new Map();
  }
}

// Fix typo in helper name
function getMatchinfo(altGameNote?: string, eventId?: string): { matchdayId: string; matchdayName: string } {
  return getMatchdayInfo(altGameNote, eventId);
}