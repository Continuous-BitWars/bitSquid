import { IGame } from './interface/game';


/*
export const gamesArray: IGame[] = [
  { id: 1, name: 'Game 1', description: 'Explore the ancient ruins', status: 'running' },
  { id: 2, name: 'Game 2', description: 'Travel through the galaxy', status: 'upcoming' },
  { id: 3, name: 'Game 3', description: 'Uncover hidden secrets', status: 'running' },
  { id: 4, name: 'Game 4', description: 'Travel through the galaxy', status: 'old' },
  { id: 5, name: 'Game 5', description: 'Explore the ancient ruins', status: 'old' },
  { id: 6, name: 'Game 6', description: 'Travel through the galaxy', status: 'old' },
  // Add more games as needed, specifying the status
];  */






export const gamesArray: IGame[] = [
  {
    "id": 1,
    "name": "The Finale Game",
    "players": [
      {
        "id": 1,
        "name": "ButterLampe",
        "provider_url": "http://ButterLampe/",
        "color": "http://ButterLampe/"
      }
    ],
    "status": "running",
    "round_number": 0,
    "game_map": {
      "id": 0,
      "name": "string",
      "max_player_count": 0,
      "provider_url": "string"
    },
    "game_options": {
      "time_between_ticks": 1
    },
    "eliminatedPlayers": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "league": {
      "id": 0,
      "name": "string",
      "status": "pending",
      "parallel_games": 0,
      "players": [
        {
          "id": 1,
          "name": "ButterLampe",
          "provider_url": "http://ButterLampe/",
          "color": "http://ButterLampe/"
        }
      ],
      "maps": [
        {
          "id": 0,
          "name": "string",
          "max_player_count": 0,
          "provider_url": "string"
        }
      ],
      "game_count": 0,
      "default_time_between_ticks": 0
    }
    
  },
  {"id": 2,
    "name": "The Finale Game",
    "players": [
      {
        "id": 1,
        "name": "ButterLampe",
        "provider_url": "http://ButterLampe/",
        "color": "http://ButterLampe/"
      }
    ],
    "status": "stopped",
    "round_number": 0,
    "game_map": {
      "id": 0,
      "name": "string",
      "max_player_count": 0,
      "provider_url": "string"
    },
    "game_options": {
      "time_between_ticks": 1
    },
    "eliminatedPlayers": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "league": {
      "id": 0,
      "name": "string",
      "status": "pending",
      "parallel_games": 0,
      "players": [
        {
          "id": 1,
          "name": "ButterLampe",
          "provider_url": "http://ButterLampe/",
          "color": "http://ButterLampe/"
        }
      ],
      "maps": [
        {
          "id": 0,
          "name": "string",
          "max_player_count": 0,
          "provider_url": "string"
        }
      ],
      "game_count": 0,
      "default_time_between_ticks": 0
    }},
    {
      "id": 3,
    "name": "The Finale Game",
    "players": [
      {
        "id": 1,
        "name": "ButterLampe",
        "provider_url": "http://ButterLampe/",
        "color": "http://ButterLampe/"
      }
    ],
    "status": "pending",
    "round_number": 0,
    "game_map": {
      "id": 0,
      "name": "string",
      "max_player_count": 0,
      "provider_url": "string"
    },
    "game_options": {
      "time_between_ticks": 1
    },
    "eliminatedPlayers": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "league": {
      "id": 0,
      "name": "string",
      "status": "pending",
      "parallel_games": 0,
      "players": [
        {
          "id": 1,
          "name": "ButterLampe",
          "provider_url": "http://ButterLampe/",
          "color": "http://ButterLampe/"
        }
      ],
      "maps": [
        {
          "id": 0,
          "name": "string",
          "max_player_count": 0,
          "provider_url": "string"
        }
      ],
      "game_count": 0,
      "default_time_between_ticks": 0
    }
    }
]