// console.log(THREE)
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({color: "red"})

const box = new THREE.Mesh(geometry, material);
scene.add(box);

const size = {
    width: 700,
    height: 500,
}

const camera = new THREE.PerspectiveCamera(75, size.width/ size.height);
// 75 ANGLE , aspect ratio

scene.add(camera);

const target = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas: target});