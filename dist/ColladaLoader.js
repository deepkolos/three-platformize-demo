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
import { ColladaLoader } from 'three-platformize/examples/jsm/loaders/ColladaLoader';
import { AmbientLight, DirectionalLight } from 'three-platformize';
export class DemoColladaLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera } = this.deps;
            camera.position.set(8, 10, 8);
            camera.lookAt(0, 3, 0);
            const loader = new ColladaLoader();
            const collada = yield loader.loadAsync(baseUrl + '/models/collada/elf/elf.dae');
            this.add(collada.scene);
            const ambientLight = new AmbientLight(0xcccccc, 0.4);
            this.add(ambientLight);
            const directionalLight = new DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 0).normalize();
            this.add(directionalLight);
            this.addControl();
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
