import { Group, BoxGeometry,  Mesh} from "three";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class FemalePedestrianDress extends Group {
    constructor(parent, materials) {
        super();

        // Init state
        this.state = {
            bob: true,
            walking: true,
        };

        // head
        var headGeometry = new BoxGeometry(1.5, 1.5, 0.75);
        var head = new Mesh(headGeometry, materials.skin);
        head.name = "head"
        head.position.set(0, 4, 0);

        var leftEyeGeometry = new BoxGeometry(0.1, 0.1, 0.1);
        var leftEye = new Mesh(leftEyeGeometry, materials.eye);
        leftEye.name = "left eye";
        head.add(leftEye);
        leftEye.position.set(-.4, 0.25, 0.4);

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

        var bangsGeometry = new BoxGeometry(1.7, 0.5, 1);
        var bangs = new Mesh(bangsGeometry, materials.hair);
        bangs.name = "bangs";
        head.add(bangs);
        bangs.position.set(0, 0.9, 0);

        var hairGeometry = new BoxGeometry(2, 2.5, 1);
        var hair = new Mesh(hairGeometry, materials.hair);
        hair.name = "hair";
        head.add(hair);
        hair.position.set(0, 0.05, -0.5);

        var noseGeometry = new BoxGeometry(0.25, 0.5, 0.25);
        var nose = new Mesh(noseGeometry, materials.skin);
        nose.name = "nose";
        head.add(nose);
        nose.position.set(0, 0, 0.4);
        nose.rotation.x = -20 * (Math.PI/180);

        var dressGeometry = new BoxGeometry(1.75, 3, 1);
        var dress = new Mesh(dressGeometry, materials.dress);
        head.add(dress)
        dress.name = "dress";
        dress.position.set(0, -2.25, 0);

        var dressFrontSkirtGeometry = new BoxGeometry(1.74, 1, 0.7);
        var dressFrontSkirt = new Mesh(dressFrontSkirtGeometry, materials.dress);
        dress.add(dressFrontSkirt)
        dressFrontSkirt.name = "dressSkirt";
        dressFrontSkirt.position.set(0, -0.9, 0.5);
        dressFrontSkirt.rotation.x = -35 * (Math.PI/180);

        var dressBackSkirtGeometry = new BoxGeometry(1.74, 1, 0.7);
        var dressBackSkirt = new Mesh(dressBackSkirtGeometry, materials.dress);
        dress.add(dressBackSkirt)
        dressBackSkirt.name = "dressSkirt";
        dressBackSkirt.position.set(0, -0.9, -0.5);
        dressBackSkirt.rotation.x = 35 * (Math.PI/180);

        // left arm
        var leftArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        leftArmGeometry.translate(0, -1, 0);
        var leftArm = new Mesh(leftArmGeometry, materials.skin);
        leftArm.name = "left arm";
        leftArm.position.set(-1.15, 3, 0);

        // right arm
        var rightArmGeometry = new BoxGeometry(0.45, 2, 0.5);
        rightArmGeometry.translate(0, -1, 0);
        var rightArm = new Mesh(rightArmGeometry, materials.skin);
        rightArm.name = "right arm";
        rightArm.position.set(1.15, 3, 0);

        // left leg
        var leftLegGeometry = new BoxGeometry(0.6, 2.75, 0.55);
        leftLegGeometry.translate(0, -1, 0);
        var leftLeg = new Mesh(leftLegGeometry, materials.skin);
        leftLeg.name = "left leg";
        leftLeg.position.set(-0.5, 1.25, 0);

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

        var rightShoeGeometry = new BoxGeometry(0.75, 0.5, 1.25);
        var rightShoe = new Mesh(rightShoeGeometry, materials.shoes);
        rightShoe.name = "right shoe";
        rightLeg.add(rightShoe);
        rightShoe.position.set(0, -2.5, 0.15)

        this.add(head, leftArm, rightArm, leftLeg, rightLeg);

        // Add self to parent's update list
        parent.addToUpdateList(this);
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

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default FemalePedestrianDress;