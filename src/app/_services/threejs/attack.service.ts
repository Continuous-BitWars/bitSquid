import {effect, EventEmitter, Injectable} from '@angular/core';
import {Color, Group, Object3D, Vector3} from "three";
import {BoardAction} from '../../_models/game/boardActions';
import {CacheAttack} from '../../_models/threejs/cache/cache-attack';
import {ThreeJsModelService} from './model.service';
import {ThreeJsBaseService} from './base.service';
import {GameInfoService} from '../game-info.service';
import {GameTickService} from '../game-tick.service';

const smoothness: number = 10;

@Injectable({
  providedIn: 'root'
})
export class ThreeJsAttackService {

  // all the attacks and their models
  private attacks: CacheAttack[] = [];

  // an event emitter to trigger scene add and delete actions
  public update: EventEmitter<{ add: boolean, model: Group }> = new EventEmitter();

  // constructor with the required services:
  // modelService to get the model of an attack
  // baseService to get the location of the bases
  // playerService to get the team colors
  constructor(private modelService: ThreeJsModelService, private baseService: ThreeJsBaseService, private gameInfoService: GameInfoService, private gameTickService: GameTickService) {
    effect(() => {
      let tick = this.gameTickService.currentTick()?.actions
      if (tick) {
        this.updateAttacks(tick)
      }
    })
  };

  // update all attacks
  public updateAttacks(attacks: BoardAction[]): void {
    // map attacks to their uuids
    let currentAttackUuids: string[] = attacks.map(attack => attack.uuid)
    // filter for cached attacks that don't get an update
    let missing: CacheAttack[] = this.attacks.filter(attack => !currentAttackUuids.includes(attack.attack.uuid))

    // remove all missing attacks
    missing.forEach(attack => {
      this.unloadAttack(attack.attack.uuid);
    })

    // update all remaining attacks
    attacks.forEach(attack => this.updateAttack(attack));
  }

  // unload an attack from scene and delete it
  private unloadAttack(uuid: string): void {
    // get the index in the cache
    let attackIndex: number = this.getListIndex(uuid);
    // unload the model from the scene
    this.update.emit({add: false, model: this.attacks[attackIndex].model});
    // delete the attack from cache
    this.attacks.splice(attackIndex, 1);
  }

  // update am Attack
  private updateAttack(attack: BoardAction): void {
    // get the index of the attack in cache
    let attackIndex: number = this.getListIndex(attack.uuid);

    // check if the attack exists
    if (attackIndex === -1) {
      // get the source base location
      let srcVec: Vector3 = this.baseService.getPosition(attack.src);
      // get destination location
      let dstVec: Vector3 = this.baseService.getPosition(attack.dest);

      // get vector between the bases
      let direction: Vector3 = new Vector3(dstVec.x - srcVec.x, dstVec.y - srcVec.y, dstVec.z - srcVec.z);

      // add a new attack with its model
      attackIndex = this.attacks.push({
        attack: attack,
        src: srcVec,
        direction:
        direction,
        model: this.modelService.getModel(-1),
      }) - 1;
      // emmit event so the sceneService can add the model to the scene
      this.update.emit({add: true, model: this.attacks[attackIndex].model});

      // add font
      this.addFont(attack.uuid, attack.amount);

      // move the attack towards its destination
      this.attacks[attackIndex].model.position.set(srcVec.x, srcVec.y, srcVec.z);

      // align the attack model to its destination
      this.attacks[attackIndex].model.lookAt(new Vector3(dstVec.x, dstVec.y, dstVec.z));

      // set attack color
      this.attacks[attackIndex].model.traverse((model): void => {
        // check for the teamColor layer
        if (model.name.includes("teamColor")) {
          // idk why this works, so don't touch it
          (<any>model).material = (<any>model).material.clone();

          // set color from HEX
          let color = "#FF0000";
          let currentTick = this.gameInfoService.currentGameInfo()
          if (currentTick) {
            color = currentTick.players.find(value => value.id == attack.player)?.color || color
          }
          (<any>model).material.color = new Color(color);

          // add highlight color glow
          (<any>model).material.emissive = (<any>model).material.color;
        }
      })
    }

    // check if the attack lost troops
    if (this.attacks[attackIndex].attack.amount != attack.amount) {
      // remove the old font
      this.removeFont(attack.uuid);
      // add the new font
      this.addFont(attack.uuid, attack.amount);
    }

    // move the cached attack model
    this.move(attack.uuid);


    // update the rest of the attack
    this.attacks[attackIndex].attack = attack;
  }

  // get the index of an attack in the cache
  private getListIndex(uuid: string): number {
    // map the attacks to their id and get the index of the id
    return this.attacks.map(attacks => attacks.attack.uuid).indexOf(uuid);
  }

  // progress an attack
  private async move(uuid: string): Promise<void> {
    await this.delay(0.001);
    let attack: CacheAttack = this.attacks[this.getListIndex(uuid)];

    // check attack still exists
    if (attack == undefined) return;

    // get the progress of the attack
    let progress: number = attack.attack.progress.traveled / attack.attack.progress.distance;
    // get scale the vector according to the distance traveled
    let scaledVec: Vector3 = attack.direction.clone().multiplyScalar(progress);
    // get source of the attack
    let srcVec: Vector3 = attack.src;
    // get the location with reference to the source
    let position: Vector3 = new Vector3(srcVec.x + scaledVec.x, srcVec.y + scaledVec.y, srcVec.z + scaledVec.z);

    // repeat for the smoothness
    for (let i = 0; i <= smoothness; i++) {
      // set the attack position instant
      attack.model.position.lerp(position, 1 / smoothness);

      // delay the next step
      await this.delay(250 / smoothness);
    }
  }

  // a simple delay
  private async delay(ms: number): Promise<void> {
    // return a promise delayed by the provided delay
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // clear all attacks
  public clear(): void {
    // for each attack
    this.attacks.forEach(attack => {
      // unload the attack from the scene
      this.update.emit({add: false, model: attack.model});
    })
    // reset the cache
    this.attacks = [];
  }

  // add the amount of an attack to the model
  private addFont(uuid: string, amount: number): void {
    // get the model
    let attack: CacheAttack = this.attacks[this.getListIndex(uuid)];

    // create to new fonts to display
    let fontFront: Group = this.modelService.getNumberAsFont(amount);
    let fontBack: Group = fontFront.clone();

    // name both fonts
    fontFront.name = 'number-front';
    fontBack.name = 'number-back';

    // rotate both fonts
    fontFront.rotation.set(0, Math.PI / 2, 0);
    fontBack.rotation.set(0, 3 * Math.PI / 2, 0)

    // move both fonts
    fontFront.position.set(0, -0.755, 2.3);
    fontBack.position.set(0, -0.755, -6.5);

    // add the fonts as layers to the model
    attack.model.add(fontFront);
    attack.model.add(fontBack);
  }

  // remove a font from the model
  private removeFont(uuid: string): void {
    // get the model
    let attack: CacheAttack = this.attacks[this.getListIndex(uuid)];

    // create a list of models to remove
    let modelsToRemove: Object3D[] = [];

    // iterate through all the layers
    attack.model.traverse(model => {
      // check if the layer is a number
      if (model.name.includes("number")) {
        // queue the layer destruction
        modelsToRemove.push(model);
      }
    })

    // remove the tagged layers
    modelsToRemove.forEach(model => {
      attack.model.remove(model);
    })
  }
}
