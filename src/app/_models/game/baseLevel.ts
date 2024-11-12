export interface BaseLevel {
  maxPopulation: number, // number of sustainable bits
  upgradeCost: number,   // bits required to unlock this upgrade
  spawnRate: number,     // number uf bits spawned per tick
}
