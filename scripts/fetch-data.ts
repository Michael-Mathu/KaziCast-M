/**
 * Build-Time Data Fetching Script
 * 
 * Fetches live World Cup data from ESPN's free API and generates
 * updated data files. Run with:
 *   npx tsx scripts/fetch-data.ts
 * 
 * This script:
 * 1. Fetches today's scoreboard from ESPN
 * 2. Maps ESPN matches to our Match type
 * 3. Generates src/data/generated-matches.ts
 * 4. Generates src/data/generated-standings.ts
 * 5. Generates src/data/data-timestamp.ts (so we know when data was last fetched)
 * 
 * Add to package.json scripts:
 *   "fetch-data": "npx tsx scripts/fetch-data.ts"
 */

import * as fs from 'fs';
import * as path from 'path';

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
    type: { id: string; name: string; state: string; completed: boolean; description: string; detail: string; shortDetail: string };
  };
  competitions: ESPNCompetition[];
}

interface ESPNCompetition {
  id: string;
  date: string;
  venue: { fullName?: string; displayName?: string; address?: { city: string; country: string } };
  status: { clock: number; displayClock: string; period: number; type: { id: string; name: string; state: string; completed: boolean; description: string; detail: string; shortDetail: string } };
  competitors: ESPNCompetitor[];
  details: Array<{
    type: { id: string; text: string };
    clock: { value: number; displayValue: string };
    team: { id: string };
    scoreValue: number;
    scoringPlay: boolean;
    redCard: boolean;
    yellowCard: boolean;
    penaltyKick: boolean;
    ownGoal: boolean;
    athletesInvolved?: Array<{ id: string; displayName: string; shortName: string; fullName: string; jersey: string }>;
  }>;
  altGameNote?: string;
  headlines?: Array<{ description: string; type: string; shortLinkText: string }>;
}

interface ESPNCompetitor {
  id: string;
  homeAway: 'home' | 'away';
  score: string;
  winner: boolean;
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    name: string;
    location: string;
    logo: string;
    color: string;
    alternateColor: string;
  };
  records?: Array<{ name: string; type: string; summary: string }>;
  statistics?: Array<{ name: string; abbreviation: string; displayValue: string }>;
}

// --- Config ---
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');
const ESPN_API = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';

// Our original 32 teams mapping
const ESPN_TO_APP_TEAM_IDS: Record<string, string> = {
  'USA': 't-usa', 'MEX': 't-mex', 'CAN': 't-can', 'COL': 't-col',
  'ENG': 't-eng', 'SEN': 't-sen', 'UKR': 't-ukr', 'AUS': 't-aus',
  'ARG': 't-arg', 'POL': 't-pol', 'KSA': 't-sau', 'EGY': 't-egy',
  'FRA': 't-fra', 'DEN': 't-den', 'TUN': 't-tun', 'PER': 't-per',
  'ESP': 't-esp', 'GER': 't-ger', 'JPN': 't-jpn', 'CRC': 't-crc',
  'BEL': 't-bel', 'CRO': 't-cro', 'MAR': 't-mar', 'KOR': 't-kor',
  'BRA': 't-bra', 'SUI': 't-sui', 'SRB': 't-srb', 'CMR': 't-cmr',
  'POR': 't-por', 'URU': 't-ury', 'GHA': 't-gha', 'IRN': 't-irn',
  'AUT': 't-aut', 'JOR': 't-jor', 'COD': 't-cod', 'PAN': 't-pan',
  'UZB': 't-uzb',
};

// ESPN abbreviation -> country name for flag URLs
const ESPN_TO_FLAG: Record<string, string> = {
  'USA': 'us', 'MEX': 'mx', 'CAN': 'ca', 'COL': 'co',
  'ENG': 'gb-eng', 'SEN': 'sn', 'UKR': 'ua', 'AUS': 'au',
  'ARG': 'ar', 'POL': 'pl', 'KSA': 'sa', 'EGY': 'eg',
  'FRA': 'fr', 'DEN': 'dk', 'TUN': 'tn', 'PER': 'pe',
  'ESP': 'es', 'GER': 'de', 'JPN': 'jp', 'CRC': 'cr',
  'BEL': 'be', 'CRO': 'hr', 'MAR': 'ma', 'KOR': 'kr',
  'BRA': 'br', 'SUI': 'ch', 'SRB': 'rs', 'CMR': 'cm',
  'POR': 'pt', 'URU': 'uy', 'GHA': 'gh', 'IRN': 'ir',
  'AUT': 'at', 'JOR': 'jo', 'COD': 'cd', 'PAN': 'pa',
  'UZB': 'uz',
};

