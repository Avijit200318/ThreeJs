import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const fog = new THREE.Fog('#262837', 1, 45);
scene.fog = fog;

// texture
const textureLoader = new THREE.TextureLoader();

// textures
const doorAmbient = textureLoader.load("/texture/Door_Wood_001_ambientOcclusion.jpg");
const doorMetalic = textureLoader.load("/texture/Door_Wood_001_metallic.jpg");
const doorBasecolor = textureLoader.load("/texture/Door_Wood_001_basecolor.jpg");
const doorNormal = textureLoader.load("/texture/Door_Wood_001_normal.jpg");
const doorRoughness = textureLoader.load("/texture/Door_Wood_001_roughness.jpg");
const doorHeight = textureLoader.load("/texture/Door_Wood_001_height.png");
const doorAlpha = textureLoader.load("/texture/Door_Wood_001_opacity.jpg");


const brickAmbient = textureLoader.load("/texture/wall/Stylized_Bricks_005_ambientOcclusion.png");
const brickBasecolor = textureLoader.load("/texture/wall/Stylized_Bricks_005_basecolor.png");
const brickRoughness = textureLoader.load("/texture/wall/Stylized_Bricks_005_roughness.png");
const brickNormal = textureLoader.load("/texture/wall/Stylized_Bricks_005_normal.png");

const grassAmbient = textureLoader.load("/texture/grass/Stylized_Grass_001_ambientOcclusion.jpg");
const grassBasecolor = textureLoader.load("/texture/grass/Stylized_Grass_001_basecolor.jpg");
const grassRoughness = textureLoader.load("/texture/grass/Stylized_Grass_001_roughness.jpg");
const grassNormal = textureLoader.load("/texture/grass/Stylized_Grass_001_normal.jpg");
const grassHeight = textureLoader.load("/texture/grass/Stylized_Grass_001_height.png");

// repeat value for the textures
grassAmbient.repeat.set(8, 8);
grassBasecolor.repeat.set(8, 8);
// grassRoughness.repeat.set(8, 8);
grassNormal.repeat.set(8, 8);
grassHeight.repeat.set(8, 8);

// repeating the textures
grassAmbient.wrapS = THREE.RepeatWrapping;
grassBasecolor.wrapS = THREE.RepeatWrapping;
// grassRoughness.wrapS = THREE.RepeatWrapping;
grassNormal.wrapS = THREE.RepeatWrapping;
grassHeight.wrapS = THREE.RepeatWrapping;

grassAmbient.wrapT = THREE.RepeatWrapping;
grassBasecolor.wrapT = THREE.RepeatWrapping;
// grassRoughness.wrapT = THREE.RepeatWrapping;
grassNormal.wrapT = THREE.RepeatWrapping;
grassHeight.wrapT = THREE.RepeatWrapping;

// all geometry
const planeGeomerty = new THREE.PlaneGeometry(20, 20, 50, 50);
const boxGeometry = new THREE.BoxGeometry(4, 3, 4, 50, 50);
const roofGeometry = new THREE.ConeGeometry(4, 1, 4)
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);

const uv2Plane = new THREE.BufferAttribute(planeGeomerty.attributes.uv.array, 2);
const uv2Box = new THREE.BufferAttribute(boxGeometry.attributes.uv.array, 2);
planeGeomerty.setAttribute('uv2', uv2Plane);
boxGeometry.setAttribute('uv2', uv2Box);

// all materials
const material = new THREE.MeshStandardMaterial();
const houseMaterial = new THREE.MeshStandardMaterial()
const roofMaterial = new THREE.MeshStandardMaterial({color: "#65816a"});
const doorMaterial = new THREE.MeshStandardMaterial();
const bushMaterial = new THREE.MeshStandardMaterial({color: "#89c854"});
const graveMaterail = new THREE.MeshStandardMaterial({color: "#b2b6b1"});

// texture map
doorMaterial.map = doorBasecolor;
doorMaterial.roughness = doorRoughness;
doorMaterial.metalnessMap = doorMetalic;
doorMaterial.normalMap = doorNormal;
doorMaterial.displacementMap = doorHeight;
doorMaterial.displacementScale = 0.2;
doorMaterial.aoMap = doorAmbient;
doorMaterial.alphaMap = doorAlpha;
doorMaterial.transparent = true;

