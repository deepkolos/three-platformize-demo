import { baseUrl, Demo } from './Demo';
import { GLTF } from 'three-platformize/examples/jsm/loaders/GLTFLoader';
import { AmbientLight, Box3, BoxHelper, Color, PointLight } from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';
import { MeshoptDecoder } from 'three-platformize/extensions/meshopt_decoder.module';

export class DemoMeshOpt extends Demo {
  gltf: GLTF;
  ambientLight: AmbientLight;
  orbitControl: OrbitControls;
  pointLight: PointLight;

  async init(): Promise<void> {
    this.deps.gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    const gltf = (await this.deps.gltfLoader.loadAsync(
      'https://meshoptimizer.org/demo/pirate.glb',
    )) as GLTF;

    this.gltf = gltf;
    this.ambientLight = new AmbientLight(0xcccccc, 0.3);
    this.pointLight = new PointLight(0xffffff, 0.8);
    this.pointLight.position.set(3, 3, 0);

    this.deps.scene.add(gltf.scene);
    this.deps.scene.add(this.ambientLight);
    this.deps.camera.add(this.pointLight);
    this.deps.scene.add(this.deps.camera);
    gltf.scene.position.y = -1
    this.deps.camera.position.y = 1.0;
    this.deps.camera.position.z = 3.0;
    this.deps.scene.position.z = 0;
    this.deps.scene.background = new Color(0x300a24);

    // init controls
    this.orbitControl = new OrbitControls(
      this.deps.camera,
      this.deps.renderer.domElement,
    );
    this.orbitControl.enableDamping = true;
    this.orbitControl.dampingFactor = 0.05;
  }

  update(): void {
    this.orbitControl?.update();
  }

  dispose(): void {
    this.reset();
    this.orbitControl.dispose();
    this.deps.scene.add(this.deps.camera);
    this.deps.scene.remove(this.gltf.scene);
    this.deps.scene.remove(this.ambientLight);
    this.deps.camera.remove(this.pointLight);
    this.deps.scene.background = null;
    this.pointLight = null;
    this.ambientLight = null;
    this.orbitControl = null;
    this.deps = null;
  }
}
