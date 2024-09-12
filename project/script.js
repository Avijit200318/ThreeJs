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
// console.log(geometry)

const uv2geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2geometry);

const planeGeometry = new THREE.PlaneGeometry(1, 1);

const uv2Plane = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2Plane);

const touristKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

const uv2Tourist = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2Tourist);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

const uv2Sphere = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2Sphere);

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

const uv2Cylinder = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2Cylinder);


// initialize the texture
const grassAlbedo = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
const grassAo = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png');
const grassHeight = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_height.png');
const grassMetalic = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png');
const grassNormal = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png');
const grassRoughness = textureLoader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png');



// initialize the material
const material = new THREE.MeshStandardMaterial();
material.map = grassAlbedo;
material.roughnessMap = grassRoughness;
material.roughness = 0.5;

// for grass image there is no metalic part so it did not add anything
material.metalnessMap = grassMetalic;
material.metalness = 0.1;
// if we used the metalic image then we set manually metalness. but since the image did not have any metalness then we have to commment the image to see it.

material.normalMap = grassNormal;
// tell threejs how the light simulate to the texture to create a realistic look

material.displacementMap = grassHeight;
material.displacementScale = 0.1

material.aoMap = grassAo;
// material.aoMapIntensity = 1;

pane.addBinding(material, 'aoMapIntensity', {
  min: 0,
  max: 1, 
  step: 0.01
})

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
scene.add(sphere);

group.add(mesh, mesh2);
scene.add(group);

// set light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(0, 0, 3);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 6;

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
