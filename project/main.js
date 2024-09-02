import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh = new THREE.Mesh(
  cubeGeometry, cubeMaterial
)
scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);

camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

// inisilize the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
