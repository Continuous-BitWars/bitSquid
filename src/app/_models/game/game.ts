export interface Game {
  uid: number,              // uid of game
  tick: number,             // tick in game
  playerCount: number,      // number of players
  remainingPlayers: number, // number of players remaining
  player: number,           // uid of your player
}
