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
import { Group, MeshBasicMaterial, Color, DoubleSide, ShapeBufferGeometry, Mesh, GridHelper, LinearEncoding, } from 'three-platformize';
import { SVGLoader, } from 'three-platformize/examples/jsm/loaders/SVGLoader';
const baseUrl = 'https://techbrood.com/threejs';
export class DemoSVGLoader extends Demo {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { camera, renderer } = this.deps;
            const svgLoader = new SVGLoader();
            const svg = (yield svgLoader.loadAsync(baseUrl + '/examples/models/svg/tiger.svg'));
            const helper = new GridHelper(160, 10);
            helper.rotation.x = Math.PI / 2;
            this.add(helper);
            this.add(this.initSVG(svg));
            this.addControl();
            camera.position.set(0, 0, 200);
            renderer.outputEncoding = LinearEncoding;
        });
    }
    initSVG(svg) {
        const guiData = {
            drawFillShapes: true,
            drawStrokes: true,
            fillShapesWireframe: false,
            strokesWireframe: false,
        };
        const { paths } = svg;
        var group = new Group();
        group.scale.multiplyScalar(0.25);
        group.position.x = -70;
        group.position.y = 70;
        group.scale.y *= -1;
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            var fillColor = path.userData.style.fill;
            if (guiData.drawFillShapes &&
                fillColor !== undefined &&
                fillColor !== 'none') {
                var material = new MeshBasicMaterial({
                    color: new Color().setStyle(fillColor),
                    opacity: path.userData.style.fillOpacity,
                    transparent: path.userData.style.fillOpacity < 1,
                    side: DoubleSide,
                    depthWrite: false,
                    wireframe: guiData.fillShapesWireframe,
                });
                var shapes = path.toShapes(true);
                for (var j = 0; j < shapes.length; j++) {
                    var shape = shapes[j];
                    var geometry = new ShapeBufferGeometry(shape);
                    var mesh = new Mesh(geometry, material);
                    group.add(mesh);
                }
            }
            var strokeColor = path.userData.style.stroke;
            if (guiData.drawStrokes &&
                strokeColor !== undefined &&
                strokeColor !== 'none') {
                var material = new MeshBasicMaterial({
                    color: new Color().setStyle(strokeColor),
                    opacity: path.userData.style.strokeOpacity,
                    transparent: path.userData.style.strokeOpacity < 1,
                    side: DoubleSide,
                    depthWrite: false,
                    wireframe: guiData.strokesWireframe,
                });
                for (var j = 0, jl = path.subPaths.length; j < jl; j++) {
                    var subPath = path.subPaths[j];
                    var geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                    if (geometry) {
                        var mesh = new Mesh(geometry, material);
                        group.add(mesh);
                    }
                }
            }
        }
        return group;
    }
    update() {
        var _a;
        (_a = this.orbitControl) === null || _a === void 0 ? void 0 : _a.update();
    }
    dispose() {
        this.reset();
    }
}
