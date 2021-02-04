import { baseUrl, Demo } from './Demo';
import { ColladaLoader } from 'three-platformize/examples/jsm/loaders/ColladaLoader';
import { AmbientLight, DirectionalLight, Scene } from 'three-platformize';

export class DemoColladaLoader extends Demo {
  dae: Scene;
  async init(): Promise<void> {
    const { camera } = this.deps;

    camera.position.set(8, 10, 8);
    camera.lookAt(0, 3, 0);

    const loader = new ColladaLoader();
    const collada = await loader.loadAsync(
      baseUrl + '/models/collada/elf/elf.dae',
    );
    this.dae = collada.scene;
    this.add(collada.scene);
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
    this.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    this.add(directionalLight);
  }
  update(): void {
    const delta = this.deps.clock.getDelta();

    if (this.dae) this.dae.rotation.z += delta * 0.5;
  }
  dispose(): void {
    this.reset();
  }
}
