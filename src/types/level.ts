export type LevelFailStat = {
  level: number;
  totalFail: number;
  totalPlayer: number;
  average: number;
  q1: number;
  q2: number;
  q3: number;
};

export type DropRate = {
  level: number;
  totalDrop: number;
  totalPass: number;
  totalPassPrevious: number;
  ratio: number;
};

export type PlayerCount = {
  level: number;
  totalPlayer: number;
};

export type PlayTimesCount = {
  level: number;
  totalPass: number;
  totalFail: number;
};

export type PlaytimeAvg = {
  level: number;
  avgPassTime: number;
  avgFailTime: number;
};
