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
import { VTKLoader } from 'three-platformize/examples/jsm/loaders/VTKLoader';
import { AmbientLight, DirectionalLight, DoubleSide, Mesh, MeshLambertMaterial, } from 'three-platformize';
export class DemoVTKLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //创建兰伯特材质
            const material = new MeshLambertMaterial({
                color: 0x123456,
                side: DoubleSide,
            });
            const vtkLoader = new VTKLoader();
            const geometry = yield vtkLoader.loadAsync(baseUrl + 'models/vtk/bunny.vtk');
            const mesh = new Mesh(geometry, material);
            mesh.scale.multiplyScalar(10);
            this.add(new DirectionalLight(0xffffff, 1));
            this.add(new AmbientLight(0xffffff, 1));
            this.add(mesh);
            this.deps.camera.position.z = 10;
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
