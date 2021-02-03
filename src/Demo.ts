import {
  WebGL1Renderer,
  Clock,
  Scene,
  TextureLoader,
  PerspectiveCamera,
  Object3D,
} from 'three-platformize';
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
  _objects = [];

  constructor(deps: DemoDeps) {
    this.deps = deps;
  }

  add(obj: Object3D) {
    this._objects.push(obj);
    this.deps.scene.add(obj);
  }

  reset() {
    const { camera, scene } = this.deps;
    camera.position.set(0, 0, 0);
    camera.quaternion.set(0, 0, 0, 1);
    scene.background = null;
    scene.fog = null;
    scene.position.z = -3;
    this._objects.forEach(object => {
      object.material?.dispose();
    });
    scene.remove(...this._objects);
    this._objects.length = 0;
  }

  abstract init(): Promise<void>;
  abstract update(): void;
  abstract dispose(): void;
}
