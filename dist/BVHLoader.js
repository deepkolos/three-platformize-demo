var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { baseUrl, Demo } from './Demo';
import { BVHLoader } from 'three-platformize/examples/jsm/loaders/BVHLoader';
import { AnimationMixer, Color, GridHelper, Group, SkeletonHelper, } from 'three-platformize';
export class DemoBVHLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { scene, camera } = this.deps;
            const loader = new BVHLoader();
            camera.position.set(0, 200, 300);
            const result = yield loader.loadAsync(baseUrl + '/models/bvh/pirouette.bvh');
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
            this.addControl();
            this.orbitControl.minDistance = 300;
            this.orbitControl.maxDistance = 700;
        });
    }
    update() {
        var _a, _b;
        (_a = this.mixer) === null || _a === void 0 ? void 0 : _a.update(this.deps.clock.getDelta());
        (_b = this.orbitControl) === null || _b === void 0 ? void 0 : _b.update();
    }
    dispose() {
        this.reset();
        this.mixer.stopAllAction();
        this.mixer = null;
    }
}
