import { Demo } from './Demo';
import { GLTF } from 'three-platformize/examples/jsm/loaders/GLTFLoader';
import {
  DirectionalLight,
  AmbientLight,
  PMREMGenerator,
  UnsignedByteType,
  Texture,
  SpotLight,
  Euler,
} from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three-platformize/examples/jsm/loaders/RGBELoader';

const baseUrl = 'http://www.yanhuangxueyuan.com/threejs'

export class DemoRGBELoader extends Demo {
  gltf: GLTF;
  directionalLight: DirectionalLight;
  ambientLight: AmbientLight;
  orbitControl: OrbitControls;
  rgbeLoader: RGBELoader;
  spotLight: SpotLight;

  async init(): Promise<void> {
    const gltf = (await this.deps.gltfLoader.loadAsync(
      baseUrl + '/examples/models/gltf/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf',
    )) as GLTF;
    this.gltf = gltf;

    gltf.scene.rotation.copy(new Euler(0, 0, 0));
    this.deps.renderer.physicallyCorrectLights = true;

    // env map
    this.rgbeLoader = new RGBELoader();
    const pmremGenerator = new PMREMGenerator(this.deps.renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = (await this.rgbeLoader
      .setDataType(UnsignedByteType)
      .loadAsync(
        baseUrl + '/examples/textures/equirectangular/venice_sunset_2k.hdr',
      )) as Texture;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    envTexture.dispose();
    pmremGenerator.dispose();
    this.deps.scene.background = envMap;

    // prettier-ignore
    gltf.scene.traverse( function ( node ) {
      // @ts-ignore
      if ( node.material && ( node.material.isMeshStandardMaterial ||
      // @ts-ignore
         ( node.material.isShaderMaterial && node.material.envMap !== undefined ) ) ) {
        // @ts-ignore
        node.material.envMap = envMap;
        // @ts-ignore
        node.material.envMapIntensity = 1.5; // boombox seems too dark otherwise
      }
      // @ts-ignore
      if ( node.isMesh || node.isLight ) node.castShadow = true;
    } );

    // lights
    this.directionalLight = new DirectionalLight(0xdddddd, 4);
    this.directionalLight.position.set(0, 0, 1).normalize();

    this.ambientLight = new AmbientLight(0x222222);

    this.spotLight = new SpotLight(0xffffff, 1);
    this.spotLight.position.set(5, 10, 5);
    this.spotLight.angle = 0.5;
    this.spotLight.penumbra = 0.75;
    this.spotLight.intensity = 100;
    this.spotLight.decay = 2;

    this.deps.scene.add(gltf.scene);
    this.deps.scene.add(this.directionalLight);
    this.deps.scene.add(this.ambientLight);
    this.deps.scene.add(this.spotLight);

    this.deps.camera.position.set(2, 1, 15);

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
    this.deps.renderer.physicallyCorrectLights = false;
    (this.deps.scene.background as Texture).dispose();
    this.deps.scene.background = undefined;
    this.orbitControl.dispose();
    this.deps.scene.remove(this.gltf.scene);
    this.deps.scene.remove(this.directionalLight);
    this.deps.scene.remove(this.ambientLight);
    this.deps.scene.remove(this.spotLight);
    this.directionalLight = null;
    this.ambientLight = null;
    this.orbitControl = null;
    this.spotLight = null;
    this.deps = null;
  }
}
