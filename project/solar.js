import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// we need only one geometry and we are going to scale it different size.

// add texture
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/planetTexture/cubemap/');

const sunTexture = textureLoader.load('/planetTexture/2k_sun.jpg');
const earthTexture = textureLoader.load('/planetTexture/2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('/planetTexture/2k_mars.jpg');
const mercuryTexture = textureLoader.load('/planetTexture/2k_mercury.jpg');
const moonTexture = textureLoader.load('/planetTexture/2k_moon.jpg');
const venusTexture = textureLoader.load('/planetTexture/2k_venus_surface.jpg');

// to set the background texture
// const backgroundTexture = textureLoader.load('/planetTexture/2k_stars_milky_way.jpg');
// scene.background = backgroundTexture;

const backgroundCubeMap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
]);

scene.background = backgroundCubeMap;

// materials for planet
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
// since we don't need any shadow for sun so we are using meshBasic material.

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.set(5, 5, 5);
scene.add(sun);

const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });

const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: []
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
        material: moonMaterial,
      }
    ]
  },
  {
    name: 'Mars',
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
        material: moonMaterial,
      },
      {
        name: 'Dmons',
        radius: 0.2,
        distance: 3,
        speed: 0.0015,
        material: moonMaterial,
      }
    ]
  },
]

const planetMesh = planets.map((planet) => {
  // planet
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;

  scene.add(planetMesh);

  // moon
  planet.moons.forEach((moon) => {
    const moonMesh = new THREE.Mesh(sphereGeometry, moon.material);
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;

    planetMesh.add(moonMesh);
  })

  return planetMesh;
})

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 400);
scene.add(pointLight)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 50;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log(planetMesh)

// render loop
const renderloop = () => {
  planetMesh.forEach((ele, index) => {
    // earth's own axis roation
    ele.rotation.y += planets[index].speed;
    // sun orbit wise rotation
    ele.position.x = Math.sin(ele.rotation.y) * planets[index].distance;
    ele.position.z = Math.cos(ele.rotation.y) * planets[index].distance;

    //moon animation
    ele.children.forEach((moon, moonIndex) => {
      // moon'w own axis roation
      moon.rotation.y += planets[index].moons[moonIndex].speed;
      moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
      moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();