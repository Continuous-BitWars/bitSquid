import {Position} from "./position";

export interface Base {
  position: Position,        // position of the base
  uid: number,               // uid of the base
  player: number,            // uid of the owning player
  population: number,        // number of bits in the base
  level: number,             // level of the base
  unitsUntilUpgrade: number, // bits needed for until the next upgrade
}
