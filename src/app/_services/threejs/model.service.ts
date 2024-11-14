import {Injectable} from '@angular/core';
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import {Group, Mesh, MeshStandardMaterial} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {ModelType} from "../../_models/model/model-type";
import {Model} from "../../_models/model/model";
import {modelConfig, modelFont} from "../../config";
import {TTFLoader} from "three/examples/jsm/loaders/TTFLoader.js";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

export const PI: number = 3.1415926535897932384626;
const exp: string[] = [" ", "K", "M", "G", "T", "P", "E", "Z", "Y"];

@Injectable({
  providedIn: 'root'
})
export class ThreeJsModelService {
  // FBX loader used to load the models from path
  private fbxLoader: FBXLoader = new FBXLoader();
  // GLB loader used to load the models from path
  private gltfLoader: GLTFLoader = new GLTFLoader();
  // a list containing all models ordered by rank, with a default value of undefined (== still loading)
  private models: (Group | undefined)[] = [undefined];
  // font for text
  private font: (Font | undefined) = undefined;
  // loading process for each model
  private modelLoadingProgress: number[] = [0];
  // loading progress of the models
  public loadingProgress: number = 0;

  // constructor without any required services
  constructor() {
    // load models with an array of strings ordered by rank
    this.loadModels(modelConfig);

    // load font
    this.loadFont();
  }

  // load models from string array into this.models
  private loadModels(modelsInitData: Model[]): void {
    // clear array and set all models to undefined (== still loading)
    this.models = modelsInitData.map((_) => undefined);
    // reset the progress array
    this.modelLoadingProgress = modelsInitData.map((_) => 0);
    // load each model
    modelsInitData.forEach((modelInitData, id) => {
      // check for different model types
      switch (modelInitData.type) {
        case ModelType.FBX:
          this.loadFBXModel(modelInitData, id);
          break;
        case ModelType.GLTF:
          this.loadGLBModel(modelInitData, id);
          break;
        default:
          return;
      }
    })
  }

  // load font
  private loadFont(): void {
    // create new instances of the required loaders
    let ttfLoader: TTFLoader = new TTFLoader();
    let fontLoader: FontLoader = new FontLoader();

    // load the font
    ttfLoader.load(modelFont, (font) => {
      // parse the loaded font and save it
      this.font = fontLoader.parse(font);
    })
  }

  // load a fbx model
  private loadFBXModel(modelInitData: Model, id: number): void {
    // load the model from the path provided
    this.fbxLoader.load(
      // path of model
      modelInitData.path,

      // onload function
      (model): void => {
        // scale the model according to initial data
        model.scale.set(modelInitData.initialScale.x, modelInitData.initialScale.y, modelInitData.initialScale.y);
        // rotate the model according to initial data
        model.setRotationFromEuler(modelInitData.initialAngle);
        // on successful load store the model to the models array
        this.models[id] = model;

        // set the loading process to 100%
        this.updateLoadingProgress(id, 1);
      },


      // on progress function
      (progressEvent) => {
        // set the new progress to a value between 0% to 99%
        this.updateLoadingProgress(id, (progressEvent.loaded / progressEvent.total) - 0.01);
      }
    )
  }

  // load a glb model
  private loadGLBModel(modelInitData: Model, id: number): void {
    // load the model from the path provided
    this.gltfLoader.load(
      // path of model
      modelInitData.path,

      // onload function
      (gltf): void => {
        let model: Group = gltf.scene;
        // scale the model according to initial data
        model.scale.set(modelInitData.initialScale.x, modelInitData.initialScale.y, modelInitData.initialScale.y);
        // rotate the model according to initial data
        model.setRotationFromEuler(modelInitData.initialAngle);
        // on successful load store the model to the models array
        this.models[id] = model;

        // set the loading process to 100%
        this.updateLoadingProgress(id, 1);
      },

      // on progress function
      (progressEvent) => {
        // set the new progress to a value between 0% to 99%
        this.updateLoadingProgress(id, (progressEvent.loaded / progressEvent.total) - 0.01);
      }
    )
  }

  // update the loading process for a camera
  private updateLoadingProgress(id: number, progress: number): void {
    // set the progress of the model with the provided id
    this.modelLoadingProgress[id] = progress;

    // update the loading process as average off all models
    this.loadingProgress = this.modelLoadingProgress.reduce((a, b) => a + b) / this.modelLoadingProgress.length;
  }

  // get the model with the provided id
  public getModel(id: number): Group {
    // return a clone of the model with offset of 1 (0 is the attack)
    return this.models.at(id + 1)!.clone();
  }

  // get a number as 3D font
  public getNumberAsFont(value: number): Group {
    // the exponent of the number
    let pow: number = 0;
    // break value down to be:   amount * 1000 ^ pow
    while (value >= 1000) {
      value /= 1000;
      pow++;
    }
    // get rid of the decimal point
    value = Math.floor(value);
    // get a string to display
    let nrString = "    " + "  ".repeat(3 - String(value).length) + value + exp[pow];

    // create the geometry
    let geometry: TextGeometry = new TextGeometry(nrString, {
      font: this.font!,
      size: 1.75,
      depth: 0.1,
    });

    // create the material
    let material: MeshStandardMaterial = new MeshStandardMaterial({
      color: "#FFFFFF",
      emissive: "#FFFFFF",
    })

    // create the mesh
    let mesh: Mesh = new Mesh(geometry, material);

    // return the mesh as group with some tricks
    return <any>mesh;
  }
}
