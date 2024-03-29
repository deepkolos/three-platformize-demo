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
import { DirectionalLight, AmbientLight } from 'three-platformize';
import { MeshoptDecoder } from 'three-platformize/tools/meshopt_decoder.wasm.module';
/**
 * ```
 * 模型地址： three.js\examples\models\gltf\PrimaryIonDrive.glb
 * 三角形数：52072
 * 顶点数：91798
 * 转换工具：gltfpack -i PrimaryIonDrive.glb -o PrimaryIonDrive-EXT_MESH_QUANTIZATION.glb
 *           gltfpack -i PrimaryIonDrive.glb -o PrimaryIonDrive-EXT_meshopt_compression.glb -cc
 *           gltf-pipeline -i PrimaryIonDrive.glb -o PrimaryIonDrive-Draco.glb
 *
 * 测试方式：点击菜单的重新进入小程序，加载glb记录时间，重复3次
 *
 *            大小      小米8加载(ms)     IPhone7(ms)
 * orginal    5.53 MB   357 | 284 | 242   584 | 239 | 574
 * mesh_quan  1.39 MB   332 | 301 | 306   261 | 343 | 345
 * meshopt    448 KB    118 | 114 | 110   手机不支持（需WASM）
 * Draco      1.58 MB   未适配Draco       未适配Draco
 * ```
 */
export class DemoMeshQuantization extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera, gltfLoader, scene } = this.deps;
            const t = Date.now();
            MeshoptDecoder.setWasmPath('/decoder_base.wasm');
            gltfLoader.setMeshoptDecoder(MeshoptDecoder);
            const gltf = yield gltfLoader.loadAsync(
            // 'https://cdn.static.oppenlab.com/weblf/test/PrimaryIonDrive.glb',
            'https://cdn.static.oppenlab.com/weblf/test/PrimaryIonDrive-EXT_MESH_QUANTIZATION.glb');
            const t1 = Date.now();
            console.log('load glb time', t1 - t);
            this.add(gltf.scene);
            this.add(new DirectionalLight(0xffffff, 1));
            this.add(new AmbientLight(0xffffff, 1));
            camera.position.z = 3;
            scene.position.z = 0;
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
