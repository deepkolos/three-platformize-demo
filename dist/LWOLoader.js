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
import { LWOLoader, } from 'three-platformize/examples/jsm/loaders/LWOLoader';
import { AmbientLight, Color, DirectionalLight, GridHelper, } from 'three-platformize';
export class DemoLWOLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { scene, renderer, camera } = this.deps;
            camera.position.set(-0.7, 14.6, 43.2);
            scene.background = new Color(0xa0a0a0);
            const ambientLight = new AmbientLight(0xaaaaaa, 1.75);
            this.add(ambientLight);
            const light1 = new DirectionalLight(0xffffff, 1);
            light1.position.set(0, 200, 100);
            light1.castShadow = true;
            light1.shadow.camera.top = 180;
            light1.shadow.camera.bottom = -100;
            light1.shadow.camera.left = -120;
            light1.shadow.camera.right = 120;
            this.add(light1);
            const light2 = new DirectionalLight(0xffffff, 0.7);
            light2.position.set(-100, 200, -100);
            this.add(light2);
            const light3 = new DirectionalLight(0xffffff, 0.4);
            light3.position.set(100, -200, 100);
            this.add(light3);
            const light4 = new DirectionalLight(0xffffff, 1);
            light4.position.set(-100, -100, 100);
            this.add(light4);
            const grid = new GridHelper(200, 20, 0x000000, 0x000000);
            // @ts-ignore
            grid.material.opacity = 0.3;
            // @ts-ignore
            grid.material.transparent = true;
            this.add(grid);
            const loader = new LWOLoader();
            const object = (yield loader.loadAsync(baseUrl + '/models/lwo/Objects/LWO3/Demo.lwo'));
            const phong = object.meshes[0];
            phong.position.set(-2, 12, 0);
            const standard = object.meshes[1];
            standard.position.set(2, 12, 0);
            const rocket = object.meshes[2];
            rocket.position.set(0, 10.5, -1);
            this.add(phong);
            this.add(rocket);
            this.add(standard);
            renderer.shadowMap.enabled = true;
            renderer.physicallyCorrectLights = true;
            renderer.gammaFactor = 1.18;
            this.addControl();
            this.orbitControl.target.set(1.33, 10, -6.7);
        });
    }
    update() {
        var _a;
        (_a = this.orbitControl) === null || _a === void 0 ? void 0 : _a.update();
    }
    dispose() {
        this.reset();
    }
}
