import {Player} from "../game/player";

export enum Status {
  running = "running", // neue Ticks über Websocket wenn letzter Tick automatisch auf Live
  stopped = "stopped",
  done = "done", // kommt kein tick mehr
}

export interface GameInfo2 {
  id: number,                   // id of the game.ts
  name: string,                 // name of the game.ts
  players: Player[],            // list of all players participating
  game_options: {
    time_between_ticks: number, // time between ticks
  }
  status: Status,               // current game.ts status
  round_number: number,         // current game.ts tick
}


export interface GameInfo {

  "id": number,
  "name": string,
  "players": [
    {
      "id": number,
      "name": string,
      "provider_url": string,
      "color": string
    }
  ],
  "status": Status,
  "round_number": number,
  "game_map": {
    "id": number,
    "name": string,
    "max_player_count": number,
    "provider_url": string
  },
  "game_options": {
    "time_between_ticks": number
  },
  "eliminatedPlayers": {
    "additionalProp1": number,
    "additionalProp2": number,
    "additionalProp3": number
  },
  "league": {
    "id": number,
    "name": string,
    "status": string,
    "parallel_games": number,
    "players": [
      {
        "id": number,
        "name": string,
        "provider_url": string,
        "color": string
      }
    ],
    "maps": [
      {
        "id": number,
        "name": string,
        "max_player_count": number,
        "provider_url": string
      }
    ],
    "game_count": number,
    "default_time_between_ticks": number
  }


}
