import {
  WebGL1Renderer,
  Clock,
  Scene,
  TextureLoader,
  PerspectiveCamera,
} from 'three-platformize';
import { GLTFLoader } from 'three-platformize/examples/jsm/loaders/GLTFLoader';

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

  constructor(deps: DemoDeps) {
    this.deps = deps;
  }

  abstract init(): Promise<void>;
  abstract update(): void;
  abstract dispose(): void;
}
