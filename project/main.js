import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// see documentation to know the othes value in the boxgeometry.

// const geometry = new THREE.SphereGeometry(1, 16, 16)
// const geometry = new THREE.PlaneGeometry(1, 1, 2, 2)
  const geometry = new THREE.TorusKnotGeometry(20, 3, 100, 16)

const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

// custom geometry.

// const vertices = new Float32Array([
//   0, 0, 0,
//   0, 2, 0,
//   2, 0, 0,
// ]);

// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

// 3 is the itemSize it help the buffer to know how much points we store in the array.

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAttribute);

const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper);

const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);


// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// custom geometry in three js


// prespective camera

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);


camera.position.z = 5;


const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});


renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(window.innerWidth, window.innerHeight);

// inisilize the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// animation
const clock = new THREE.Clock();
let previousTime = 0;

const renderLoop = () => {

  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 4;

  // cubeMesh.scale.x = Math.sin(currentTime) + 1;
  // cubeMesh.position.x = Math.sin(currentTime) + 1;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
