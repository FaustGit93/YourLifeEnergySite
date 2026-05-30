// scroll3D.js

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10; // più lontana per inquadrare meglio

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.threejs-canvas'),
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1.5);
scene.add(light);

const loader = new THREE.GLTFLoader();
let model;

loader.load(
  'https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb',
  function (gltf) {
    model = gltf.scene;
    model.scale.set(20, 20, 20); // Ingrandisce il modello
    model.position.set(0, 0, 0); // Centra il modello
    scene.add(model);
    console.log('Modello caricato:', model);
    animate();
  },
  undefined,
  function (error) {
    console.error('Errore nel caricamento del modello:', error);
  }
);
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y = scrollY * 0.002;
    model.rotation.x = scrollY * 0.001;
  }
  renderer.render(scene, camera);
  console.log('rendering'); // DEBUG
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});