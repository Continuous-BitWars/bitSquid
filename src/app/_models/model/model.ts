import {Euler, Vector3} from "three";
import {ModelType} from "./model-type";

export interface Model {
  path: string,
  initialScale: Vector3,
  initialAngle: Euler,
  type: ModelType,
}
