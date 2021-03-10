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
import { FloatType, Mesh, MeshBasicMaterial, PlaneBufferGeometry, ReinhardToneMapping, } from 'three-platformize';
import { EXRLoader } from 'three-platformize/examples/jsm/loaders/EXRLoader';
export class DemoEXRLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { renderer } = this.deps;
            const loader = new EXRLoader().setDataType(FloatType);
            const texture = yield loader.loadAsync(baseUrl + '/textures/memorial.exr');
            const material = new MeshBasicMaterial({ map: texture });
            const geometry = new PlaneBufferGeometry((4.5 * texture.image.width) / texture.image.height, 4.5);
            this.add(new Mesh(geometry, material));
            this.lastToneMapping = renderer.toneMapping;
            this.lastToneMappingExposure = renderer.toneMappingExposure;
            renderer.toneMapping = ReinhardToneMapping;
            renderer.toneMappingExposure = 2.0;
        });
    }
    update() { }
    dispose() {
        this.deps.renderer.toneMapping = this.lastToneMapping;
        this.deps.renderer.toneMappingExposure = this.lastToneMappingExposure;
        this.reset();
    }
}
