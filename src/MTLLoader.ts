import { baseUrl, Demo } from './Demo';
import { MTLLoader } from 'three-platformize/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three-platformize/examples/jsm/loaders/DDSLoader';
import { OBJLoader } from 'three-platformize/examples/jsm/loaders/OBJLoader';
import {
  AmbientLight,
  Group,
  LinearEncoding,
  LoadingManager,
  PointLight,
  sRGBEncoding,
} from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';

export class DemoMTLLoader extends Demo {
  loadMgr: LoadingManager;
  mtlLoader: MTLLoader;
  objLoader: OBJLoader;
  object: Group;
  controls: OrbitControls;
  ambientLight: AmbientLight;
  pointLight: PointLight;

  async init(): Promise<void> {
    this.loadMgr = new LoadingManager();
    this.loadMgr.addHandler(/\.dds$/i, new DDSLoader());
    this.mtlLoader = new MTLLoader(this.loadMgr);
    this.objLoader = new OBJLoader(this.loadMgr);

    const materials = (await this.mtlLoader.loadAsync(
      baseUrl + '/models/obj/male02/male02.mtl',
    )) as MTLLoader.MaterialCreator;
    materials.preload();

    this.object = (await this.objLoader
      .setMaterials(materials)
      .loadAsync(baseUrl + '/models/obj/male02/male02.obj')) as Group;
    this.object.position.y = -95;

    this.ambientLight = new AmbientLight(0xcccccc, 0.4);
    this.pointLight = new PointLight(0xffffff, 0.8);

    this.controls = new OrbitControls(
      this.deps.camera,
      this.deps.renderer.domElement,
    );

    this.deps.scene.add(this.ambientLight);
    this.deps.camera.add(this.pointLight);
    this.deps.scene.add(this.object);
    this.deps.scene.add(this.deps.camera);
    this.object.position.y = -95;
    this.deps.camera.position.z = 200;
    this.deps.renderer.outputEncoding = LinearEncoding;
  }
  update(): void {
    this.controls?.update();
  }
  dispose(): void {
    this.reset();
    this.deps.renderer.outputEncoding = sRGBEncoding;
    this.controls.dispose();
    this.deps.scene.remove(this.ambientLight);
    this.deps.camera.remove(this.pointLight);
    this.deps.scene.remove(this.object);
    this.deps.scene.remove(this.deps.camera);
    this.object = null;
    this.controls = null;
  }
}
