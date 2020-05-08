import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Group, BoxGeometry,  Mesh, MeshToonMaterial} from "three";

class MalePedestrianShorts extends Group {
    constructor(parent) {
        super();

        // Init state
        this.state = {
            bob: true,
            walking: true,
            type: 'chad',
        };

        let materials = this.getMaterials();

        this.name = 'pedestrian';
        this.speed = 0.03; // 0.03

        // Create bounding box
        var bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.bb = bb;
        this.collected = false;

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // head
        var headGeometry = new BoxGeometry(1.5, 1.5, 0.75);
        var head = new Mesh(headGeometry, materials.skin);
        head.name = "head"
        head.position.set(0, 4, 0);

        var leftEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        var leftEye = new Mesh(leftEyeGeometry, materials.eye);
        leftEye.name = "left eye";
        head.add(leftEye);
        leftEye.position.set(-0.4, 0.25, 0.4);

        var rightEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        var rightEye = new Mesh(rightEyeGeometry, materials.eye);
        rightEye.name = "right eye";
        head.add(rightEye);
        rightEye.position.set(0.4, 0.25, 0.4);

        var leftEarGeometry = new BoxGeometry(0.2, 0.5, 0.25);
        var leftEar = new Mesh(leftEarGeometry, materials.skin);
        leftEar.name = "left ear";
        head.add(leftEar);
        leftEar.position.set(-0.85, 0, 0);

        var rightEarGeometry = new BoxGeometry(0.2, 0.5, 0.25);
        var rightEar = new Mesh(rightEarGeometry, materials.skin);
        rightEar.name = "right ear";
        head.add(rightEar);
        rightEar.position.set(0.85, 0, 0);

        var hairGeometry = new BoxGeometry(1.7, 0.5, 1);
        var hair = new Mesh(hairGeometry, materials.hair);
        hair.name = "hair";
        head.add(hair);
        hair.position.set(0, 0.9, 0);

        var noseGeometry = new BoxGeometry(0.25, 0.5, 0.25);
        var nose = new Mesh(noseGeometry, materials.skin);
        nose.name = "nose";
        head.add(nose);
        nose.position.set(0, 0, 0.4);
        nose.rotation.x = -20 * (Math.PI/180);

        var shirtGeometry = new BoxGeometry(1.75, 2, 1);
        var shirt = new Mesh(shirtGeometry, materials.shirt);
        head.add(shirt)
        shirt.name = "shirt";
        shirt.position.set(0, -1.75, 0);

        // left arm
        var leftArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        leftArmGeometry.translate(0, -1, 0);
        var leftArm = new Mesh(leftArmGeometry, materials.skin);
        leftArm.name = "left arm";
        leftArm.position.set(-1.15, 3, 0);

        var leftShirtGeometry = new BoxGeometry(0.65, 0.75, 0.65);
        leftShirtGeometry.translate(0, -1, 0);
        var leftShirt = new Mesh(leftShirtGeometry, materials.shirt);
        leftShirt.name = "left shirt";
        leftArm.add(leftShirt);
        leftShirt.position.set(0, 0.75, 0);

        // right arm
        var rightArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        rightArmGeometry.translate(0, -1, 0);
        var rightArm = new Mesh(rightArmGeometry, materials.skin);
        rightArm.name = "right arm";
        rightArm.position.set(1.15, 3, 0);

        var rightShirtGeometry = new BoxGeometry(0.65, 0.75, 0.65);
        rightShirtGeometry.translate(0, -1, 0);
        var rightShirt = new Mesh(rightShirtGeometry, materials.shirt);
        rightShirt.name = "right shirt";
        rightArm.add(rightShirt);
        rightShirt.position.set(0, 0.75, 0);

        // left leg
        var leftLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        leftLegGeometry.translate(0, -1, 0);
        var leftLeg = new Mesh(leftLegGeometry, materials.skin);
        leftLeg.name = "left leg";
        leftLeg.position.set(-0.5, 1.25, 0);

        var leftShortsGeometry = new BoxGeometry(0.7, 1.25, 0.65);
        leftShortsGeometry.translate(0, -1, 0);
        var leftShorts = new Mesh(leftShortsGeometry, materials.shorts);
        leftShorts.name = "left shorts";
        leftLeg.add(leftShorts);
        leftShorts.position.set(0, 0.75, 0);

        var leftShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        var leftShoe = new Mesh(leftShoeGeometry, materials.shoes);
        leftShoe.name = "left shoe";
        leftLeg.add(leftShoe);
        leftShoe.position.set(0, -2.5, 0.15);

        // right leg
        var rightLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        rightLegGeometry.translate(0, -1, 0);
        var rightLeg = new Mesh(rightLegGeometry, materials.skin);
        rightLeg.name = "right leg";
        rightLeg.position.set(0.5, 1.25, 0);

        var rightShortsGeometry = new BoxGeometry(0.7, 1.25, 0.65);
        rightShortsGeometry.translate(0, -1, 0);
        var rightShorts = new Mesh(rightShortsGeometry, materials.shorts);
        rightShorts.name = "right shorts";
        rightLeg.add(rightShorts);
        rightShorts.position.set(0, 0.75, 0);

        var rightShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        var rightShoe = new Mesh(rightShoeGeometry, materials.shoes);
        rightShoe.name = "right shoe";
        rightLeg.add(rightShoe);
        rightShoe.position.set(0, -2.5, 0.15)

        this.add(head, leftArm, rightArm, leftLeg, rightLeg);

        this.scale.set(0.25, 0.25, 0.25);
        this.rotation.y = -1 * (Math.PI/2);

        // compute bounding box
        for (const mesh of this.children) {
          var box = new THREE.Box3();
          box.setFromObject(mesh);
          this.bb.union(box);
        }

        // visualize bounding box
        var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
        // this.add(bbHelper);
    }

