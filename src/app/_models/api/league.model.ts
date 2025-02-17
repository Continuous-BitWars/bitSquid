import {Player} from './player.model';

export interface League {
  id: number;
  name: string;
  status: string;
  players: Player[];
  maps: any[];
  parallel_games: number;
  game_count: number;
  default_time_between_ticks: number;
}
