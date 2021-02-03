import { baseUrl, Demo } from './Demo';
import {
  LWOLoader,
  LWO,
} from 'three-platformize/examples/jsm/loaders/LWOLoader';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  GridHelper,
  Object3D,
} from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';

export class DemoLWOLoader extends Demo {
  loader: LWOLoader;
  objects: Object3D[];
  controls: OrbitControls;

  async init(): Promise<void> {
    const { scene, renderer, camera } = this.deps;
    camera.position.set(-0.7, 14.6, 43.2);
    scene.background = new Color(0xa0a0a0);

    const ambientLight = new AmbientLight(0xaaaaaa, 1.75);
    scene.add(ambientLight);

    const light1 = new DirectionalLight(0xffffff, 1);
    light1.position.set(0, 200, 100);
    light1.castShadow = true;
    light1.shadow.camera.top = 180;
    light1.shadow.camera.bottom = -100;
    light1.shadow.camera.left = -120;
    light1.shadow.camera.right = 120;
    scene.add(light1);

    const light2 = new DirectionalLight(0xffffff, 0.7);
    light2.position.set(-100, 200, -100);
    scene.add(light2);

    const light3 = new DirectionalLight(0xffffff, 0.4);
    light3.position.set(100, -200, 100);
    scene.add(light3);

    const light4 = new DirectionalLight(0xffffff, 1);
    light4.position.set(-100, -100, 100);
    scene.add(light4);

    const grid = new GridHelper(200, 20, 0x000000, 0x000000);
    // @ts-ignore
    grid.material.opacity = 0.3;
    // @ts-ignore
    grid.material.transparent = true;
    scene.add(grid);

    this.loader = new LWOLoader();
    const object = (await this.loader.loadAsync(
      baseUrl + '/models/lwo/Objects/LWO3/Demo.lwo',
    )) as LWO;

    const phong = object.meshes[0];
    phong.position.set(-2, 12, 0);

    const standard = object.meshes[1];
    standard.position.set(2, 12, 0);

    const rocket = object.meshes[2];
    rocket.position.set(0, 10.5, -1);

    scene.add(phong, standard, rocket);

    this.objects = [light1, light2, light3, grid, phong, standard, rocket];

    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;

    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.target.set(1.33, 10, -6.7);
    this.controls.update();
  }
  update(): void {}
  dispose(): void {
    const { renderer, scene } = this.deps;
    renderer.shadowMap.enabled = false;
    renderer.physicallyCorrectLights = false;
    renderer.gammaFactor = 1.18;

    this.reset();
    scene.background = null;
    this.controls.dispose();
    scene.remove(...this.objects);
    this.objects.length = 0;
    this.loader = null;
    this.controls = null;
  }
}
