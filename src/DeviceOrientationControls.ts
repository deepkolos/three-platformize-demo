import { Demo } from './Demo';
import { DeviceOrientationControls } from 'three-platformize/examples/jsm/controls/DeviceOrientationControls';
import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  BoxBufferGeometry,
} from 'three-platformize';

export class DemoDeviceOrientationControls extends Demo {
  control: DeviceOrientationControls;
  mesh: Mesh<SphereBufferGeometry, MeshBasicMaterial>;
  helper: Mesh<BoxBufferGeometry, MeshBasicMaterial>;

  async init(): Promise<void> {
    this.control = new DeviceOrientationControls(this.deps.camera);

    const geometry = new SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new MeshBasicMaterial({
      map: await this.deps.textureLoader.loadAsync('/imgs/360.jpg'),
      // color: 0x123456
    });
    const mesh = new Mesh(geometry, material);

    const helperGeometry = new BoxBufferGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });
    const helper = new Mesh(helperGeometry, helperMaterial);

    this.deps.scene.add(mesh);
    this.deps.scene.add(helper);
    this.mesh = mesh;
    this.helper = helper;

    this.control.deviceOrientation = {
      alpha: 90,
      beta: 90,
      gamma: 90,
    };
  }

  update(): void {
    this.control.update();
  }

  dispose(): void {
    this.control.disconnect();
    this.control.dispose();
    this.deps.scene.remove(this.mesh);
    this.deps.scene.remove(this.helper);
    this.mesh.material.dispose();
    this.helper.material.dispose();
    this.mesh = null;
    this.helper = null;
    this.control = null;
  }
}
