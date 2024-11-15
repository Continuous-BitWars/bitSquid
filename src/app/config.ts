import {Euler, Vector3} from "three";
import {ModelType} from "./_models/model/model-type";
import {Model} from "./_models/model/model";

export const WEB_SOCKET_URL: string = "wss://bitdealer.bitwars.de/live"
export const GAME_URL: string = "https://bitdealer.bitwars.de/games"

export const minCameras: number = 1;
export const maxCameras: number = 9;

export const baseCameraLocation: Vector3 = new Vector3(0, 25, 0);
export const baseCameraTarget: Vector3 = new Vector3(0, 0, 0);

export const modelConfig: Model[] = [
  {
    path: "./assets/attack.glb",
    type: ModelType.GLTF,
    initialScale: new Vector3(0.04, 0.04, 0.04),
    initialAngle: new Euler()
  },
  {path: './assets/ESP.glb', type: ModelType.GLTF, initialScale: new Vector3(10, 10, 10), initialAngle: new Euler()},
  {path: './assets/NANO.glb', type: ModelType.GLTF, initialScale: new Vector3(5, 5, 5), initialAngle: new Euler()},
  {path: './assets/miniPC.glb', type: ModelType.GLTF, initialScale: new Vector3(5, 5, 5), initialAngle: new Euler()},
  {
    path: './assets/PC.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(0.25, 0.25, 0.25),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl1.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl2.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl3.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl4.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl5.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl6.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl7.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl8.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl9.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
  {
    path: './assets/server_lvl10.glb',
    type: ModelType.GLTF,
    initialScale: new Vector3(3.5, 3.5, 3.5),
    initialAngle: new Euler()
  },
]

export const modelFont: string = "./assets/aptos-display-bold.ttf";
