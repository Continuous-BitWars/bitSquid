import {PlayerAction} from "./playerAction";
import {Progress} from "./progress";

export interface BoardAction extends PlayerAction {
  uuid: string,       // uuid of the action
  player: number,     // uid of the owning player
  progress: Progress, // progress of the units on the path
}
