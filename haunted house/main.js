import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const fog = new THREE.Fog('#262837', 1, 45);
scene.fog = fog;

// all geometry
const planeGeomerty = new THREE.PlaneGeometry(20, 20);
const boxGeometry = new THREE.BoxGeometry(4, 3, 4);
const roofGeometry = new THREE.ConeGeometry(4, 2, 4)
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);

// all materials
const material = new THREE.MeshStandardMaterial({color: "#4DFF4D"});
const houseMaterial = new THREE.MeshStandardMaterial({color: "#ac8e82"})
const roofMaterial = new THREE.MeshStandardMaterial({color: "#b35f45"});
const doorMaterial = new THREE.MeshStandardMaterial({color: "#001A00"});
const bushMaterial = new THREE.MeshStandardMaterial({color: "#89c854"});
const graveMaterail = new THREE.MeshStandardMaterial({color: "#b2b6b1"});

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

roofMesh.position.y = 2.5 + 1;
// height of box + half of height of roofgeomery
roofMesh.rotation.y = Math.PI * 0.25;

doorMesh.position.z = 2 + 0.01;
doorMesh.position.y = 1;
doorMesh.scale.set( 0.08, 0.1);

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
  graves.add(graveMesh);
}

const light = new THREE.AmbientLight('#b9d5ff', 0.1);
scene.add(light);

const pointLight = new THREE.PointLight('#b9d5ff', 20);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// add light in the house front of the door
const doorLight = new THREE.PointLight('#CC5500', 10);
doorLight.position.set(0, 2, 2.5);

house.add(doorLight);


const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 50);

camera.position.z = 25;
camera.position.y = 5;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#262837");

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