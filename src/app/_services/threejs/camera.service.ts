import {Injectable} from '@angular/core';
import {Camera, PerspectiveCamera, Vector3} from "three";
import {SimpleCamera} from "../../_models/threejs/camera";
import {CookieService} from "ngx-cookie-service";
import {baseCameraLocation, baseCameraTarget, maxCameras} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class ThreeJsCameraService {

  // list off al the Cameras with their targets
  public cameras: { camera: Camera, target: Vector3 }[] = [];

  // constructor with the required services:
  // cookieService to access cookies and store camera metadata there
  constructor(private cookieService: CookieService) {
    // initialize the cameras
    this.initCameras();
  }

  private initCameras(): void {
    // reset array that holds tha cameras in case it is already initialized
    this.cameras = [];

    // load the simplified cameras from the cookies
    let simpleCamera: SimpleCamera[] = this.getCamerasJson();

    // extend the simple cameras to full, usable cameras
    simpleCamera.forEach(simpleCamera => {
      // create a new camera with parameters set in the configs
      let camera: Camera = this.getBaseCamera();
      // update the camera position
      camera.position.set(simpleCamera.position.x, simpleCamera.position.y, simpleCamera.position.z);
      // push the camera to the cameras array, together with its target
      this.cameras.push({camera: camera, target: simpleCamera.target});
    })
  }

  // create new base camera
  private getBaseCamera(): Camera {
    return new PerspectiveCamera(
      50,     // fov of the camera   TODO: figure out a usable value
      16 / 9, // aspect ratio of the camera (16:9)
      0.01,   // the near clipping plane of the camera   TODO: figure out a usable value
      100,    // the far clipping plane of the camera   TODO: figure out a usable value
    )
  }

  // load simple cameras from cookies
  private getCamerasJson(): SimpleCamera[] {
    // load the simple cameras as JSON from the cookies
    let camerasJSON: string = this.cookieService.get('cameras');

    // verify there are cameras stored in the cookies
    if (camerasJSON === '') {
      // reset the all the cameras and set the number to a default value
      this.resetCameras();
      // recursively call this function, since now the cookies should be set
      return this.getCamerasJson();
    }
    try {
      // try parse the JSON and return the simple cameras
      return JSON.parse(camerasJSON);
    } catch (_) {
      // reset the cameras, since they could not be loaded correctly
      this.resetCameras();
      // recursively call this function, since now the cameras should be configured correctly
      return this.getCamerasJson();

      //TODO: recursion ist hier etwas komisch und schlecht?
    }
  }

  // reset all cameras
  private resetCameras(): void {
    // save a single camera with settings from config to cookies
    this.cookieService.set('cameras', JSON.stringify([{position: baseCameraLocation, target: baseCameraTarget}]));
  }

  // reset a single camera
  public resetCamera(id: number): void {
    // update the camera with the base settings
    this.updateCameraInCookies(id, baseCameraLocation, baseCameraTarget);
    // set the cameras position and target
    this.cameras[id].camera.position.set(baseCameraLocation.x, baseCameraLocation.y, baseCameraLocation.z);
    // update the cameras target
    this.cameras[id].target = baseCameraTarget.clone();
  }

  // update a camera with a new position and target
  public updateCameraInCookies(id: number, position: Vector3, target: Vector3): void {
    // get the simple cameras from cookies
    let simpleCameras: SimpleCamera[] = this.getCamerasJson();
    // set the new camera position and target
    simpleCameras[id] = {position, target};
    // save the updated cameras to the cookies
    this.cookieService.set('cameras', JSON.stringify(simpleCameras));
  }

  // add an empty camera
  public addCamera(): void {
    // check if the max number of cameras has already been reached
    if (this.cameras.length >= maxCameras) {
      return;
    }

    // get the simple cameras from the cookies
    let simpleCameras: SimpleCamera[] = this.getCamerasJson();
    // push a new empty simple camera to the simple cameras and get its index
    let new_index: number = simpleCameras.push({position: new Vector3(), target: new Vector3()}) - 1;
    // save the updated cameras to cookies
    this.cookieService.set('cameras', JSON.stringify(simpleCameras));

    // reinitialize all cameras, as their canvas might have changed
    this.initCameras();

    // reset the new camera after it has been initialized
    this.resetCamera(new_index);
  }

  // remove a camera from the cameras
  public removeCamera(id: number): void {
    // get simple cameras from cookies
    let simpleCameras: SimpleCamera[] = this.getCamerasJson();

    // delete the camera with the provided id
    simpleCameras.splice(id, 1);

    // save the updated simple cameras to the cookies
    this.cookieService.set('cameras', JSON.stringify(simpleCameras));

    // add a new camera if there is none remaining
    if (this.cameras.length === 1) {
      // if the last camera is deleted reset it instead
      this.addCamera();
      return;
    }

    // reinitialize all cameras, as their canvas might have changed
    this.initCameras();
  }
}
