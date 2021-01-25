import { baseUrl, Demo } from './Demo';
import {
  AmbientLight,
  Group,
  LinearEncoding,
  PointLight,
  sRGBEncoding,
} from 'three-platformize';
import { OBJLoader } from 'three-platformize/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';

export class DemoOBJLoader extends Demo {
  objLoader: OBJLoader;
  ambientLight: AmbientLight;
  pointLight: PointLight;
  object: Group;
  controls: OrbitControls;

  async init(): Promise<void> {
    const uvMap = await this.deps.textureLoader.loadAsync(
      baseUrl + '/textures/UV_Grid_Sm.jpg',
    );
    this.objLoader = new OBJLoader();
    this.object = (await this.objLoader.loadAsync(
      baseUrl + '/models/obj/male02/male02.obj',
    )) as Group;
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

    this.object.traverse(function (child) {
      // @ts-ignore
      if (child.isMesh) child.material.map = uvMap;
    });

    this.object.position.y = -95;
    this.deps.camera.position.z = 200;
    this.deps.renderer.outputEncoding = LinearEncoding;
  }

  update(): void {
    this.controls.update();
  }

  dispose(): void {
    this.reset();
    this.deps.renderer.outputEncoding = sRGBEncoding;
    this.controls.dispose();
    this.deps.scene.remove(this.ambientLight);
    this.deps.camera.remove(this.pointLight);
    this.deps.scene.remove(this.object);
    this.deps.scene.remove(this.deps.camera);
    this.object.traverse(function (child) {
      // @ts-ignore
      if (child.isMesh) {
        // @ts-ignore
        child.material.map.dispose();
        // @ts-ignore
        child.material.dispose();
      }
    });

    this.ambientLight = null;
    this.pointLight = null;
    this.object = null;
    this.controls = null;
  }
}