// Emoji flags lookup
const ESPN_TO_EMOJI: Record<string, string> = {
  'USA': '🇺🇸', 'MEX': '🇲🇽', 'CAN': '🇨🇦', 'COL': '🇨🇴',
  'ENG': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'SEN': '🇸🇳', 'UKR': '🇺🇦', 'AUS': '🇦🇺',
  'ARG': '🇦🇷', 'POL': '🇵🇱', 'KSA': '🇸🇦', 'EGY': '🇪🇬',
  'FRA': '🇫🇷', 'DEN': '🇩🇰', 'TUN': '🇹🇳', 'PER': '🇵🇪',
  'ESP': '🇪🇸', 'GER': '🇩🇪', 'JPN': '🇯🇵', 'CRC': '🇨🇷',
  'BEL': '🇧🇪', 'CRO': '🇭🇷', 'MAR': '🇲🇦', 'KOR': '🇰🇷',
  'BRA': '🇧🇷', 'SUI': '🇨🇭', 'SRB': '🇷🇸', 'CMR': '🇨🇲',
  'POR': '🇵🇹', 'URU': '🇺🇾', 'GHA': '🇬🇭', 'IRN': '🇮🇷',
  'AUT': '🇦🇹', 'JOR': '🇯🇴', 'COD': '🇨🇩', 'PAN': '🇵🇦',
  'UZB': '🇺🇿',
};

