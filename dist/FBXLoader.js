var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AnimationMixer, Color, DirectionalLight, Fog, GridHelper, HemisphereLight, Mesh, MeshPhongMaterial, PlaneBufferGeometry, } from 'three-platformize';
import { FBXLoader } from 'three-platformize/examples/jsm/loaders/FBXLoader';
import { baseUrl, Demo } from './Demo';
export class DemoFBXLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera, scene } = this.deps;
            camera.position.set(100, 200, 300);
            scene.background = new Color(0xa0a0a0);
            scene.fog = new Fog(0xa0a0a0, 200, 1000);
            const hemiLight = new HemisphereLight(0xffffff, 0x444444);
            hemiLight.position.set(0, 200, 0);
            this.add(hemiLight);
            const dirLight = new DirectionalLight(0xffffff);
            dirLight.position.set(0, 200, 100);
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 180;
            dirLight.shadow.camera.bottom = -100;
            dirLight.shadow.camera.left = -120;
            dirLight.shadow.camera.right = 120;
            this.add(dirLight);
            // ground
            const mesh = new Mesh(new PlaneBufferGeometry(2000, 2000), new MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
            mesh.rotation.x = -Math.PI / 2;
            mesh.receiveShadow = true;
            this.add(mesh);
            const grid = new GridHelper(2000, 20, 0x000000, 0x000000);
            // @ts-ignore
            grid.material.opacity = 0.2;
            // @ts-ignore
            grid.material.transparent = true;
            this.add(grid);
            const loader = new FBXLoader();
            const object = yield loader.loadAsync(baseUrl + '/models/fbx/Samba Dancing.fbx');
            const mixer = new AnimationMixer(object);
            const action = mixer.clipAction(object.animations[0]);
            action.play();
            object.traverse(function (child) {
                // @ts-ignore
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            this.add(object);
            this.addControl();
            this.orbitControl.target.set(0, 100, 0);
            this.orbitControl.update();
            this.mixer = mixer;
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
