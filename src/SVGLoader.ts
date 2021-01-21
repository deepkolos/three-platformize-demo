import { Demo } from './Demo';
import {
  Group,
  MeshBasicMaterial,
  Color,
  DoubleSide,
  ShapeBufferGeometry,
  Mesh,
  GridHelper,
  LinearEncoding,
  sRGBEncoding,
} from 'three-platformize';
import { OrbitControls } from 'three-platformize/examples/jsm/controls/OrbitControls';
import {
  SVGLoader,
  SVGResult,
} from 'three-platformize/examples/jsm/loaders/SVGLoader';

const baseUrl = 'http://www.yanhuangxueyuan.com/threejs';

export class DemoSVGLoader extends Demo {
  orbitControl: OrbitControls;
  svgLoader: SVGLoader;
  svgGroup: Group;
  helper: GridHelper;

  async init(): Promise<void> {
    this.svgLoader = new SVGLoader();
    const svg = (await this.svgLoader.loadAsync(
      baseUrl + '/examples/models/svg/tiger.svg',
      // 'http://192.168.0.103:8080/test.svg'
    )) as SVGResult;
    this.svgGroup = this.initSVG(svg);

    this.helper = new GridHelper(160, 10);
    this.helper.rotation.x = Math.PI / 2;

    this.deps.scene.add(this.helper);
    this.deps.scene.add(this.svgGroup);
    this.deps.camera.position.set(0, 0, 200);

    // init controls
    this.orbitControl = new OrbitControls(
      this.deps.camera,
      this.deps.renderer.domElement,
    );
    this.orbitControl.enableDamping = true;
    this.orbitControl.dampingFactor = 0.05;

    this.deps.renderer.outputEncoding = LinearEncoding;
  }

  initSVG(svg: SVGResult) {
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
      if (
        guiData.drawFillShapes &&
        fillColor !== undefined &&
        fillColor !== 'none'
      ) {
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
      if (
        guiData.drawStrokes &&
        strokeColor !== undefined &&
        strokeColor !== 'none'
      ) {
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

          var geometry = SVGLoader.pointsToStroke(
            subPath.getPoints(),
            path.userData.style,
          );

          if (geometry) {
            var mesh = new Mesh(geometry, material);

            group.add(mesh);
          }
        }
      }
    }

    return group;
  }

  update(): void {
    this.orbitControl?.update();
  }

  dispose(): void {
    this.reset();
    this.deps.renderer.outputEncoding = sRGBEncoding;
    this.orbitControl.dispose();
    this.deps.scene.remove(this.helper);
    this.deps.scene.remove(this.svgGroup);
    this.orbitControl = null;
    this.svgGroup = null;
    this.helper = null;
    this.deps = null;
  }
}
