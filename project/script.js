import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const touristKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

// initialize the material
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color('green');

pane.addBinding(material, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01
})
pane.addBinding(material, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01
})

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(touristKnotGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
// mesh.castShadow = true;

mesh2.position.x = 1.5;
plane.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(plane);

// set light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;  // Enable shadows for the directional light
directionalLight.shadow.mapSize.width = 1024;  // Adjust shadow quality
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 20;

scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;  // Enable shadow map in the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
