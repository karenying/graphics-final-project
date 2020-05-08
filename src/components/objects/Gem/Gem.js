import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Gem.glb';

import { Group,
  Mesh,
  MeshToonMaterial,
  MeshStandardMaterial,
  CircleGeometry,
  DoubleSide,
  CylinderGeometry } from 'three';

var Colors = {
  yellow: 0xf7ee6d,
  darkyellow: 0xff8617,
};

class Gem extends Group {

  constructor(parent) {
    super();

    const loader = new GLTFLoader();

    this.name = 'gem';
    loader.load(MODEL, (gltf) => {
        this.add(gltf.scene);
    });

    parent.addToUpdateList(this);
    // Create bounding box
    var bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.bb = bb;
    this.collected = false;

    this.init();
  }

  init() {
    debugger;
    this.scale.set(0.15, 0.15, 0.15);
    this.rotateX(3 * Math.PI / 2);
    // compute bounding box
    for (const mesh of this.children) {
      var box = new THREE.Box3();
      box.setFromObject(mesh);
      this.bb.union(box);
    }

    // visualize bounding box
    var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
    this.add(bbHelper);
  }

  update(timeStamp) {
    this.position.y =  0.5 + Math.abs(Math.sin(timeStamp / 80) / 18);

    var newZ = this.position.z + this.parent.gameSpeed;
    if (newZ > this.parent.camera.position.z) {
      newZ = -(this.parent.fog.far + 70 * Math.random());
      while (newZ > this.parent.camera.position.z - 50) {
        newZ = -(this.parent.fog.far + 70 * Math.random());
      }
    }
    this.position.z = newZ;

    // Advance tween animations, if any exist
    TWEEN.update();
  }

  resetParams() {
    this.collected = false;
  }

  onCollision() {
    if (!this.collected) {
      this.collected = true;
      const spin = new TWEEN.Tween(this.rotation)
          .to({ y: this.rotation.y + 2 * Math.PI }, 200);
      const jumpUp = new TWEEN.Tween(this.position)
          .to({ y: this.position.y + 3 }, 200)
          .easing(TWEEN.Easing.Quadratic.Out);
      const fallDown = new TWEEN.Tween(this.position)
          .to({ y: -1 }, 300)
          .easing(TWEEN.Easing.Quadratic.In);
      const resetPos = new TWEEN.Tween(this.position)
          .to({ z: -(this.parent.fog.far + 50 * Math.random()) }, 0);

      // Reset position after jumping up and down
      jumpUp.onComplete(() => fallDown.start());
      fallDown.onComplete(() => resetPos.start());
      resetPos.onComplete(() => this.resetParams());

      // Start animation
      jumpUp.start();
      spin.start();
    }
  }

}

export default Gem;
