import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const touristKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

const material = new THREE.MeshPhongMaterial();
// to use this material we also need a light;
material.castShadow = true;
material.receiveShadow = true;


const cubeMesh = new THREE.Mesh(cubeGeometry, material);
const cubeMesh2 = new THREE.Mesh(touristKnotGeometry, material);
cubeMesh2.position.x = 1.5;
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(plane);

// light for mesh
// const light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 4);
pointLight.position.set(5,5,5);
pointLight.castShadow = true;
scene.add(pointLight);


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
console.log(scene)

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
