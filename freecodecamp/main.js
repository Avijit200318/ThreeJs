import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from "tweakpane";

const scene = new THREE.Scene();
const pane = new Pane();

const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(1, 64, 40);

const earthTexture = textureLoader.load('/texture/2k_earth_daymap.jpg');
const moonTexture = textureLoader.load('/texture/2k_moon.jpg');
const backgroundTexture = textureLoader.load('/texture/8k_stars.jpg');

scene.background = backgroundTexture;

const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture})

const earth = new THREE.Mesh(planetGeometry, earthMaterial);
scene.add(earth);

const moon = new THREE.Mesh(planetGeometry, moonMaterial);
moon.position.x = 1.5;
moon.scale.setScalar(0.2);
earth.add(moon);

earthMaterial.roughness = 0.5;
earthMaterial.metalness = 0.3;

const light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add( light );

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(3, 0, 3);
scene.add(pointLight);

console.log(scene)

const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 100);

camera.position.z = 5;

// render
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
  earth.rotation.y += 0.005;
  moon.rotation.y += 0.02;
  moon.position.x = Math.sin(moon.rotation.y * 0.25) * 1.5;
  moon.position.z = Math.cos(moon.rotation.y * 0.25) * 1.5;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();