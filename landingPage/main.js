import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js'
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js'
import {RGBShiftShader} from 'three/addons/shaders/RGBShiftShader.js'

const scene = new THREE.Scene();

// geometry

// material

// meshes


// camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.z =4;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(window.innerWidth, window.innerHeight);

// update rendere to show the hdri colors
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.outputColorSpace = 'srgb';

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// preprocessing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0015;
composer.addPass(rgbShiftPass);


new RGBELoader().load('/pond_bridge_night_1k.hdr', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  // scene.background = envMap;
  scene.environment = envMap;
  texture.dispose();
  pmremGenerator.dispose();

  const loader = new GLTFLoader();

  loader.load('./DamagedHelmet.gltf', (gltf) => {
    scene.add(gltf.scene);
  }, undefined, (error) => {
    console.log("An error occured while loading the GLTF model: ", error);
  });
})

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
})

const rendererLoop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rendererLoop);
  composer.render();
}

rendererLoop();