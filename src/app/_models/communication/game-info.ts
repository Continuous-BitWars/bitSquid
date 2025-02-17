import {Player} from "../game/player";
import {GameMap} from '../api/map.model';

export enum Status {
  running = "running",
  stopped = "stopped",
  done = "done",
}

export interface GameInfo {
  id: number,                   // id of the game.ts
  name: string,                 // name of the game.ts
  players: Player[],            // list of all players participating
  game_options: {
    time_between_ticks: number, // time between ticks
  },
  game_map: GameMap,
  status: Status,               // current game.ts status
  round_number: number,         // current game.ts tick
}

