import {Player} from "../game/player";

export enum Status {
  running = "running", // neue Ticks über Websocket wenn letzter Tick automatisch auf Live
  stopped = "stopped",
  done = "done", // kommt kein tick mehr
}

export interface GameInfo {
  id: number,                   // id of the game.ts
  name: string,                 // name of the game.ts
  players: Player[],            // list of all players participating
  game_options: {
    time_between_ticks: number, // time between ticks
  }
  status: Status,               // current game.ts status
  round_number: number,         // current game.ts tick
}

