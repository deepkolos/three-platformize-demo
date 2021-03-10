import { sRGBEncoding, } from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';
export const baseUrl = 'http://www.yanhuangxueyuan.com/threejs/examples';
export class Demo {
    constructor(deps) {
        this._objects = [];
        this._cameraObjects = [];
        this.deps = deps;
    }
    add(obj) {
        this._objects.push(obj);
        this.deps.scene.add(obj);
    }
    addCamera(obj) {
        this._cameraObjects.push(obj);
        this.deps.camera.add(obj);
    }
    addControl() {
        const { camera, renderer } = this.deps;
        this.orbitControl = new OrbitControls(camera, renderer.domElement);
        this.orbitControl.enableDamping = true;
        this.orbitControl.dampingFactor = 0.05;
    }
    reset() {
        var _a, _b, _c;
        const { camera, scene, renderer } = this.deps;
        camera.position.set(0, 0, 0);
        camera.quaternion.set(0, 0, 0, 1);
        (_b = (_a = scene.background) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
        scene.background = null;
        scene.fog = null;
        scene.position.z = -3;
        renderer.shadowMap.enabled = false;
        renderer.physicallyCorrectLights = false;
        renderer.outputEncoding = sRGBEncoding;
        this._objects.forEach(object => { var _a, _b; return (_b = (_a = object.material) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a); });
        this._cameraObjects.forEach(object => { var _a, _b; return (_b = (_a = object.material) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a); });
        scene.remove(...this._objects);
        camera.remove(...this._cameraObjects);
        this._objects.length = 0;
        this._cameraObjects.length = 0;
        (_c = this.orbitControl) === null || _c === void 0 ? void 0 : _c.dispose();
        this.orbitControl = null;
        this.deps = null;
    }
}
