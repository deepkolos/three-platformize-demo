import { Demo } from "./Demo";
import { PlaneGeometry, MeshBasicMaterial, Mesh, BoxGeometry } from 'three-platformize'
import ThreeSpritePlayer from "three-sprite-player";

const url: Array<string> = (new Array<string>(3))
  .fill('')
  .map((v: string, k: number) => `/imgs/output-${k}.png`)

const tile = {
  url,
  x: 0,
  y: 0,
  z: -15,
  w: (10 * 358) / 358,
  h: 10,
  col: 2,
  row: 2,
  total: 10,
  fps: 16,
};

export class DemoThreeSpritePlayer extends Demo {
  mesh: Mesh<PlaneGeometry, MeshBasicMaterial>;
  player: ThreeSpritePlayer;
  box: Mesh<BoxGeometry, MeshBasicMaterial>;

  async init(): Promise<void> {
    const tiles = await Promise.all(tile.url.map(url => this.deps.textureLoader.loadAsync(url)))
    const spritePlayer = new ThreeSpritePlayer(
      tiles,
      tile.total,
      tile.row,
      tile.col,
      tile.fps,
      true,
    );

    const geometry = new PlaneGeometry(tile.w, tile.h);
    const material = new MeshBasicMaterial({
      map: spritePlayer.texture,
      transparent: false,
    });
    const mesh = new Mesh(geometry, material);
    const boxGeometry = new BoxGeometry();
    const box = new Mesh(boxGeometry, material);

    box.position.y = -1.2;
    mesh.position.z = -8;
    mesh.position.y = 4;

    this.deps.scene.add(mesh);
    this.deps.scene.add(box);

    this.box = box
    this.mesh = mesh
    this.player = spritePlayer
  }

  update(): void {
    this.player.animate()
    this.mesh.material.map = this.player.texture
  }

  dispose(): void {
    this.deps.scene.remove(this.mesh)
    this.deps.scene.remove(this.box)
    this.player.dispose()
    this.box.geometry.dispose()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    this.mesh.geometry = null
    this.mesh.material = null
    this.box = null
    this.mesh = null
    this.player = null
    this.deps = null
  }
}