import {League} from './league.model';
import {Player} from './player.model';

export interface LeagueData {
  league: League;
  scores: Score[];
}

export interface Score {
  player: Player;
  score: number;
  wins_by_place: { [place: string]: number };
  open_games_count: number;
}
