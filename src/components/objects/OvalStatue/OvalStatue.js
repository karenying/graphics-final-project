import { Group, BoxGeometry, BufferGeometry, Geometry, Mesh} from "three";

function createBox(x, y, z, materials) {
    var boxGeometry = new BoxGeometry(x, y, z);
    var box = new Mesh(boxGeometry, materials);
    return box;
}

class OvalStatue extends Group {
    constructor() {
        super();

        let colors = {
            stone: 0x41929e,
            blue: 0x41969e,
            base: 0x2f3634,
        };

        const geo = new Geometry();

        const top = new BoxGeometry(8.5, 8, 8);
        top.faces.forEach(f => f.color.set(colors.blue));
        geo.merge(top);

        const topLeft = new BoxGeometry(8, 8, 6, colors.stone);
        topLeft.faces.forEach(f => f.color.set(colors.stone));
        topLeft.translate(0, -0.5, -5);
        geo.merge(topLeft);

        // var topLeftCorner = createBox(7.5, 8, 6, materials.blue);
        // topLeft.add(topLeftCorner);
        // topLeftCorner.position.set(0, -0.5, -5)

        // var middleLeft = createBox(8.5, 10, 10, materials.stone);
        // topLeftCorner.add(middleLeft);
        // middleLeft.position.set(0, -7, -1)

        // var leftTip = createBox(8, 5, 5, materials.stone);
        // middleLeft.add(leftTip);
        // leftTip.position.set(0, -5, 5)

        // var leftInnerTip = createBox(7.5, 3, 3, materials.blue);
        // leftTip.add(leftInnerTip);
        // leftInnerTip.position.set(0, 0, 3);

        // var leftInnerPoint = createBox(8, 1, 1, materials.stone);
        // leftInnerTip.add(leftInnerPoint);
        // leftInnerPoint.position.set(0, 0, 2);

        // var bottomLeftCorner = createBox(9, 16, 8, materials.blue);
        // middleLeft.add(bottomLeftCorner);
        // bottomLeftCorner.position.set(0, -10, 0);
        
        // var bottomLeft = createBox(8, 10, 10, materials.stone);
        // bottomLeftCorner.add(bottomLeft);
        // bottomLeft.position.set(0, -11, 3);

        // var bottom = createBox(8.5, 8, 12, materials.blue);
        // bottomLeft.add(bottom);
        // bottom.position.set(0, -1, 8);

        // var topRight = createBox(8, 8, 6, materials.stone);
        // top.add(topRight);
        // topRight.position.set(0, -0.5, 5)

        // var topRightCorner = createBox(7.5, 8, 6, materials.blue);
        // topRight.add(topRightCorner);
        // topRightCorner.position.set(0, -0.5, 5)

        // var middleRight = createBox(8.5, 10, 10, materials.stone);
        // topRightCorner.add(middleRight);
        // middleRight.position.set(0, -7, 1)

        // var rightTip = createBox(8, 5, 5, materials.stone);
        // middleRight.add(rightTip);
        // rightTip.position.set(0, -5, -5)

        // var rightInnerTip = createBox(7.5, 2, 2, materials.blue);
        // rightTip.add(rightInnerTip);
        // rightInnerTip.position.set(0, 0, -3);

        // var rightInnerPoint = createBox(8, 0.5, 0.5, materials.stone);
        // rightInnerTip.add(rightInnerPoint);
        // rightInnerPoint.position.set(0, 0, -1.25);

        // var bottomRightCorner = createBox(9, 16, 8, materials.blue);
        // middleRight.add(bottomRightCorner);
        // bottomRightCorner.position.set(0, -10, 0);
        
        // var bottomRight = createBox(8, 10, 10, materials.stone);
        // bottomRightCorner.add(bottomRight);
        // bottomRight.position.set(0, -11, -3);

        // var base = createBox(20, 1, 40, materials.base);
        // bottom.add(base);
        // base.position.set(0, -4.5, 0)

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        this.add(mesh);
    }
}

export default OvalStatue;