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
import { MTLLoader } from 'three-platformize/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three-platformize/examples/jsm/loaders/DDSLoader';
import { OBJLoader } from 'three-platformize/examples/jsm/loaders/OBJLoader';
import { AmbientLight, LinearEncoding, LoadingManager, PointLight, } from 'three-platformize';
export class DemoMTLLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera, renderer } = this.deps;
            const loadMgr = new LoadingManager();
            loadMgr.addHandler(/\.dds$/i, new DDSLoader());
            const mtlLoader = new MTLLoader(loadMgr);
            const objLoader = new OBJLoader(loadMgr);
            const materials = (yield mtlLoader.loadAsync(baseUrl + '/models/obj/male02/male02.mtl'));
            materials.preload();
            const object = (yield objLoader
                .setMaterials(materials)
                .loadAsync(baseUrl + '/models/obj/male02/male02.obj'));
            object.position.y = -95;
            this.addControl();
            this.add(new AmbientLight(0xcccccc, 0.4));
            this.addCamera(new PointLight(0xffffff, 0.8));
            this.add(object);
            this.add(camera);
            object.position.y = -95;
            camera.position.z = 200;
            renderer.outputEncoding = LinearEncoding;
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
