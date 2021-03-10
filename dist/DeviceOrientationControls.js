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
import { DeviceOrientationControls } from 'three-platformize/examples/jsm/controls/DeviceOrientationControls';
import { SphereBufferGeometry, MeshBasicMaterial, Mesh, BoxBufferGeometry } from 'three-platformize';
export class DemoDeviceOrientationControls extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera, textureLoader } = this.deps;
            this.control = new DeviceOrientationControls(camera);
            const geometry = new SphereBufferGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1);
            const material = new MeshBasicMaterial({
                map: yield textureLoader.loadAsync('https://s3.ax1x.com/2021/02/26/yx0quq.jpg'),
            });
            const helperGeometry = new BoxBufferGeometry(100, 100, 100, 4, 4, 4);
            const helperMaterial = new MeshBasicMaterial({
                color: 0xff00ff,
                wireframe: true,
            });
            this.add(new Mesh(geometry, material));
            this.add(new Mesh(helperGeometry, helperMaterial));
        });
    }
    update() {
        var _a;
        (_a = this.control) === null || _a === void 0 ? void 0 : _a.update();
    }
    dispose() {
        this.reset();
        this.control.disconnect();
        this.control.dispose();
        this.control = null;
    }
}
