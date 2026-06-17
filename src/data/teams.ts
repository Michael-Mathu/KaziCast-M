import { Team, Player } from '@/types';

export const WORLD_CUP_TEAMS: Record<string, Team> = {
  // Group A
  usa: { id: 't-usa', name: 'United States', shortName: 'USA', flag: '🇺🇸', group: 'A', color: '#002868', secondaryColor: '#BF0A30' },
  mex: { id: 't-mex', name: 'Mexico', shortName: 'MEX', flag: '🇲🇽', group: 'A', color: '#006847', secondaryColor: '#CE1126' },
  can: { id: 't-can', name: 'Canada', shortName: 'CAN', flag: '🇨🇦', group: 'A', color: '#FF0000', secondaryColor: '#FFFFFF' },
  col: { id: 't-col', name: 'Colombia', shortName: 'COL', flag: '🇨🇴', group: 'A', color: '#FCD116', secondaryColor: '#003893' },

  // Group B
  eng: { id: 't-eng', name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'B', color: '#FFFFFF', secondaryColor: '#CE1124' },
  sen: { id: 't-sen', name: 'Senegal', shortName: 'SEN', flag: '🇸🇳', group: 'B', color: '#00853F', secondaryColor: '#FDEF42' },
  ukr: { id: 't-ukr', name: 'Ukraine', shortName: 'UKR', flag: '🇺🇦', group: 'B', color: '#FFD700', secondaryColor: '#0057B7' },
  aus: { id: 't-aus', name: 'Australia', shortName: 'AUS', flag: '🇦🇺', group: 'B', color: '#000031', secondaryColor: '#FFCD00' },

  // Group C
  arg: { id: 't-arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', group: 'C', color: '#74ACDF', secondaryColor: '#FFFFFF' },
  pol: { id: 't-pol', name: 'Poland', shortName: 'POL', flag: '🇵🇱', group: 'C', color: '#FFFFFF', secondaryColor: '#DC143C' },
  sau: { id: 't-sau', name: 'Saudi Arabia', shortName: 'KSA', flag: '🇸🇦', group: 'C', color: '#006C35', secondaryColor: '#FFFFFF' },
  egy: { id: 't-egy', name: 'Egypt', shortName: 'EGY', flag: '🇪🇬', group: 'C', color: '#C8102E', secondaryColor: '#000000' },

  // Group D
  fra: { id: 't-fra', name: 'France', shortName: 'FRA', flag: '🇫🇷', group: 'D', color: '#002395', secondaryColor: '#ED2939' },
  den: { id: 't-den', name: 'Denmark', shortName: 'DEN', flag: '🇩🇰', group: 'D', color: '#C8102E', secondaryColor: '#FFFFFF' },
  tun: { id: 't-tun', name: 'Tunisia', shortName: 'TUN', flag: '🇹🇳', group: 'D', color: '#E70013', secondaryColor: '#FFFFFF' },
  per: { id: 't-per', name: 'Peru', shortName: 'PER', flag: '🇵🇪', group: 'D', color: '#D91A2A', secondaryColor: '#FFFFFF' },

  // Group E
  esp: { id: 't-esp', name: 'Spain', shortName: 'ESP', flag: '🇪🇸', group: 'E', color: '#C10024', secondaryColor: '#EDB900' },
  ger: { id: 't-ger', name: 'Germany', shortName: 'GER', flag: '🇩🇪', group: 'E', color: '#FFFFFF', secondaryColor: '#000000' },
  jpn: { id: 't-jpn', name: 'Japan', shortName: 'JPN', flag: '🇯🇵', group: 'E', color: '#00005C', secondaryColor: '#FFFFFF' },
  crc: { id: 't-crc', name: 'Costa Rica', shortName: 'CRC', flag: '🇨🇷', group: 'E', color: '#001489', secondaryColor: '#DA291C' },

  // Group F
  bel: { id: 't-bel', name: 'Belgium', shortName: 'BEL', flag: '🇧🇪', group: 'F', color: '#E30613', secondaryColor: '#000000' },
  cro: { id: 't-cro', name: 'Croatia', shortName: 'CRO', flag: '🇭🇷', group: 'F', color: '#FFFFFF', secondaryColor: '#FF0000' },
  mar: { id: 't-mar', name: 'Morocco', shortName: 'MAR', flag: '🇲🇦', group: 'F', color: '#C1272D', secondaryColor: '#006233' },
  kor: { id: 't-kor', name: 'South Korea', shortName: 'KOR', flag: '🇰🇷', group: 'F', color: '#CD2E3A', secondaryColor: '#FFFFFF' },

  // Group G
  bra: { id: 't-bra', name: 'Brazil', shortName: 'BRA', flag: '🇧🇷', group: 'G', color: '#FEDF00', secondaryColor: '#009739' },
  sui: { id: 't-sui', name: 'Switzerland', shortName: 'SUI', flag: '🇨🇭', group: 'G', color: '#D52B1E', secondaryColor: '#FFFFFF' },
  srb: { id: 't-srb', name: 'Serbia', shortName: 'SRB', flag: '🇷🇸', group: 'G', color: '#C1272D', secondaryColor: '#0C2340' },
  cmr: { id: 't-cmr', name: 'Cameroon', shortName: 'CMR', flag: '🇨🇲', group: 'G', color: '#007A5E', secondaryColor: '#CE1126' },

  // Group H
  por: { id: 't-por', name: 'Portugal', shortName: 'POR', flag: '🇵🇹', group: 'H', color: '#FF0000', secondaryColor: '#006600' },
  ury: { id: 't-ury', name: 'Uruguay', shortName: 'URU', flag: '🇺🇾', group: 'H', color: '#43A1D5', secondaryColor: '#FFFFFF' },
  gha: { id: 't-gha', name: 'Ghana', shortName: 'GHA', flag: '🇬🇭', group: 'H', color: '#FFFFFF', secondaryColor: '#FCD116' },
  irn: { id: 't-irn', name: 'Iran', shortName: 'IRN', flag: '🇮🇷', group: 'H', color: '#239F40', secondaryColor: '#DA291C' }
};