houseMaterial.map = brickBasecolor;
houseMaterial.roughnessMap = brickRoughness;
houseMaterial.normalMap = brickNormal;
houseMaterial.aoMap = brickAmbient;

material.map = grassBasecolor;
material.roughness = grassRoughness;
material.normalMap = grassNormal;
material.aoMap = grassAmbient;
material.displacementMap = grassHeight;
material.displacementScale = 0.1;


// all meshes
const planeMesh = new THREE.Mesh(planeGeomerty, material);
const houseMesh = new THREE.Mesh(boxGeometry, houseMaterial);
const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
const doorMesh = new THREE.Mesh(planeGeomerty, doorMaterial);
const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
const bushMesh2 = new THREE.Mesh(bushGeometry, bushMaterial);
const bushMesh3 = new THREE.Mesh(bushGeometry, bushMaterial);
const bushMesh4 = new THREE.Mesh(bushGeometry, bushMaterial);

planeMesh.rotation.x = - Math.PI * 0.5;
scene.add(planeMesh);

houseMesh.position.y = 1.25;

roofMesh.position.y = 2.5 + 0.5;
// height of box + half of height of roofgeomery
roofMesh.rotation.y = Math.PI * 0.25;

doorMesh.position.z = 2 + 0.01;
doorMesh.position.y = 1;
doorMesh.scale.set( 0.1, 0.1);

bushMesh.scale.set(0.5, 0.5, 0.5);
bushMesh.position.set(1, 0.2, 2.2);

bushMesh2.scale.set(0.25, 0.25, 0.25);
bushMesh2.position.set(1.6, 0.1, 2.1);

bushMesh3.scale.set(0.4, 0.4, 0.4);
bushMesh3.position.set(-1, 0.2, 2.2);

bushMesh4.scale.set(0.25, 0.25, 0.25);
bushMesh4.position.set(-1.6, 0.1, 2.1);

const house = new THREE.Group();
house.add(houseMesh);
house.add(roofMesh);
house.add(doorMesh);
house.add(bushMesh, bushMesh2, bushMesh3, bushMesh4);

scene.add(house);

// graveward

const graves = new THREE.Group();

scene.add(graves);

for(let i = 0; i< 50; i++){
  const angle = Math.random() * Math.PI * 2;
  const radiusDistance = 3 + Math.random() * 6;
  // 3 since the house is 3. so it give me 3 to 9 random value.
  const x = Math.sin(angle) * radiusDistance;
  const z = Math.cos(angle) * radiusDistance;

  const graveMesh = new THREE.Mesh(graveGeometry, graveMaterail);
  graveMesh.position.set(x, 0.35, z);
  // 0.4 is the half height of the grave that we define
  graveMesh.rotation.y = (Math.random() - 0.5) * 0.4;
  // this Math.random full value give us value from -0.5 to 0.5
  graveMesh.rotation.z = (Math.random() - 0.5) * 0.4;
  graveMesh.castShadow = true;
  graves.add(graveMesh);
}

const light = new THREE.AmbientLight('#b9d5ff', 0.1);
scene.add(light);

const pointLight = new THREE.PointLight('#b9d5ff', 2);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// add light in the house front of the door
const doorLight = new THREE.PointLight('#CC5500', 10);
doorLight.position.set(0, 2, 2.5);

house.add(doorLight);

// add ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 1, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 1, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 1, 3);
scene.add(ghost3);


const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 50);

camera.position.z = 15;
camera.position.y = 4;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
doorLight.castShadow = true;
bushMesh.castShadow = true;
bushMesh2.castShadow = true;
bushMesh3.castShadow = true;
bushMesh4.castShadow = true;

planeMesh.receiveShadow = true;
// object can cast shadow but we have to show them on plane

// optimize shadows
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#262837");

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const clock = new THREE.Clock();

const rendererLoop = () => {
  // ghoust animation
  const elapsedTime = clock.getElapsedTime();
  
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 2);
  
  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2);
  
  const ghost3Angle = -elapsedTime * 0.4;
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 2.5));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 2.5));
  ghost3.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rendererLoop);
}

rendererLoop();