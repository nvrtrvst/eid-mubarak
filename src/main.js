import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const box = document.querySelector('.box');
box.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// Camera positioning
camera.position.z = 5;
camera.position.x = 4;
camera.position.y = -0.5;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 12);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// 3D Model loading
const loader = new GLTFLoader();
let ketupat;

loader.load('ketupat/scene.optimized.gltf', function (gltf) {
    ketupat = gltf.scene;
    ketupat.scale.set(30, 30, 30);
    ketupat.rotation.z = 0.3;
    scene.add(ketupat);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (ketupat) {
        ketupat.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

// Start animation
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});