async function main() {
  console.log('🌍 Fetching World Cup data from ESPN...');
  
  let espnData: ESPNResponse;
  try {
    const response = await fetch(ESPN_API);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    espnData = await response.json();
    console.log(`✅ Fetched ${espnData.events.length} events from ESPN`);
  } catch (error) {
    console.error('❌ Failed to fetch ESPN data:', error);
    process.exit(1);
  }

  // Build generated matches
  const generatedMatches: any[] = [];
  
  for (const event of espnData.events) {
    const competition = event.competitions[0];
    if (!competition) continue;

    const homeComp = competition.competitors.find(c => c.homeAway === 'home');
    const awayComp = competition.competitors.find(c => c.homeAway === 'away');
    if (!homeComp || !awayComp) continue;

    const homeAbbr = homeComp.team.abbreviation;
    const awayAbbr = awayComp.team.abbreviation;
    const homeScore = parseInt(homeComp.score, 10) || 0;
    const awayScore = parseInt(awayComp.score, 10) || 0;

    // Map status
    const typeId = competition.status.type.id;
    let status: string;
    if (['1', '5'].includes(typeId)) status = 'SCHEDULED';
    else if (['2', '4', '31'].includes(typeId)) status = 'LIVE';
    else if (['3', '32'].includes(typeId)) status = 'HALFTIME';
    else if (['28', '29', '30'].includes(typeId)) status = 'FT';
    else if (competition.status.type.state === 'post') status = 'FT';
    else if (competition.status.type.state === 'pre') status = 'SCHEDULED';
    else status = 'LIVE';

    const clockMinutes = Math.floor(competition.status.clock / 60);
    const minute = (status === 'LIVE' || status === 'HALFTIME') ? (clockMinutes || 45) : null;

    // Extract group from altGameNote
    const altNote = competition.altGameNote || '';
    const groupMatch = altNote.match(/Group\s+([A-P])/);
    const group = groupMatch ? groupMatch[1] : '?';

    // Matchday info
    let matchdayId = 'md-1';
    let matchdayName = 'Matchday 1';
    const noteLower = altNote.toLowerCase();
    if (noteLower.includes('group')) { matchdayId = 'md-1'; matchdayName = 'Matchday 1'; }
    else if (noteLower.includes('round of 32')) { matchdayId = 'md-16'; matchdayName = 'Round of 32'; }
    else if (noteLower.includes('round of 16')) { matchdayId = 'md-16'; matchdayName = 'Round of 16'; }
    else if (noteLower.includes('quarter')) { matchdayId = 'md-qf'; matchdayName = 'Quarter-finals'; }
    else if (noteLower.includes('semi')) { matchdayId = 'md-sf'; matchdayName = 'Semi-finals'; }
    else if (noteLower.includes('3rd') || noteLower.includes('third')) { matchdayId = 'md-f'; matchdayName = 'Third Place'; }
    else if (noteLower.includes('final')) { matchdayId = 'md-f'; matchdayName = 'Final'; }

    // Parse events
    const events: any[] = (competition.details || []).map((d, idx) => {
      const team: 'home' | 'away' = d.team.id === homeComp.team.id ? 'home' : 'away';
      const playerName = d.athletesInvolved?.[0]?.displayName || 'Unknown';
      let type = 'GOAL';
      if (d.yellowCard) type = 'YELLOW_CARD';
      else if (d.redCard) type = 'RED_CARD';
      else if (d.ownGoal) type = 'OWN_GOAL';
      else if (d.penaltyKick && d.scoringPlay) type = 'PENALTY';

      const evt: any = {
        id: `ge-${event.id}-${idx}`,
        type,
        minute: Math.floor(d.clock.value / 60) || 0,
        player: playerName,
        team,
      };
      if (d.ownGoal) evt.description = `Own Goal by ${playerName}`;
      return evt;
    });

    // Parse stats
    const homeStats = homeComp.statistics || [];
    const awayStats = awayComp.statistics || [];
    const extract = (stats: typeof homeStats, key: string) => {
      const f = stats.find(s => s.abbreviation === key);
      return f ? parseInt(f.displayValue, 10) || 0 : 0;
    };

    generatedMatches.push({
      id: `espn-${event.id}`,
      matchdayId,
      matchdayName,
      homeTeam: {
        id: ESPN_TO_APP_TEAM_IDS[homeAbbr] || `t-espn-${homeAbbr.toLowerCase()}`,
        name: homeComp.team.displayName,
        shortName: homeAbbr,
        flag: ESPN_TO_EMOJI[homeAbbr] || '',
        group,
        color: homeComp.team.color ? `#${homeComp.team.color}` : '#666',
        secondaryColor: homeComp.team.alternateColor ? `#${homeComp.team.alternateColor}` : '#333',
      },
      awayTeam: {
        id: ESPN_TO_APP_TEAM_IDS[awayAbbr] || `t-espn-${awayAbbr.toLowerCase()}`,
        name: awayComp.team.displayName,
        shortName: awayAbbr,
        flag: ESPN_TO_EMOJI[awayAbbr] || '',
        group,
        color: awayComp.team.color ? `#${awayComp.team.color}` : '#666',
        secondaryColor: awayComp.team.alternateColor ? `#${awayComp.team.alternateColor}` : '#333',
      },
      score: { home: homeScore, away: awayScore },
      status,
      minute,
      startTime: event.date,
      venue: competition.venue?.fullName || competition.venue?.displayName || 'TBD',
      isFavorite: false,
      events,
      stats: {
        possession: { home: extract(homeStats, 'PP'), away: extract(awayStats, 'PP') },
        shots: { home: extract(homeStats, 'SHOT'), away: extract(awayStats, 'SHOT') },
        shotsOnTarget: { home: extract(homeStats, 'SOG'), away: extract(awayStats, 'SOG') },
        corners: { home: extract(homeStats, 'CW'), away: extract(awayStats, 'CW') },
        fouls: { home: extract(homeStats, 'FC'), away: extract(awayStats, 'FC') },
        yellowCards: { home: 0, away: 0 },
        redCards: { home: 0, away: 0 },
        offsides: { home: 0, away: 0 },
      },
      lineups: {
        home: { formation: 'N/A', starting: [], substitutes: [] },
        away: { formation: 'N/A', starting: [], substitutes: [] },
      },
    });
  }

  // --- Write generated-matches.ts ---
  const matchesFile = `// Auto-generated by scripts/fetch-data.ts
// Generated at: ${new Date().toISOString()}
// Source: ESPN API (${ESPN_API})

import { Match } from '@/types';

export const GENERATED_MATCHES: Match[] = ${JSON.stringify(generatedMatches, null, 2)};
`;
  
  fs.writeFileSync(path.join(DATA_DIR, 'generated-matches.ts'), matchesFile, 'utf-8');
  console.log(`✅ Wrote ${generatedMatches.length} matches to src/data/generated-matches.ts`);

  // --- Write data-timestamp.ts ---
  const timestampFile = `// Auto-generated by scripts/fetch-data.ts
export const DATA_TIMESTAMP = '${new Date().toISOString()}';
export const DATA_SOURCE = 'ESPN Public API';
`;
  fs.writeFileSync(path.join(DATA_DIR, 'data-timestamp.ts'), timestampFile, 'utf-8');
  console.log(`✅ Wrote timestamp to src/data/data-timestamp.ts`);

  // --- Generate standings ---
  console.log('📊 Generating standings...');
  const standingsByGroup = new Map<string, Map<string, {
    teamId: string;
    teamName: string;
    teamFlag: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  }>>();

  for (const match of generatedMatches) {
    if (match.status === 'SCHEDULED' || match.matchdayId !== 'md-1') continue;
    const group = match.homeTeam.group;
    if (group === '?' || !group) continue;

    if (!standingsByGroup.has(group)) {
      standingsByGroup.set(group, new Map());
    }
    const groupTable = standingsByGroup.get(group)!;

    const homeId = match.homeTeam.id;
    const awayId = match.awayTeam.id;

    // Initialize teams if not present
    for (const [teamId, team] of [[homeId, match.homeTeam], [awayId, match.awayTeam]] as const) {
      if (!groupTable.has(teamId)) {
        groupTable.set(teamId, {
          teamId,
          teamName: team.name,
          teamFlag: team.flag,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        });
      }
    }

    const home = groupTable.get(homeId)!;
    const away = groupTable.get(awayId)!;
    const gh = match.score.home;
    const ga = match.score.away;

    home.played++;
    away.played++;
    home.goalsFor += gh;
    home.goalsAgainst += ga;
    away.goalsFor += ga;
    away.goalsAgainst += gh;

    if (gh > ga) { home.won++; home.points += 3; away.lost++; }
    else if (gh < ga) { away.won++; away.points += 3; home.lost++; }
    else { home.drawn++; away.drawn++; home.points++; away.points++; }
  }

  const generatedStandings: any[] = [];
  for (const [groupId, teams] of standingsByGroup) {
    const sorted = Array.from(teams.values())
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const gdA = a.goalsFor - a.goalsAgainst;
        const gdB = b.goalsFor - b.goalsAgainst;
        if (gdB !== gdA) return gdB - gdA;
        return b.goalsFor - a.goalsFor;
      })
      .map((entry, idx) => ({
        position: idx + 1,
        teamId: entry.teamId,
        teamName: entry.teamName,
        teamFlag: entry.teamFlag,
        played: entry.played,
        won: entry.won,
        drawn: entry.drawn,
        lost: entry.lost,
        goalsFor: entry.goalsFor,
        goalsAgainst: entry.goalsAgainst,
        goalDifference: entry.goalsFor - entry.goalsAgainst,
        points: entry.points,
      }));

    generatedStandings.push({
      groupId,
      name: `Group ${groupId}`,
      teams: sorted,
    });
  }

  const standingsFile = `// Auto-generated by scripts/fetch-data.ts
// Generated at: ${new Date().toISOString()}

import { GroupTable } from '@/types';

export const GENERATED_STANDINGS: GroupTable[] = ${JSON.stringify(generatedStandings, null, 2)} as const;
`;
  fs.writeFileSync(path.join(DATA_DIR, 'generated-standings.ts'), standingsFile, 'utf-8');
  console.log(`✅ Wrote standings for ${generatedStandings.length} groups to src/data/generated-standings.ts`);

  console.log('');
  console.log('🎉 Data generation complete!');
  console.log(`   Generated at: ${new Date().toLocaleString()}`);
  console.log(`   Matches: ${generatedMatches.length}`);
  console.log(`   Groups with standings: ${generatedStandings.length}`);
  console.log('');
  console.log('Run `npm run build` to rebuild the app with fresh data.');
}

main().catch(console.error);