import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const touristKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// initialize the texture
// const grassTexture = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');

const grassTexture = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png');

// repeat the texture y direction 10 times and x 10 times
grassTexture.repeat.set(10, 10);
// repeat the textrue both y and x
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
// grassTexture.wrapS = THREE.MirroredRepeatWrapping;
// grassTexture.wrapT = THREE.MirroredRepeatWrapping;

// grassTexture.offset.x = 0.5;
// offset is used to set the texture propely position. for example if we want to add some design to the middle.

// this pane create a gui which help us to select the perfect value of the texture.
pane.addBinding(grassTexture, 'offset', {
  x: {
    min: -1,
    max: 1,
    step: 0.001
  },
  y: {
    min: -1,
    max: 1,
    step: 0.001
  }
})

// initialize the material
const material = new THREE.MeshBasicMaterial();
material.map = grassTexture;

// create group
const group = new THREE.Group();

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(touristKnotGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

mesh2.position.x = 1.5;
plane.position.x = -1.5;
plane.rotation.x = -(Math.PI * 0.5);
plane.scale.set(100, 100);

// we can also define it this way
const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;

const cylinder = new THREE.Mesh(cylinderGeometry, material);

sphere.position.y = 1.5;
cylinder.position.y = -1.5;

scene.add(plane);
scene.add(cylinder);
scene.add(sphere);
scene.add(sphere);
scene.add(mesh);
scene.add(mesh2);
// we can use this also
// scene.add(sphere, cylinder);
group.add(plane);
scene.add(group);

// set light
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

camera.position.z = 10;
camera.position.y = 5;

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
  // group.children.forEach((child) => {
  //   if(child instanceof THREE.Mesh){
  //     child.rotation.y += 0.01;
  //   }
  // })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
