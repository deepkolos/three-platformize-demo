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
import { AmbientLight, LinearEncoding, PointLight } from 'three-platformize';
import { OBJLoader } from 'three-platformize/examples/jsm/loaders/OBJLoader';
export class DemoOBJLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { textureLoader, camera, renderer } = this.deps;
            const uvMap = yield textureLoader.loadAsync(baseUrl + '/textures/UV_Grid_Sm.jpg');
            const objLoader = new OBJLoader();
            const object = yield objLoader.loadAsync(baseUrl + '/models/obj/male02/male02.obj');
            this.add(new AmbientLight(0xcccccc, 0.4));
            this.addCamera(new PointLight(0xffffff, 0.8));
            this.add(object);
            this.add(camera);
            object.traverse(function (child) {
                // @ts-ignore
                if (child.isMesh)
                    child.material.map = uvMap;
            });
            object.position.y = -95;
            camera.position.z = 200;
            renderer.outputEncoding = LinearEncoding;
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
