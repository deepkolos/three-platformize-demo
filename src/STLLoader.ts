import { Demo } from './Demo';
import { STLLoader } from 'three-platformize/examples/jsm/loaders/STLLoader';
import {
  AmbientLight,
  AxesHelper,
  LinearEncoding,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PointLight,
  Vector3,
} from 'three-platformize';

export class DemoSTLLoader extends Demo {
  async init(): Promise<void> {
    const { camera, renderer, scene } = this.deps;

    this.addControl();
    const loader = new STLLoader();

    camera.position.set(0, 40, 40);
    camera.lookAt(new Vector3(0, 0, 0));
    renderer.setClearColor(0xffffff);
    renderer.outputEncoding = LinearEncoding;
    scene.position.z = 0;

    const [lungGeometry, innerGeometry] = await Promise.all([
      loader.loadAsync('http://127.0.0.1:8080/lung.stl'),
      loader.loadAsync('http://127.0.0.1:8080/yanzheng.stl'),
    ]);

    const lungMaterial = new MeshBasicMaterial({
      color: 0x2232cd,
      transparent: true,
      opacity: 0.8,
    });
    const lungMesh = new Mesh(lungGeometry, lungMaterial);

    lungMesh.rotation.x = -0.5 * Math.PI; //将模型摆正
    lungMesh.scale.set(0.1, 0.1, 0.1); //缩放
    lungGeometry.center(); //居中显示

    const mesh = new Mesh(
      innerGeometry,
      new MeshLambertMaterial({ color: 0xff0000 }),
    );
    mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
    mesh.scale.set(0.1, 0.1, 0.1); //缩放
    innerGeometry.center(); //居中显示

    this.add(mesh);
    this.add(lungMesh);
    this.add(new AmbientLight(0x444444));
    this.add(new AxesHelper(50));

    const pointLight = new PointLight(0xffffff);
    pointLight.position.set(0, 50, 50);
    pointLight.castShadow = true;

    this.add(pointLight);

    //告诉平行光需要开启阴影投射
  }
  update(): void {
    this.orbitControl?.update();
  }
  dispose(): void {
    this.reset();
  }
}
