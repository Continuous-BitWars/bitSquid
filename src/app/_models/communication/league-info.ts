
  export interface LeagueInfo {
    "id": 0,
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