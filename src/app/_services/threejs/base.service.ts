import {effect, EventEmitter, Injectable} from '@angular/core';
import {Color, Group, Object3D, Vector3} from "three";
import {GameInfoService} from '../game-info.service';
import {GameTickService} from '../game-tick.service';
import {CacheBase} from '../../_models/threejs/cache/cache-base';
import {ThreeJsModelService} from './model.service';
import {Base} from '../../_models/game/base';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsBaseService {

  // all the bases and their models
  private bases: CacheBase[] = [];

  // an event emitter to trigger scene add and delete actions
  public update: EventEmitter<{ add: boolean, model: Group }> = new EventEmitter();

  // constructor with the required services:
  // modelService to get the models
  // playerService to get team color
  constructor(private modelService: ThreeJsModelService, private gameInfoService: GameInfoService, private gameTickService: GameTickService) {
    effect(() => {
      let tick = this.gameTickService.currentTick()?.bases
      if (tick) {
        this.updateBases(tick)
      }
    })
  };

  // update all bases
  public updateBases(bases: Base[]): void {
    bases.forEach(base => this.updateBase(base));
  }

  // update a base
  private updateBase(base: Base): void {
    // get the index of the base in cache
    let baseIndex: number = this.getListIndex(base.uid);
    // check if the base exists
    if (baseIndex === -1) {
      // add a new base with its model
      this.bases.push({base: base, model: this.modelService.getModel(base.level)});
      // place the base
      this.placeBase(base);

      // return since base is up-to-date
      return;
    }

    // check if the base got upgraded
    if (this.bases[baseIndex].base.level !== base.level) {
      // remove the old model from the scene
      this.update.emit({add: false, model: this.bases[baseIndex].model});
      // update the model
      this.bases[baseIndex].model = this.modelService.getModel(base.level);
      // add the new model to the scene
      this.placeBase(base);
    }

    // check if the base got conquered
    if (this.bases[baseIndex].base.player !== base.player) {
      // update the owner color
      this.updateColor(base.uid, base.player);
    }

    // check for a change in population
    if (this.bases[baseIndex].base.population !== base.population) {
      // update the font
      this.removeFont(base.uid);
      this.addFont(base.uid, base.population);
    }

    // update the rest of the base
    this.bases[baseIndex].base = base;
  }

  // place a base
  private placeBase(base: Base): void {
    // get the index in cache
    let model: Group = this.bases[this.getListIndex(base.uid)].model;

    // emit a load instruction
    this.update.emit({add: true, model: model});
    // set the base position instant
    model.position.set(base.position.x, base.position.y, base.position.z);

    // update the base with baseIndex with a new owner
    this.updateColor(base.uid, base.player);
    // add the population to the base
    this.addFont(base.uid, base.population);
  }

  // update the base team color
  private updateColor(uid: number, playerId: number): void {
    let base: CacheBase = this.bases[this.getListIndex(uid)];

    // loop over all model layers
    base.model.traverse((model): void => {
      // check for the teamColor layer
      if (model.name.includes("teamColor")) {
        // idk why this works, so don't touch it
        (<any>model).material = (<any>model).material.clone();
        // set color from HEX

        let color = "#000000";
        let currentTick = this.gameInfoService.currentGameInfo()
        if (currentTick) {
          color = currentTick.players.find(value => value.id == playerId)?.color || color
        }
        (<any>model).material.color = new Color(color);

        // add highlight glow
        (<any>model).material.emissive = (<any>model).material.color;
      }
    })
  }

  // get the index of a base in the cache
  private getListIndex(uid: number): number {
    // map the bases to their id and get the index of the id
    return this.bases.map(base => base.base.uid).indexOf(uid);
  }

  // clear all bases
  public clear(): void {
    // for each base
    this.bases.forEach(base => {
      // unload the base from the scene
      this.update.emit({add: false, model: base.model});
    })
    // reset the cache
    this.bases = [];
  }

  // get base position by uid
  public getPosition(uid: number): Vector3 {
    // return the position of the base
    return <Vector3>this.bases[this.getListIndex(uid)].base.position;
  }

  // get bases by owner
  public getOwnedBases(playerId: number): Base[] {
    return this.bases.map(base => base.base).filter(base => base.player === playerId);
  }

  // add the number of troops inside a base to the model
  private addFont(uid: number, amount: number): void {
    // get the model
    let base: CacheBase = this.bases[this.getListIndex(uid)];

    // create to new fonts to display
    let font: Group = this.modelService.getNumberAsFont(amount);

    // name the font
    font.name = 'number-bottom';

    // scale the font
    font.scale.set(0.08 / base.model.scale.x, 0.08 / base.model.scale.y, 0.08 / base.model.scale.z);
    // move the font
    font.position.set(-0.32 / base.model.scale.x, -0.25 / base.model.scale.y, 0);

    // add the font as layer to the model
    base.model.add(font);
  }

  // remove a font from the model
  private removeFont(uid: number): void {
    // get the model
    let base: CacheBase = this.bases[this.getListIndex(uid)];

    // create a list of models to remove
    let modelsToRemove: Object3D[] = [];

    // iterate through all the layers
    base.model.traverse(model => {
      // check if the layer is a number
      if (model.name.includes("number")) {
        // queue the layer destruction
        modelsToRemove.push(model);
      }
    })

    // remove the tagged layers
    modelsToRemove.forEach(model => {
      base.model.remove(model);
    })
  }
}
