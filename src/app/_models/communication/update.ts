import {GameState} from '../game/gameState';

export interface Update {
  topic: string,
  message: GameState,
}
