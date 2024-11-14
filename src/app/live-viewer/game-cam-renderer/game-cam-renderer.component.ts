import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, ViewChild} from '@angular/core';
import {NgStyle} from '@angular/common';
import {ThreeJsCameraService} from '../../_services/threejs/camera.service';
import * as THREE from "three";
import {WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {ThreeJsSceneService} from '../../_services/threejs/scene.service';
import {ThreeJsStyleService} from '../../_services/threejs/style.service';

@Component({
  selector: 'app-game-cam-renderer',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './game-cam-renderer.component.html',
  styleUrl: './game-cam-renderer.component.scss'
})
export class GameCamRendererComponent implements AfterViewInit, OnDestroy {

  @Input() cameraId!: number;

  // WebGL renderer for this window
  private renderer!: WebGLRenderer;

  // camera of this window
  private camera!: THREE.Camera;
  // the orbit controls associated with camera
  private controls!: OrbitControls;

  // event emitter used to interrupt the render loop
  private renderStop: EventEmitter<void> = new EventEmitter();
  public running!: boolean;

  @ViewChild('canvas') canvas?: ElementRef;

  constructor(private sceneService: ThreeJsSceneService, protected cameraService: ThreeJsCameraService, protected styleService: ThreeJsStyleService) {
  };

  ngAfterViewInit(): void {
    // create new renderer in canvas
    this.renderer = new WebGLRenderer({
      canvas: this.canvas?.nativeElement,
      // TODO: maybe turn off antialiasing for performance
      antialias: true,
      alpha: true,
    });

    // set the renderer resolution
    // TODO: current: 4x canvas resolution -> reduce for performance
    this.setRenderScale();

    // add an event listener to change the render scale
    this.styleService.renderScaleUpdate.subscribe(_ => {
      // stop the renderer
      this.renderStop.emit();
      // update the render scale
      this.setRenderScale();
      // restart the renderer
      this.animate();
    });

    // get camera from cameraService
    this.camera = this.cameraService.cameras[this.cameraId].camera;

    // add orbit controls to camera
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // get the target the camera is facing towards
    let cameraTarget: THREE.Vector3 = this.cameraService.cameras[this.cameraId].target;
    // set the orbit controls to look towards the target
    this.controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);

    // add event listener to the orbit controls that triggers at the end of a movement and updates the camera position
    this.controls.addEventListener("end", event => this.cameraService.updateCameraInCookies(this.cameraId, this.camera.position, event.target.target));

    // animate the camera
    this.animate();
  }

  ngOnDestroy() {
    // inform the renderer to stop, since it runs in its own context
    this.renderStop.emit();
  }

  resetCamera() {
    this.cameraService.resetCamera(this.cameraId);
    this.controls.target = this.cameraService.cameras[this.cameraId].target;
  }

  removeCamera() {
    this.cameraService.removeCamera(this.cameraId)
  }


  private animate(): void {
    // create reference to this context (basically clone it)
    let context = this;

    // keep the animation running;
    context.running = true;

    // add an event listener to stop the render loop
    context.renderStop.subscribe(_ => {
      // stop the render loop
      context.running = false;
    });

    // render loop
    (function render(): void {
      // render scene and camera
      context.renderer.render(context.sceneService.scene, context.camera);
      // animate controls
      context.controls.update();
      // render next frame
      if (context.running) requestAnimationFrame(render);
    }())
  }

  private setRenderScale(): void {
    // reduce scale for more than one camera
    let scale: number = this.styleService.renderScale / Math.ceil(Math.sqrt(this.cameraService.cameras.length))

    this.renderer.setSize(
      scale * 16 / 9,
      scale,
    );
  }
}
