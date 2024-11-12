import {Game} from "./game";
import {GameConfig} from "./gameConfig";
import {BoardAction} from "./boardActions";
import {Base} from "./base";

export interface GameState {
  game: Game,             // information about current game.ts
  config: GameConfig,     // configuration for the current game.ts
  actions: BoardAction[], // all actions in progress
  bases: Base[],          // all bases on the map
}

