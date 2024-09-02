import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh = new THREE.Mesh(
  cubeGeometry, cubeMaterial
)
scene.add(cubeMesh);

// prespective camera

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);

// orthograpic camera

// const aspectRatio = window.innerWidth / window.innerHeight;
// // aspect raito is needed for orthograpicCamera other wise it streach the object the we want to view in screen view size.
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200);

camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

// inisilize the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
