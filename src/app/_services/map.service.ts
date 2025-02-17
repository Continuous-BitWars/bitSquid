import {Injectable, signal} from '@angular/core';
import {API_URL} from '../config';
import axios from "axios";
import {GameMap, GameMapJson} from '../_models/api/map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  data = signal<GameMap[]>([]);

  constructor() {
    this.fetchData();
  }

  fetchData() {
    axios.get(`${API_URL}/maps`)
      .then(response => {
        this.data.set(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  fetchJsonForMap(id: number): Promise<GameMapJson> {
    return axios.get(`${API_URL}/maps/${id}/json`)
      .then(response => {
        return response.data as GameMapJson
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error
      });
  }
}
