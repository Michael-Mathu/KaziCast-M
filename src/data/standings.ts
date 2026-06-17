import { GroupTable, BracketMatch } from '@/types';
import { WORLD_CUP_TEAMS } from './teams';

// Helper to calculate mock dates
const getRelativeDate = (offsetDays: number, hoursOffset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(12 + hoursOffset);
  d.setMinutes(0);
  d.setSeconds(0);
  return d.toISOString();
};

export const MOCK_GROUPS_TABLES: GroupTable[] = [
  {
    groupId: 'A',
    name: 'Group A',
    teams: [
      { position: 1, teamId: 't-col', teamName: 'Colombia', teamFlag: '🇨🇴', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
      { position: 2, teamId: 't-usa', teamName: 'United States', teamFlag: '🇺🇸', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
      { position: 3, teamId: 't-mex', teamName: 'Mexico', teamFlag: '🇲🇽', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 },
      { position: 4, teamId: 't-can', teamName: 'Canada', teamFlag: '🇨🇦', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 }
    ]
  },
  {
    groupId: 'B',
    name: 'Group B',
    teams: [
      { position: 1, teamId: 't-eng', teamName: 'England', teamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
      { position: 2, teamId: 't-ukr', teamName: 'Ukraine', teamFlag: '🇺🇦', played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 1 },
      { position: 3, teamId: 't-aus', teamName: 'Australia', teamFlag: '🇦🇺', played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 1 },
      { position: 4, teamId: 't-sen', teamName: 'Senegal', teamFlag: '🇸🇳', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 }
    ]
  },
  {
    groupId: 'C',
    name: 'Group C',
    teams: [
      { position: 1, teamId: 't-arg', teamName: 'Argentina', teamFlag: '🇦🇷', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
      { position: 2, teamId: 't-egy', teamName: 'Egypt', teamFlag: '🇪🇬', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
      { position: 3, teamId: 't-sau', teamName: 'Saudi Arabia', teamFlag: '🇸🇦', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 },
      { position: 4, teamId: 't-pol', teamName: 'Poland', teamFlag: '🇵🇱', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 }
    ]
  },
  {
    groupId: 'D',
    name: 'Group D',
    teams: [
      { position: 1, teamId: 't-fra', teamName: 'France', teamFlag: '🇫🇷', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
      { position: 2, teamId: 't-den', teamName: 'Denmark', teamFlag: '🇩🇰', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 },
      { position: 3, teamId: 't-tun', teamName: 'Tunisia', teamFlag: '🇹🇳', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { position: 4, teamId: 't-per', teamName: 'Peru', teamFlag: '🇵🇪', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]
  }
];

export const MOCK_BRACKET: Record<string, BracketMatch[]> = {
  roundOf16: [
    { id: 'b1', homeTeam: WORLD_CUP_TEAMS.usa, awayTeam: WORLD_CUP_TEAMS.sen, status: 'SCHEDULED', startTime: getRelativeDate(3, 1) },
    { id: 'b2', homeTeam: WORLD_CUP_TEAMS.arg, awayTeam: WORLD_CUP_TEAMS.den, status: 'SCHEDULED', startTime: getRelativeDate(3, 4) },
    { id: 'b3', homeTeam: WORLD_CUP_TEAMS.fra, awayTeam: WORLD_CUP_TEAMS.pol, status: 'SCHEDULED', startTime: getRelativeDate(4, 1) },
    { id: 'b4', homeTeam: WORLD_CUP_TEAMS.eng, awayTeam: WORLD_CUP_TEAMS.mex, status: 'SCHEDULED', startTime: getRelativeDate(4, 4) }
  ],
  quarters: [
    { id: 'b5', homeTeam: null, awayTeam: null, status: 'SCHEDULED', startTime: getRelativeDate(6, 1) },
    { id: 'b6', homeTeam: null, awayTeam: null, status: 'SCHEDULED', startTime: getRelativeDate(6, 4) }
  ],
  semis: [
    { id: 'b7', homeTeam: null, awayTeam: null, status: 'SCHEDULED', startTime: getRelativeDate(9, 2) }
  ],
  finals: [
    { id: 'b8', homeTeam: null, awayTeam: null, status: 'SCHEDULED', startTime: getRelativeDate(12, 3) }
  ]
};