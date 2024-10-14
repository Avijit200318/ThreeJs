import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
// textures

// geometry
const tourusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 60);
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const torushknotGeometry = new THREE.TorusKnotGeometry(0.8, 0.35,100, 16);

// materials
const material = new THREE.MeshToonMaterial({color: "#ffeded"});
// meshes
const mesh1 = new THREE.Mesh(tourusGeometry, material);
const mesh2 = new THREE.Mesh(coneGeometry, material);
const mesh3 = new THREE.Mesh(torushknotGeometry, material);

scene.add(mesh1, mesh2, mesh3);

// light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

const rendererLoop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(rendererLoop);
}

rendererLoop();