import {BaseLevel} from "./baseLevel";

export interface GameConfig {
  baseLevels: BaseLevel[], // all available base levels
  paths: {                 // settings containing paths between bases
    gracePeriod: number, // time until groups of bits take damage
    deathRate: number,   // number of units killed every tick after surpassing the grace period
  }
}