export const SUPERSTAR_PROFILES: Record<string, { name: string; age: number; club: string; caps: number; number: number }> = {
  't-arg': { name: 'Lionel Messi', age: 38, club: 'Inter Miami CF', caps: 184, number: 10 },
  't-fra': { name: 'Kylian Mbappé', age: 27, club: 'Real Madrid', caps: 84, number: 10 },
  't-eng': { name: 'Jude Bellingham', age: 22, club: 'Real Madrid', caps: 42, number: 10 },
  't-esp': { name: 'Rodri', age: 29, club: 'Manchester City', caps: 56, number: 16 },
  't-bra': { name: 'Vinicius Júnior', age: 25, club: 'Real Madrid', caps: 35, number: 7 },
  't-por': { name: 'Cristiano Ronaldo', age: 41, club: 'Al-Nassr FC', caps: 212, number: 7 },
  't-usa': { name: 'Christian Pulisic', age: 27, club: 'AC Milan', caps: 68, number: 10 },
  't-kor': { name: 'Son Heung-min', age: 33, club: 'Tottenham Hotspur', caps: 125, number: 7 }
};

const CLUBS = ['Real Madrid', 'Manchester City', 'FC Barcelona', 'Arsenal', 'Bayern Munich', 'Paris Saint-Germain', 'Liverpool', 'Inter Milan', 'Juventus', 'Chelsea'];
const FIRST_NAMES = ['Alexander', 'Mateo', 'Lucas', 'Oliver', 'Thomas', 'David', 'James', 'Hugo', 'Luis', 'Sandro', 'Gabriel', 'Ivan', 'Samuel', 'Min-woo', 'Aki', 'Tariq'];
const LAST_NAMES = ['Smith', 'Garcia', 'Muller', 'Dupont', 'Silva', 'Jones', 'Kovacic', 'Al-Dawsari', 'Mensah', 'Kim', 'Sato', 'Ivanov', 'Rodriguez', 'Onyango'];

// Seeded PRNG (mulberry32) for deterministic squad generation
function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function createRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Pre-generate all squads deterministically at module load time
const ALL_SQUADS = new Map<string, Player[]>();