    getMaterials() {
        switch(this.state.type) {
            case 'chad':
                let chadMaterials = {
                    eye: new MeshToonMaterial({
                        color: 0x36699c,
                        flatShading: true,
                    }),
                    hair: new MeshToonMaterial({
                        color: 0xd1c569,
                        flatShading: true,
                    }),
                    skin: new MeshToonMaterial({
                        color: 0xb48a78,
                        flatShading: true,
                    }),
                    shorts: new MeshToonMaterial({
                        color: 0xed7490,
                        flatShading: true,
                    }),
                    shirt: new MeshToonMaterial({
                        color: 0x72afed,
                        flatShading: true,
                    }),
                    shoes: new MeshToonMaterial({
                        color: 0x3b2403,
                        flatShading: true,
                    }),
                };
                return chadMaterials;
        }
    }

    update(timeStamp) {
        var Pulse = function(hertz,fn) {
            if (!fn) fn = Math.sin;
            return function (min,max) {
                if (!min) min = 0;
                if (!max) max = 1;
                return min+(0.5*(1+fn(2*Math.PI*hertz*new Date()/1000))*(max-min));
            };
        }

        var pulseSingle = new Pulse(0.75);

        if (this.state.bob) {
            // Bob back and forth
            this.rotation.x = 0.05 * Math.sin(timeStamp / 200);
        }

        if (this.state.walking) {
            // left arm
            this.children[1].rotation.x = pulseSingle(-25,25) * -1 * (Math.PI/180);
            // right arm
            this.children[2].rotation.x = pulseSingle(-25,25) * (Math.PI/180);
            // left leg
            this.children[3].rotation.x = pulseSingle(-20,40) * (Math.PI/180);
            // right leg
            this.children[4].rotation.x = pulseSingle(-40,20) * -1 * (Math.PI/180);
        }

        // update positions (cross road and move towards car)
        var newZ = this.position.z + this.parent.gameSpeed;
        if (newZ > this.parent.camera.position.z) {
          newZ = -(this.parent.fog.far + 70 * Math.random());
        }
        this.position.z = newZ;

        if (!this.collected) {
          var newX = this.position.x - this.speed;

          // if pedestrian is done crossing road or no longer visible in scene
          if (newX < -this.parent.edge) {
              newZ = -(this.parent.fog.far + 70 * Math.random());
              newX = Math.floor(Math.random() * this.parent.edge) + this.parent.edge / 2;
              this.resetParams();
          }
          this.position.x = newX;
        }

        // Advance tween animations, if any exist
        TWEEN.update();
    }

    resetParams() {
      this.position.y = 0.5;
      this.collected = false;
    }

    onCollision() {
      if (!this.collected) {
        this.collected = true;
        const spin = new TWEEN.Tween(this.rotation)
            .to({ y: this.rotation.y + 2 * Math.PI }, 200);
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 2 }, 200)
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

export default MalePedestrianShorts;
