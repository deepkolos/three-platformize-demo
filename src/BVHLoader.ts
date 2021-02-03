import { baseUrl, Demo } from './Demo';
import { BVHLoader } from 'three-platformize/examples/jsm/loaders/BVHLoader';
import {
  AnimationMixer,
  Color,
  GridHelper,
  Group,
  SkeletonHelper,
} from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';

export class DemoBVHLoader extends Demo {
  mixer: AnimationMixer;
  controls: OrbitControls;
  async init(): Promise<void> {
    const { scene, renderer, camera } = this.deps;
    const loader = new BVHLoader();

    camera.position.set(0, 200, 300);

    const result = await loader.loadAsync(
      baseUrl + '/models/bvh/pirouette.bvh',
    );
    const skeletonHelper = new SkeletonHelper(result.skeleton.bones[0]);
    // @ts-ignore
    skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly

    const boneContainer = new Group();
    boneContainer.add(result.skeleton.bones[0]);

    this.add(skeletonHelper);
    this.add(boneContainer);
    scene.background = new Color(0xeeeeee);

    this.add(new GridHelper(400, 10));

    // play animation
    this.mixer = new AnimationMixer(skeletonHelper);
    this.mixer.clipAction(result.clip).setEffectiveWeight(1.0).play();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 300;
    controls.maxDistance = 700;

    this.controls = controls;
  }
  update(): void {
    this.mixer?.update(this.deps.clock.getDelta());
  }
  dispose(): void {
    this.reset();
    this.mixer.stopAllAction();
    this.controls.dispose();
    this.mixer = null;
    this.controls = null;
  }
}
