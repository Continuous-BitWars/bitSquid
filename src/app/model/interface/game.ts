export interface IGame {
    id: number;
    name: string;
    description: string;
    status: 'running' | 'old' | 'upcoming';  }