import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({color: "red"});

const boxMesh = new THREE.Mesh(boxGeometry, material);

scene.add(boxMesh);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
})

const rendererLoop = () => {
  
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rendererLoop);
}

rendererLoop();