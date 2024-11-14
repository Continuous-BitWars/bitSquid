import {Vector3} from "three";

export interface SimpleCamera {
  position: Vector3, // position of the camera
  target: Vector3,   // target of the camera
}
