import {
  WebGL1Renderer,
  Clock,
  Scene,
  TextureLoader,
  PerspectiveCamera,
  Object3D,
  sRGBEncoding,
  Texture,
} from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three-platformize/examples/jsm/loaders/GLTFLoader';

export const baseUrl = 'http://www.yanhuangxueyuan.com/threejs/examples';

export interface DemoDeps {
  clock: Clock;
  scene: Scene;
  gltfLoader: GLTFLoader;
  renderer: WebGL1Renderer;
  camera: PerspectiveCamera;
  textureLoader: TextureLoader;
}

export abstract class Demo {
  deps: DemoDeps;
  private _objects = [];
  orbitControl: OrbitControls;
  private _cameraObjects = [];

  constructor(deps: DemoDeps) {
    this.deps = deps;
  }

  add(obj: Object3D) {
    this._objects.push(obj);
    this.deps.scene.add(obj);
  }

  addCamera(obj: Object3D) {
    this._cameraObjects.push(obj);
    this.deps.camera.add(obj);
  }

  addControl() {
    const { camera, renderer } = this.deps;
    this.orbitControl = new OrbitControls(camera, renderer.domElement);
    this.orbitControl.enableDamping = true;
    this.orbitControl.dampingFactor = 0.05;
  }

  reset() {
    const { camera, scene, renderer } = this.deps;
    camera.position.set(0, 0, 0);
    camera.quaternion.set(0, 0, 0, 1);
    (scene.background as Texture)?.dispose?.();
    scene.background = null;
    scene.fog = null;
    scene.position.z = -3;
    renderer.shadowMap.enabled = false;
    renderer.physicallyCorrectLights = false;
    renderer.outputEncoding = sRGBEncoding;

    this._objects.forEach(object => object.material?.dispose?.());
    this._cameraObjects.forEach(object => object.material?.dispose?.());
    scene.remove(...this._objects);
    camera.remove(...this._cameraObjects);
    this._objects.length = 0;
    this._cameraObjects.length = 0;

    this.orbitControl?.dispose();
    this.orbitControl = null;
    this.deps = null;
  }

  abstract init(): Promise<void>;
  abstract update(): void;
  abstract dispose(): void;
}
