import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
} from 'three';

class Road extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            gameSpeed: parent.gameSpeed,
            pause: false,
        };

        const planeGeometry = new PlaneGeometry(5, 200);
        const planeMaterial = new MeshStandardMaterial({
            color: 0x1f1f1f,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;

        const stripeGeometry = new PlaneGeometry(0.2, 3);
        const stripeMaterial = new MeshStandardMaterial({
            color: 0xfad201,
            side: DoubleSide,
        });

        let stripe = new Mesh(stripeGeometry, stripeMaterial);
        stripe.rotation.x = Math.PI / 2;
        stripe.position.y = 0.1;
        stripe.position.z = 5;

        this.add(plane, stripe);
        parent.addToUpdateList(this);
    }

    update(timestamp) {
        const { cameraPosition, gameSpeed, pause } = this.state;
        this.position.z += gameSpeed;

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 200;
        }
    }
}

export default Road;
