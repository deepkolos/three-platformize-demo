import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three-platformize';
import { Demo } from './Demo';
import { toEnvMap } from 'three-platformize/tools/toEnvMap';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';

export class DemoHDRPrefilterTexture extends Demo {
  mesh: Mesh<PlaneGeometry, MeshBasicMaterial>;
  orbitControl: OrbitControls;

  async init(): Promise<void> {
    const texture = await this.deps.textureLoader.loadAsync(
      // 'https://s3.ax1x.com/2021/02/01/yeci9I.png',
      'https://i.loli.net/2021/02/01/FAf8VEDdSNHBQLG.png',
    );
    toEnvMap(texture);
    const geometry = new PlaneGeometry(3, 3);
    const material = new MeshBasicMaterial({ map: texture });
    this.mesh = new Mesh(geometry, material);

    this.deps.scene.add(this.mesh);
    this.deps.scene.background = texture;
    this.deps.camera.position.z = 1;

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
    this.deps.scene.background = null;
    this.deps.scene.remove(this.mesh);
    this.mesh.material.dispose();
    this.orbitControl = null;
    this.mesh = null;
  }
}
