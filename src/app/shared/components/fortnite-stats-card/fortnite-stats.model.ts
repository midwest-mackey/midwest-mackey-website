// fortnite-stats.model.ts
export interface FortniteStats {
  playerName: string;
  level?: number;
  platform?: string;

  wins: number;
  kills: number;
  matches: number;
  kd: number;
  winRate: number;
}