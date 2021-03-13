var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Demo, baseUrl } from './Demo';
import { AmbientLight, DirectionalLight } from 'three-platformize';
export class DemoMemoryTest extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset(false);
            const gltf = (yield this.deps.gltfLoader.loadAsync(baseUrl + '/models/gltf/Soldier.glb'));
            this.add(new DirectionalLight(0xffffff, 1));
            this.add(new AmbientLight(0xffffff, 1));
            this.add(gltf.scene);
            this.timer = setTimeout(() => this.init(), 300);
        });
    }
    update() { }
    dispose() {
        this.reset();
        clearTimeout(this.timer);
    }
}
