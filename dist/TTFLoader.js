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
import { TTFLoader } from 'three-platformize/examples/jsm/loaders/TTFLoader';
import { Color, Fog, DirectionalLight, PointLight, MeshPhongMaterial, Group, Mesh, MeshBasicMaterial, PlaneBufferGeometry, LinearEncoding, } from 'three-platformize';
import { TextGeometry } from 'three-platformize/examples/jsm/geometries/TextGeometry';
import { Font } from 'three-platformize/examples/jsm/loaders/FontLoader';
const text = 'three.js';
const height = 20, size = 70, hover = 30, curveSegments = 4, bevelThickness = 2, bevelSize = 1.5;
const mirror = true;
export class DemoTTFLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera, scene, renderer } = this.deps;
            // CAMERA
            camera.position.set(0, 400, 700);
            // SCENE
            scene.background = new Color(0x000000);
            scene.fog = new Fog(0x000000, 250, 1400);
            // LIGHTS
            const dirLight = new DirectionalLight(0xffffff, 0.125);
            dirLight.position.set(0, 0, 1).normalize();
            this.add(dirLight);
            const pointLight = new PointLight(0xffffff, 1.5);
            pointLight.position.set(0, 100, 90);
            pointLight.color.setHSL(Math.random(), 1, 0.5);
            this.add(pointLight);
            const material = new MeshPhongMaterial({
                color: 0xffffff,
                flatShading: true,
            });
            const group = new Group();
            group.position.y = 100;
            this.add(group);
            const loader = new TTFLoader();
            const json = yield loader.loadAsync(baseUrl + '/fonts/ttf/kenpixel.ttf');
            console.log(json);
            this.createText(new Font(json), group, material);
            const plane = new Mesh(new PlaneBufferGeometry(10000, 10000), new MeshBasicMaterial({
                color: 0xffffff,
                opacity: 0.5,
                transparent: true,
            }));
            plane.position.y = 100;
            plane.rotation.x = -Math.PI / 2;
            renderer.outputEncoding = LinearEncoding;
            this.add(plane);
            this.addControl();
        });
    }
    createText(font, group, material) {
        const textGeo = new TextGeometry(text, {
            font: font,
            size: size,
            height: height,
            curveSegments: curveSegments,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: true,
        });
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
        const textMesh1 = new Mesh(textGeo, material);
        textMesh1.position.x = centerOffset;
        textMesh1.position.y = hover;
        textMesh1.position.z = 0;
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;
        group.add(textMesh1);
        if (mirror) {
            const textMesh2 = new Mesh(textGeo, material);
            textMesh2.position.x = centerOffset;
            textMesh2.position.y = -hover;
            textMesh2.position.z = height;
            textMesh2.rotation.x = Math.PI;
            textMesh2.rotation.y = Math.PI * 2;
            group.add(textMesh2);
        }
    }
    update() {
        var _a;
        (_a = this.orbitControl) === null || _a === void 0 ? void 0 : _a.update();
    }
    dispose() {
        this.reset();
    }
}
