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

  async init(): Promise<void> {
    const { camera, textureLoader } = this.deps;
    this.control = new DeviceOrientationControls(camera);

    const geometry = new SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new MeshBasicMaterial({
      map: await textureLoader.loadAsync('/imgs/360.jpg'),
      // color: 0x123456
    });

    const helperGeometry = new BoxBufferGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });

    this.add(new Mesh(geometry, material));
    this.add(new Mesh(helperGeometry, helperMaterial));
  }

  update(): void {
    this.control?.update();
  }

  dispose(): void {
    this.reset();
    this.control.disconnect();
    this.control.dispose();
    this.control = null;
  }
}
