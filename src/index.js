import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Model from "./model";

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;
camera.position.y = 1;

/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
// scene.add( cube );

/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = false;

/*------------------------------
Helpers
------------------------------*/
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/*------------------------------
Model
------------------------------*/
const model1 = new Model({
  name: "plier",
  file: "./models/360-text.glb",
  color1: "#67aadf",
  color2: "red",
  background: "#000000",
  scene: scene,
  placeOnLoad: true,
});
const model2 = new Model({
  name: "plier",
  file: "./models/dressing-plier.glb",
  color1: "blue",
  color2: "pink",
  background: "#d4def1",
  scene: scene,
});

/*------------------------------
Controllers
------------------------------*/
const buttons = document.querySelectorAll(".button");
buttons[0].addEventListener("click", () => {
  model1.add();
  model2.remove();
});
buttons[1].addEventListener("click", () => {
  model1.remove();
  model2.add();
});

/*------------------------------
Clock
------------------------------*/
const clock = new THREE.Clock();

/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (model1.isActive) {
    model1.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }
  if (model2.isActive) {
    model2.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }
};
animate();

/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

/*------------------------------
Mouse Move
------------------------------*/
function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, 0.2, -0.2, x),
    x: gsap.utils.mapRange(0, window.innerWidth, 0.2, -0.2, y),
  });
}

window.addEventListener("mousemove", onMouseMove);
