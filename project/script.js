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
const textureTest = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
// console.log(textureTest)


// initialize the material
const material = new THREE.MeshBasicMaterial();
material.map = textureTest;
material.color = new THREE.Color("red");

// create group
const group = new THREE.Group();

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(touristKnotGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

mesh2.position.x = 1.5;
plane.position.x = -1.5;

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
// we can use this also
// scene.add(sphere, cylinder);
group.add(mesh2, mesh);
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

  // scene.children.forEach((child) => {
  //   if(child instanceof THREE.Mesh){
  //     child.rotation.y += 0.01;
  //   }
  // })
  // but the proble of this method is if we have to much mesh and we want only some of them to rotate then we have to create a group.

  group.children.forEach((child) => {
    if(child instanceof THREE.Mesh){
      child.rotation.y += 0.01;
    }
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
