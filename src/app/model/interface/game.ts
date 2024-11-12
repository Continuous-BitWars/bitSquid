/*
export interface IGame {
    id: number;
    name: string;
    description: string;
    status: 'running' | 'old' | 'upcoming';  }
    */




/**/

    export interface IGame{
        
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
            "status": string,
            "round_number": 0,
            "game_map": {
              "id": 0,
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
    