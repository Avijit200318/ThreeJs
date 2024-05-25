// console.log(THREE)
const scene = new THREE.Scene();

// add geometry. there are many geometry in documentation
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({color: "red"})
// add metarial to the object

const box = new THREE.Mesh(geometry, material);
// using geometry and metarial create an object.
scene.add(box);
// add the object to the scene.

const size = {
    width: 700,
    height: 500,
}
// scene size

const camera = new THREE.PerspectiveCamera(75, size.width/ size.height);
//add camera. 75 ANGLE , aspect ratio

camera.position.z = 4;
// add camera position.
// camera.position.x = 2;
// camera.position.y = 0.5;

scene.add(camera);
// add scene to the camera.

const target = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas: target});
// target where we need to render the whole scene.

renderer.setSize(size.width, size.height);
// add the scene prefect size.
renderer.render(scene, camera);
// add derector and give him camera and scene.