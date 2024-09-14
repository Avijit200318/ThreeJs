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


const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

const uv2Sphere = new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2);
sphereGeometry.setAttribute('uv2', uv2Sphere);


// initialize the grass texture
const grassAlbedo = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
const grassAo = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png');
const grassHeight = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_height.png');
const grassMetalic = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png');
const grassNormal = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png');
const grassRoughness = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png');


// initialize the space texture
const spaceAlbedo = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png');
const spaceAo = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png');
const spaceHeight = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_height.png');
const spaceMetalic = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png');
const spaceNormal = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png');
const spaceRough = textureLoader.load('/texture/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png');

// initialize the material
const material = new THREE.MeshStandardMaterial();
const material2 = new THREE.MeshStandardMaterial();
const material3 = new THREE.MeshStandardMaterial();

// first material texture styles
material.map = grassAlbedo;
material.roughnessMap = grassRoughness;
material.roughness = 0.5;

material.metalnessMap = grassMetalic;
material.metalness = 0.1;

material.normalMap = grassNormal;

material.displacementMap = grassHeight;
material.displacementScale = 0.1

material.aoMap = grassAo;

// second materail texture method
material2.map = spaceAlbedo;
material2.roughnessMap = spaceRough;

material2.metalnessMap = spaceMetalic;

material2.normalMap = spaceNormal;

material2.displacementMap = spaceHeight;
material2.displacementScale = 0.05

console.log(spaceAo)
material2.aoMap = spaceAo;
// material2.aoMapIntensity = 1;
// for directional light the aoMapIntensity is default set to 1. so we did not see its difference.

pane.addBinding(material2, 'aoMapIntensity', {
  min: 0,
  max: 1,
  step: 0.01
})

pane.addBinding(material2, 'metalness', {
  min: 0,
  max: 1,
  step: 0.1
})

pane.addBinding(material2, 'roughness', {
  min: 0,
  max: 1,
  step: 0.1
})

const sphere = new THREE.Mesh(sphereGeometry, material);
const sphere2 = new THREE.Mesh(sphereGeometry, material2);
const sphere3 = new THREE.Mesh(sphereGeometry, material3);

sphere2.position.x = -1.5
sphere3.position.x = 1.5


scene.add(sphere);
scene.add(sphere2);
scene.add(sphere3);

// set light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);


// to see the aoMapIntensity we need ambientLight. so set it with very less intensity.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Half-intensity
scene.add(ambientLight);


const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(0, 0, 3);
pointLight.castShadow = true;

pointLight.shadow.mapSize.width = 1024;  // Increase resolution for sharper shadows
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;  // Control near clipping plane
pointLight.shadow.camera.far = 500;   // Control far clipping plane

scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
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
