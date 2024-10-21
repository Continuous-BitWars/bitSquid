import {Player} from "../game/player";

export enum Status {
  running = "running",
  stopped = "stopped",
  done = "done",
}

export interface GameInfo {
  id: number,                   // id of the game
  name: string,                 // name of the game
  players: Player[],            // list of all players participating
  game_options: {
    time_between_ticks: number, // time between ticks
  }
  status: Status,               // current game status
  round_number: number,         // current game tick
}

