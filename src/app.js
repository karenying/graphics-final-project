/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Fog, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WashingtonScene } from 'scenes';

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const scene = new WashingtonScene(camera);
const renderer = new WebGLRenderer({ antialias: true /*alpha: true */ });

// Add fog
scene.fog = new Fog(new Color(0xd3d3d3), 0);

// Set up camera
camera.position.set(0, 5, 20);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Add key controls for car
function setupKeyControls() {
    var car = scene.getObjectByName('car');
    document.onkeydown = function (e) {
        car.inMotion = true;
        switch (e.keyCode) {
            case 37:
                car.position.x -= 0.25;
                break;
            case 39:
                car.position.x += 0.25;
                break;
            /*
            case 38:
                car.position.z--;
                break;
            case 40:
                car.position.z++;
                break;
            */
        }
    };
}

setupKeyControls();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
