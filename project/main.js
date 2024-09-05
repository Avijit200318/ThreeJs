import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// cubeMesh.rotation.y = Math.PI * 0.25;
// normaly threejs support radian for roation
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(45);

cubeMesh.rotation.reorder('YXZ');
// the default order is xyz.

cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);

const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper);

// prespective camera

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);


camera.position.z = 5;

// distance between the mesh and the camera
console.log(cubeMesh.position.distanceTo(camera.position))

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

const renderLoop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
