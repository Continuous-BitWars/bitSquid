import {Injectable} from '@angular/core';
import * as THREE from "three";
import {AmbientLight, DirectionalLight, Euler} from "three";
import {ThreeJsModelService} from './model.service';
import {ThreeJsBaseService} from './base.service';
import {ThreeJsAttackService} from './attack.service';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsSceneService {

  // empty scene
  public scene: THREE.Scene = new THREE.Scene();

  // constructor with the required services:
  // modelService to preload the models and to get the models
  // baseService to get the current bases
  // attackService to get ongoing attacks
  constructor(private _: ThreeJsModelService, private baseService: ThreeJsBaseService, private attackService: ThreeJsAttackService) {

    // add an ambient light to the scene
    this.scene.add(new AmbientLight("#000000", 0.25));

    // add two directional lights
    this.addDirectionalLight(0.5, new Euler(1, -3, 2));
    this.addDirectionalLight(0.3, new Euler(-2, 3, -1));

    // subscribe to base updates
    this.baseService.update.subscribe(update => {
      // check if the base got added
      if (update.add) {
        // add the model to scene
        this.scene.add(update.model);
      } else {
        // remove the model from the scene
        this.scene.remove(update.model);
      }
    })

    // subscribe to base attacks
    this.attackService.update.subscribe(update => {
      // check if the base got added
      if (update.add) {
        // add the model to scene
        this.scene.add(update.model);
      } else {
        // remove the model from the scene
        this.scene.remove(update.model);
      }
    })

  }

  //private function to create directional Lights with color: #FFFFFF
  private addDirectionalLight(intensity: number, direction: THREE.Euler) {
    // create a new white directional light
    let light: DirectionalLight = new THREE.DirectionalLight("#FFFFFF", intensity);
    // rotate the directional light
    light.target.position.setFromEuler(direction);
    // add the light and its target to the scene
    this.scene.add(light.add(light.target));
  }


}
