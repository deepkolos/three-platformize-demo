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
import { AmbientLight, Color, PointLight } from 'three-platformize';
// import { MeshoptDecoder } from 'three-platformize/examples/jsm/libs/meshopt_decoder.module';
// import { MeshoptDecoder } from 'three-platformize/tools/meshopt_decoder.asm.module';
import { MeshoptDecoder } from 'three-platformize/tools/meshopt_decoder.wasm.module';
/**
 * 测试手机：小米8 (微信8.0禁用WebAssembly API，改为WXWebAssembly, 并且不支持SIMD，但是IOS支持WXWebAssembly)
 *
 * 加载时间ms
 *  wasm 58  61  62   (WebAssembly API)
 *  wasm 50  73  83   (WXWebAssembly API)
 *  asm  144 139 134
 *
 * IPhone7
 *  wasm 22  22  22   (WXWebAssembly API)
 */
MeshoptDecoder.setWasmPath('/decoder_base.wasm');
export class DemoMeshOpt extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { gltfLoader, camera, scene } = this.deps;
            gltfLoader.setMeshoptDecoder(MeshoptDecoder);
            const t = Date.now();
            const gltf = (yield gltfLoader.loadAsync(
            // 'https://meshoptimizer.org/demo/pirate.glb',
            'https://cdn.static.oppenlab.com/weblf/test/pirate.glb'));
            console.log(Date.now() - t);
            const pointLight = new PointLight(0xffffff, 0.8);
            pointLight.position.set(3, 3, 0);
            this.add(new AmbientLight(0xcccccc, 0.3));
            this.add(gltf.scene);
            this.add(camera);
            this.addCamera(pointLight);
            gltf.scene.position.y = -1;
            scene.position.z = 0;
            camera.position.y = 1.0;
            camera.position.z = 3.0;
            scene.background = new Color(0x300a24);
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
