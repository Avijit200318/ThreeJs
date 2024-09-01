import * as THREE from "three";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh = new THREE.Mesh(
  cubeGeometry, cubeMaterial
)

scene.add(cubeMesh);
console.log(scene);