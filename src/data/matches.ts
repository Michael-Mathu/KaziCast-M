import { Match } from '@/types';
import { WORLD_CUP_TEAMS, getLineups } from './teams';

// Helper to calculate mock dates
const getRelativeDate = (offsetDays: number, hoursOffset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(12 + hoursOffset);
  d.setMinutes(0);
  d.setSeconds(0);
  return d.toISOString();
};

// 64 matches - 48 Group Stage, 8 Round of 16, 4 Quarters, 2 Semis, 1 Third Place, 1 Final
export const MOCK_MATCHES: Match[] = [
  // GROUP A Matches
  {
    id: 'wc-1',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.usa,
    awayTeam: WORLD_CUP_TEAMS.mex,
    score: { home: 2, away: 1 },
    status: 'LIVE',
    minute: 85,
    startTime: getRelativeDate(0, -2),
    venue: 'MetLife Stadium, New York',
    isFavorite: false,
    events: [
      { id: 'we-1', type: 'GOAL', minute: 18, player: 'Christian Pulisic', team: 'home', description: 'Curled in from the edge of the box' },
      { id: 'we-2', type: 'YELLOW_CARD', minute: 34, player: 'Edson Alvarez', team: 'away' },
      { id: 'we-3', type: 'GOAL', minute: 55, player: 'Santiago Gimenez', team: 'away', description: 'Header from close range' },
      { id: 'we-4', type: 'GOAL', minute: 79, player: 'Timothy Weah', team: 'home', assist: 'Christian Pulisic' }
    ],
    stats: { possession: { home: 54, away: 46 }, shots: { home: 12, away: 7 }, shotsOnTarget: { home: 5, away: 2 }, corners: { home: 6, away: 3 }, fouls: { home: 11, away: 14 }, yellowCards: { home: 0, away: 1 }, redCards: { home: 0, away: 0 }, offsides: { home: 1, away: 2 } },
    lineups: getLineups('t-usa', 't-mex')
  },
  {
    id: 'wc-2',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.can,
    awayTeam: WORLD_CUP_TEAMS.col,
    score: { home: 1, away: 3 },
    status: 'FT',
    minute: 90,
    startTime: getRelativeDate(-1, -4),
    venue: 'BC Place, Vancouver',
    isFavorite: false,
    events: [
      { id: 'we-21', type: 'GOAL', minute: 12, player: 'Luis Diaz', team: 'away' },
      { id: 'we-22', type: 'GOAL', minute: 40, player: 'James Rodriguez', team: 'away' },
      { id: 'we-23', type: 'GOAL', minute: 67, player: 'Jonathan David', team: 'home' },
      { id: 'we-24', type: 'GOAL', minute: 88, player: 'Jhon Duran', team: 'away' }
    ],
    stats: { possession: { home: 42, away: 58 }, shots: { home: 8, away: 14 }, shotsOnTarget: { home: 3, away: 8 }, corners: { home: 4, away: 6 }, fouls: { home: 12, away: 9 }, yellowCards: { home: 2, away: 1 }, redCards: { home: 0, away: 0 }, offsides: { home: 3, away: 1 } },
    lineups: getLineups('t-can', 't-col')
  },
  {
    id: 'wc-3',
    matchdayId: 'md-2',
    matchdayName: 'Matchday 2',
    homeTeam: WORLD_CUP_TEAMS.usa,
    awayTeam: WORLD_CUP_TEAMS.can,
    score: { home: 0, away: 0 },
    status: 'SCHEDULED',
    minute: null,
    startTime: getRelativeDate(1, 2),
    venue: 'Lumen Field, Seattle',
    isFavorite: false,
    events: [],
    stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, shotsOnTarget: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, yellowCards: { home: 0, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 0, away: 0 } },
    lineups: getLineups('t-usa', 't-can')
  },
  {
    id: 'wc-4',
    matchdayId: 'md-2',
    matchdayName: 'Matchday 2',
    homeTeam: WORLD_CUP_TEAMS.mex,
    awayTeam: WORLD_CUP_TEAMS.col,
    score: { home: 0, away: 0 },
    status: 'SCHEDULED',
    minute: null,
    startTime: getRelativeDate(1, 5),
    venue: 'Estadio Azteca, Mexico City',
    isFavorite: false,
    events: [],
    stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, shotsOnTarget: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, yellowCards: { home: 0, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 0, away: 0 } },
    lineups: getLineups('t-mex', 't-col')
  },

  // GROUP B Matches
  {
    id: 'wc-5',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.eng,
    awayTeam: WORLD_CUP_TEAMS.sen,
    score: { home: 2, away: 0 },
    status: 'FT',
    minute: 90,
    startTime: getRelativeDate(-2, 0),
    venue: 'SoFi Stadium, Los Angeles',
    isFavorite: false,
    events: [
      { id: 'we-51', type: 'GOAL', minute: 38, player: 'Jude Bellingham', team: 'home' },
      { id: 'we-52', type: 'GOAL', minute: 72, player: 'Harry Kane', team: 'home', assist: 'Jude Bellingham' }
    ],
    stats: { possession: { home: 61, away: 39 }, shots: { home: 15, away: 5 }, shotsOnTarget: { home: 7, away: 1 }, corners: { home: 7, away: 2 }, fouls: { home: 8, away: 12 }, yellowCards: { home: 0, away: 2 }, redCards: { home: 0, away: 0 }, offsides: { home: 2, away: 1 } },
    lineups: getLineups('t-eng', 't-sen')
  },
  {
    id: 'wc-6',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.ukr,
    awayTeam: WORLD_CUP_TEAMS.aus,
    score: { home: 2, away: 2 },
    status: 'LIVE',
    minute: 42,
    startTime: getRelativeDate(0, -1),
    venue: 'Gillette Stadium, Boston',
    isFavorite: false,
    events: [
      { id: 'we-61', type: 'GOAL', minute: 9, player: 'Artem Dovbyk', team: 'home' },
      { id: 'we-62', type: 'GOAL', minute: 21, player: 'Jackson Irvine', team: 'away' },
      { id: 'we-63', type: 'GOAL', minute: 31, player: 'Craig Goodwin', team: 'away' },
      { id: 'we-64', type: 'GOAL', minute: 38, player: 'Viktor Tsygankov', team: 'home' }
    ],
    stats: { possession: { home: 52, away: 48 }, shots: { home: 9, away: 7 }, shotsOnTarget: { home: 4, away: 3 }, corners: { home: 3, away: 4 }, fouls: { home: 7, away: 9 }, yellowCards: { home: 1, away: 1 }, redCards: { home: 0, away: 0 }, offsides: { home: 1, away: 2 } },
    lineups: getLineups('t-ukr', 't-aus')
  },

  // GROUP C Matches (Featuring Argentina / Messi)
  {
    id: 'wc-7',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.arg,
    awayTeam: WORLD_CUP_TEAMS.pol,
    score: { home: 2, away: 0 },
    status: 'FT',
    minute: 90,
    startTime: getRelativeDate(-3, -2),
    venue: 'AT&T Stadium, Dallas',
    isFavorite: false,
    events: [
      { id: 'we-71', type: 'GOAL', minute: 43, player: 'Lionel Messi', team: 'home', description: 'Free kick over the wall' },
      { id: 'we-72', type: 'GOAL', minute: 81, player: 'Julian Alvarez', team: 'home', assist: 'Lionel Messi' }
    ],
    stats: { possession: { home: 65, away: 35 }, shots: { home: 18, away: 4 }, shotsOnTarget: { home: 9, away: 1 }, corners: { home: 9, away: 1 }, fouls: { home: 6, away: 13 }, yellowCards: { home: 0, away: 3 }, redCards: { home: 0, away: 0 }, offsides: { home: 4, away: 1 } },
    lineups: getLineups('t-arg', 't-pol')
  },
  {
    id: 'wc-8',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.sau,
    awayTeam: WORLD_CUP_TEAMS.egy,
    score: { home: 1, away: 2 },
    status: 'FT',
    minute: 90,
    startTime: getRelativeDate(-3, 2),
    venue: 'NRG Stadium, Houston',
    isFavorite: false,
    events: [
      { id: 'we-81', type: 'GOAL', minute: 22, player: 'Mohamed Salah', team: 'away' },
      { id: 'we-82', type: 'GOAL', minute: 48, player: 'Salem Al-Dawsari', team: 'home' },
      { id: 'we-83', type: 'GOAL', minute: 76, player: 'Mostafa Mohamed', team: 'away', assist: 'Mohamed Salah' }
    ],
    stats: { possession: { home: 48, away: 52 }, shots: { home: 10, away: 12 }, shotsOnTarget: { home: 4, away: 6 }, corners: { home: 4, away: 5 }, fouls: { home: 11, away: 10 }, yellowCards: { home: 1, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 2, away: 1 } },
    lineups: getLineups('t-sau', 't-egy')
  },

  // GROUP D Matches (Featuring France / Mbappe)
  {
    id: 'wc-9',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.fra,
    awayTeam: WORLD_CUP_TEAMS.den,
    score: { home: 3, away: 1 },
    status: 'FT',
    minute: 90,
    startTime: getRelativeDate(-2, 4),
    venue: 'Mercedes-Benz Stadium, Atlanta',
    isFavorite: false,
    events: [
      { id: 'we-91', type: 'GOAL', minute: 14, player: 'Kylian Mbappé', team: 'home' },
      { id: 'we-92', type: 'GOAL', minute: 44, player: 'Christian Eriksen', team: 'away' },
      { id: 'we-93', type: 'GOAL', minute: 58, player: 'Antoine Griezmann', team: 'home', assist: 'Kylian Mbappé' },
      { id: 'we-94', type: 'GOAL', minute: 88, player: 'Kylian Mbappé', team: 'home' }
    ],
    stats: { possession: { home: 55, away: 45 }, shots: { home: 16, away: 9 }, shotsOnTarget: { home: 8, away: 3 }, corners: { home: 5, away: 4 }, fouls: { home: 8, away: 11 }, yellowCards: { home: 1, away: 2 }, redCards: { home: 0, away: 0 }, offsides: { home: 2, away: 2 } },
    lineups: getLineups('t-fra', 't-den')
  },

  // GROUP E Matches (Featuring Spain / Rodri)
  {
    id: 'wc-10',
    matchdayId: 'md-1',
    matchdayName: 'Matchday 1',
    homeTeam: WORLD_CUP_TEAMS.esp,
    awayTeam: WORLD_CUP_TEAMS.ger,
    score: { home: 1, away: 1 },
    status: 'HALFTIME',
    minute: 45,
    startTime: getRelativeDate(0, -3),
    venue: 'SoFi Stadium, Los Angeles',
    isFavorite: false,
    events: [
      { id: 'we-101', type: 'GOAL', minute: 29, player: 'Alvaro Morata', team: 'home', assist: 'Lamine Yamal' },
      { id: 'we-102', type: 'GOAL', minute: 43, player: 'Niclas Fullkrug', team: 'away' },
      { id: 'we-103', type: 'YELLOW_CARD', minute: 38, player: 'Rodri', team: 'home' }
    ],
    stats: { possession: { home: 58, away: 42 }, shots: { home: 7, away: 5 }, shotsOnTarget: { home: 3, away: 2 }, corners: { home: 4, away: 3 }, fouls: { home: 6, away: 9 }, yellowCards: { home: 1, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 2, away: 1 } },
    lineups: getLineups('t-esp', 't-ger')
  },

  // KNOCKOUT ROUND OF 16 MATCHES
  {
    id: 'wc-ko-1',
    matchdayId: 'md-16',
    matchdayName: 'Round of 16',
    homeTeam: WORLD_CUP_TEAMS.usa,
    awayTeam: WORLD_CUP_TEAMS.sen,
    score: { home: 0, away: 0 },
    status: 'SCHEDULED',
    minute: null,
    startTime: getRelativeDate(3, 1),
    venue: 'MetLife Stadium, New York',
    isFavorite: false,
    events: [],
    stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, shotsOnTarget: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, yellowCards: { home: 0, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 0, away: 0 } },
    lineups: getLineups('t-usa', 't-sen')
  },
  {
    id: 'wc-ko-2',
    matchdayId: 'md-16',
    matchdayName: 'Round of 16',
    homeTeam: WORLD_CUP_TEAMS.arg,
    awayTeam: WORLD_CUP_TEAMS.den,
    score: { home: 0, away: 0 },
    status: 'SCHEDULED',
    minute: null,
    startTime: getRelativeDate(3, 4),
    venue: 'SoFi Stadium, Los Angeles',
    isFavorite: false,
    events: [],
    stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, shotsOnTarget: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, yellowCards: { home: 0, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 0, away: 0 } },
    lineups: getLineups('t-arg', 't-den')
  },
  {
    id: 'wc-ko-3',
    matchdayId: 'md-16',
    matchdayName: 'Round of 16',
    homeTeam: WORLD_CUP_TEAMS.fra,
    awayTeam: WORLD_CUP_TEAMS.pol,
    score: { home: 0, away: 0 },
    status: 'SCHEDULED',
    minute: null,
    startTime: getRelativeDate(4, 1),
    venue: 'AT&T Stadium, Dallas',
    isFavorite: false,
    events: [],
    stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, shotsOnTarget: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, yellowCards: { home: 0, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 0, away: 0 } },
    lineups: getLineups('t-fra', 't-pol')
  },
  {
    id: 'wc-ko-4',
    matchdayId: 'md-16',
    matchdayName: 'Round of 16',
    homeTeam: WORLD_CUP_TEAMS.eng,
    awayTeam: WORLD_CUP_TEAMS.mex,
    score: { home: 0, away: 0 },
    status: 'SCHEDULED',
    minute: null,
    startTime: getRelativeDate(4, 4),
    venue: 'Hard Rock Stadium, Miami',
    isFavorite: false,
    events: [],
    stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, shotsOnTarget: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, yellowCards: { home: 0, away: 0 }, redCards: { home: 0, away: 0 }, offsides: { home: 0, away: 0 } },
    lineups: getLineups('t-eng', 't-mex')
  }
];