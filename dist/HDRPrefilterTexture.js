var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three-platformize';
import { Demo } from './Demo';
import { toEnvMap } from 'three-platformize/tools/toEnvMap';
export class DemoHDRPrefilterTexture extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { scene, camera } = this.deps;
            const texture = yield this.deps.textureLoader.loadAsync(
            // 'https://s3.ax1x.com/2021/02/01/yeci9I.png',
            'https://i.loli.net/2021/02/01/FAf8VEDdSNHBQLG.png');
            toEnvMap(texture);
            const geometry = new PlaneGeometry(3, 3);
            const material = new MeshBasicMaterial({ map: texture });
            const mesh = new Mesh(geometry, material);
            this.add(mesh);
            scene.background = texture;
            camera.position.z = 1;
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
