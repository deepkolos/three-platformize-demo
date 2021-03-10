var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Demo } from './Demo';
import { AnimationMixer, LoopOnce, DirectionalLight, AmbientLight } from 'three-platformize';
export class DemoGLTFLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const gltf = (yield this.deps.gltfLoader.loadAsync(
            // baseUrl + '/models/gltf/RobotExpressive/RobotExpressive.glb',
            'https://dtmall-tel.alicdn.com/edgeComputingConfig/upload_models/1591673169101/RobotExpressive.glb'));
            gltf.scene.position.z = 2.5;
            gltf.scene.position.y = -2;
            this.add(new DirectionalLight(0xffffff, 1));
            this.add(new AmbientLight(0xffffff, 1));
            this.add(gltf.scene);
            this.deps.camera.position.z = 10;
            // init animtion
            const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
            const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];
            this.mixer = new AnimationMixer(gltf.scene);
            const actions = {};
            for (let i = 0; i < gltf.animations.length; i++) {
                const clip = gltf.animations[i];
                const action = this.mixer.clipAction(clip);
                actions[clip.name] = action;
                if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
                    action.clampWhenFinished = true;
                    action.loop = LoopOnce;
                }
            }
            const activeAction = actions['Walking'];
            activeAction.play();
            this.addControl();
        });
    }
    update() {
        var _a, _b;
        (_a = this.mixer) === null || _a === void 0 ? void 0 : _a.update(this.deps.clock.getDelta());
        (_b = this.orbitControl) === null || _b === void 0 ? void 0 : _b.update();
    }
    dispose() {
        this.mixer.stopAllAction();
        this.mixer = null;
        this.reset();
    }
}
