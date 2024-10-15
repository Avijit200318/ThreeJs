import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
// texture
const textureLoader = new THREE.TextureLoader();
// textures
const threeColorShade = textureLoader.load("/scroll-texture/Untitled design.png")
threeColorShade.magFilter = THREE.NearestFilter;

// geometry
const tourusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 60);
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const torushknotGeometry = new THREE.TorusKnotGeometry(0.8, 0.35,100, 16);

// materials
const material = new THREE.MeshToonMaterial({color: "#ffeded"});

material.gradientMap = threeColorShade;
// we use gradientMap

const objectDistance = 4;

// meshes
const mesh1 = new THREE.Mesh(tourusGeometry, material);
const mesh2 = new THREE.Mesh(coneGeometry, material);
const mesh3 = new THREE.Mesh(torushknotGeometry, material);

mesh1.position.y = - objectDistance * 0;
mesh2.position.y = - objectDistance * 1;
mesh3.position.y = - objectDistance * 2;

mesh1.position.x = 1;
mesh2.position.x = -1;
mesh3.position.x = 1;

const sectionMesh = [mesh1, mesh2, mesh3];

scene.add(mesh1, mesh2, mesh3);

// light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.z = 5;
cameraGroup.add(camera);

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

// scroll animation
let scrollY = window.scrollY;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    console.log(scrollY)
})

// cursor position
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = event.clientY / window.innerHeight - 0.5;
    // by deviding them we get value from 0 to 1 them I add an minus value of 0.5. it help it to get value from -0.5 to 0.5.
})

const clock = new THREE.Clock();

const rendererLoop = () => {

    const elapsedTime = clock.getElapsedTime();

    // animate camera
    camera.position.y = - scrollY / window.innerHeight * objectDistance;

    const parallaxX = cursor.x;
    const parallaxY = - cursor.y;
    cameraGroup.position.x = parallaxX;
    cameraGroup.position.y = parallaxY;

    for(const mesh of sectionMesh){
        mesh.rotation.x = elapsedTime * 0.1;
        mesh.rotation.y = elapsedTime * 0.12;
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(rendererLoop);
}

rendererLoop();