export interface MatchEvent {
  id: string;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'OWN_GOAL' | 'PENALTY';
  minute: number;
  player: string;
  team: 'home' | 'away';
  assist?: string;
  description?: string;
}

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  offsides: { home: number; away: number };
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  rating: number;
  x: number; // percentage from left (0 - 100) on the pitch
  y: number; // percentage from top (0 - 100) on the pitch
  age: number;
  club: string; // e.g. "Real Madrid"
  caps: number; // e.g. 84
  stats?: {
    goals?: number;
    assists?: number;
    shots?: number;
    passes?: number;
    fouls?: number;
  };
}

export interface Lineups {
  formation: string;
  starting: Player[];
  substitutes: Omit<Player, 'x' | 'y'>[];
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  secondaryColor: string;
  flag: string; // Emoji flag e.g. "🇦🇷"
  group: string; // Group letter: 'A'-'P' for 2026 World Cup, or '?' for unknown
}

export interface Match {
  id: string;
  matchdayId: 'md-1' | 'md-2' | 'md-3' | 'md-16' | 'md-qf' | 'md-sf' | 'md-f';
  matchdayName: string; // e.g. "Matchday 1", "Round of 16"
  homeTeam: Team;
  awayTeam: Team;
  score: {
    home: number;
    away: number;
  };
  status: 'SCHEDULED' | 'LIVE' | 'HALFTIME' | 'FT' | 'POSTPONED' | 'CANCELLED';
  minute: number | null; // null if not live
  startTime: string; // ISO 8601
  venue: string;
  events: MatchEvent[];
  stats: MatchStats;
  lineups: {
    home: Lineups;
    away: Lineups;
  };
  isFavorite: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string; // HTML content
  image: string;
  category: 'Transfers' | 'Injuries' | 'Match Reports' | 'Features' | 'General';
  source: {
    name: string;
    logo: string;
  };
  author?: string;
  publishedAt: string; // ISO 8601
  readTime: number; // minutes
  relatedArticles: string[]; // article/match IDs
  isFeatured: boolean;
}

export interface GroupTableEntry {
  position: number;
  teamId: string;
  teamName: string;
  teamFlag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupTable {
  groupId: string; // 'A' through 'P' for 2026 World Cup
  name: string; // e.g. "Group A"
  teams: GroupTableEntry[];
}

// Bracket round representation
export interface BracketMatch {
  id: string;
  homeTeam: Team | null; // null means TBD
  awayTeam: Team | null;
  homeScore?: number;
  awayScore?: number;
  status: 'SCHEDULED' | 'LIVE' | 'FT';
  startTime: string;
  winnerId?: string;
}