function buildSquad(teamId: string): void {
  const squad: Player[] = [];
  const star = SUPERSTAR_PROFILES[teamId];
  const rng = createRng(hashSeed(teamId));

  // 1. Add Star Player
  if (star) {
    squad.push({
      id: `${teamId}-star`,
      name: star.name,
      number: star.number,
      position: 'FW',
      rating: 8.4,
      x: 50,
      y: 22,
      age: star.age,
      club: star.club,
      caps: star.caps,
      stats: { goals: 2, assists: 1, shots: 8, passes: 84, fouls: 2 }
    });
  }

  const shuffledLast = seededShuffle(LAST_NAMES, rng);
  const shuffledFirst = seededShuffle(FIRST_NAMES, rng);
  const shuffledClubs = seededShuffle(CLUBS, rng);
  let fi = 0, li = 0, ci = 0;
  const nextName = () => {
    const n = `${shuffledFirst[fi % shuffledFirst.length]} ${shuffledLast[li % shuffledLast.length]}`;
    fi++; li++;
    return n;
  };
  const nextClub = () => {
    const c = shuffledClubs[ci % shuffledClubs.length];
    ci++;
    return c;
  };

  // Goalkeeper
  squad.push({
    id: `${teamId}-gk`,
    name: `GK ${shuffledLast[li++ % shuffledLast.length]}`,
    number: 1,
    position: 'GK',
    rating: 7.1,
    x: 50,
    y: 90,
    age: 28 + Math.floor(rng() * 8),
    club: nextClub(),
    caps: 12 + Math.floor(rng() * 40),
    stats: { goals: 0, assists: 0, shots: 0, passes: 120, fouls: 0 }
  });

  // Defenders
  const defCoords = [
    { x: 15, y: 70 },
    { x: 38, y: 75 },
    { x: 62, y: 75 },
    { x: 85, y: 70 }
  ];
  defCoords.forEach((coord, idx) => {
    squad.push({
      id: `${teamId}-df-${idx}`,
      name: nextName(),
      number: 2 + idx,
      position: 'DF',
      rating: 6.8 + parseFloat((rng() * 1.2).toFixed(1)),
      x: coord.x,
      y: coord.y,
      age: 21 + Math.floor(rng() * 12),
      club: nextClub(),
      caps: 5 + Math.floor(rng() * 50)
    });
  });

  // Midfielders
  const mfCoords = [
    { x: 30, y: 52 },
    { x: 50, y: 55 },
    { x: 70, y: 52 }
  ];
  mfCoords.forEach((coord, idx) => {
    squad.push({
      id: `${teamId}-mf-${idx}`,
      name: nextName(),
      number: 6 + idx,
      position: 'MF',
      rating: 6.9 + parseFloat((rng() * 1.4).toFixed(1)),
      x: coord.x,
      y: coord.y,
      age: 19 + Math.floor(rng() * 14),
      club: nextClub(),
      caps: 8 + Math.floor(rng() * 60)
    });
  });

  // Forwards
  const fwCoords = [
    { x: 25, y: 30 },
    { x: 75, y: 30 }
  ];
  fwCoords.forEach((coord, idx) => {
    squad.push({
      id: `${teamId}-fw-${idx}`,
      name: nextName(),
      number: 9 + (idx * 2),
      position: 'FW',
      rating: 6.6 + parseFloat((rng() * 1.5).toFixed(1)),
      x: coord.x,
      y: coord.y,
      age: 20 + Math.floor(rng() * 12),
      club: nextClub(),
      caps: 4 + Math.floor(rng() * 45)
    });
  });

  // Fill in substitutes up to 26 total players
  const subCount = 26 - squad.length;
  for (let i = 0; i < subCount; i++) {
    const posIdx = Math.floor(rng() * 3);
    const pos = ['DF', 'MF', 'FW'][posIdx] as 'DF' | 'MF' | 'FW';
    squad.push({
      id: `${teamId}-sub-${i}`,
      name: nextName(),
      number: 12 + i,
      position: pos,
      rating: 6.0 + parseFloat((rng() * 1.2).toFixed(1)),
      x: 0,
      y: 0,
      age: 18 + Math.floor(rng() * 16),
      club: nextClub(),
      caps: Math.floor(rng() * 30)
    });
  }

  ALL_SQUADS.set(teamId, squad);
}

// Build all 32 team squads at module load time
Object.keys(WORLD_CUP_TEAMS).forEach(key => {
  const team = WORLD_CUP_TEAMS[key];
  buildSquad(team.id);
});

export function generateSquad(teamId: string): Player[] {
  return ALL_SQUADS.get(teamId) || [];
}

export function adjustAwayCoordinates(players: Player[]): Player[] {
  return players.map(p => ({
    ...p,
    y: 100 - p.y
  }));
}

export function getLineups(homeId: string, awayId: string) {
  const homeSquad = generateSquad(homeId);
  const awaySquad = generateSquad(awayId);

  const homeStarting = homeSquad.filter(p => p.x > 0);
  const homeSubs = homeSquad.filter(p => p.x === 0);

  const awayStarting = adjustAwayCoordinates(awaySquad.filter(p => p.x > 0));
  const awaySubs = awaySquad.filter(p => p.x === 0);

  return {
    home: { formation: '4-3-3', starting: homeStarting, substitutes: homeSubs },
    away: { formation: '4-3-3', starting: awayStarting, substitutes: awaySubs }
  };
}