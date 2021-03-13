import { Demo, baseUrl } from './Demo';
import { GLTF } from 'three-platformize/examples/jsm/loaders/GLTFLoader';
import { AmbientLight, DirectionalLight } from 'three-platformize';

export class DemoMemoryTest extends Demo {
  timer: number;
  async init(): Promise<void> {
    this.reset(false);
    const gltf = (await this.deps.gltfLoader.loadAsync(
      baseUrl + '/models/gltf/Soldier.glb',
    )) as GLTF;

    this.add(new DirectionalLight(0xffffff, 1));
    this.add(new AmbientLight(0xffffff, 1));
    this.add(gltf.scene);

    this.timer = setTimeout(() => this.init(), 300);
  }

  update(): void {}
  dispose(): void {
    this.reset();
    clearTimeout(this.timer);
  }
}
