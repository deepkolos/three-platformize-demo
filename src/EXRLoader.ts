import { baseUrl, Demo } from './Demo';
import {
  FloatType,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  ReinhardToneMapping,
  Texture,
  ToneMapping,
} from 'three-platformize';
import { EXRLoader } from 'three-platformize/examples/jsm/loaders/EXRLoader';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';

export class DemoEXRLoader extends Demo {
  loader: EXRLoader;
  texture: Texture;
  mesh: Mesh<PlaneBufferGeometry, MeshBasicMaterial>;
  lastToneMapping: ToneMapping;
  lastToneMappingExposure: number;
  orbitControl: any;

  async init(): Promise<void> {
    this.loader = new EXRLoader().setDataType(FloatType);
    this.texture = await this.loader.loadAsync(
      baseUrl + '/textures/memorial.exr',
    );

    const material = new MeshBasicMaterial({ map: this.texture });
    const geometry = new PlaneBufferGeometry(
      (4.5 * this.texture.image.width) / this.texture.image.height,
      4.5,
    );
    this.mesh = new Mesh(geometry, material);
    this.deps.scene.add(this.mesh);
    this.lastToneMapping = this.deps.renderer.toneMapping;
    this.lastToneMappingExposure = this.deps.renderer.toneMappingExposure;
    this.deps.renderer.toneMapping = ReinhardToneMapping;
    this.deps.renderer.toneMappingExposure = 2.0;
  }
  update(): void {
  }
  dispose(): void {
    this.reset();
    this.deps.renderer.toneMapping = this.lastToneMapping;
    this.deps.renderer.toneMappingExposure = this.lastToneMappingExposure;
    this.deps.scene.remove(this.mesh);
    this.mesh.material.map.dispose();
    this.mesh.material.dispose();
    this.texture = null;
    this.loader = null;
    this.mesh = null;
  }
}
