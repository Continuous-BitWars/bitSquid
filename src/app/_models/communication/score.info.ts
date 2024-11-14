export interface ScoreInfo {
  player: {
    id: number;
    name: string;
    provider_url: string;
    color: string;
  };
  score: number;
  wins_by_place: {
    [key: string]: number;
  };
  open_games_count: number;
}





