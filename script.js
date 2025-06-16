import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';



let scene, camera, renderer, portal;

init();
animate();

function init() {
  // Scene setup
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('museum-canvas'), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Portal (Torus)
  const geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
  portal = new THREE.Mesh(geometry, material);
  scene.add(portal);

  // Lights (optional)
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  // Resize listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  portal.rotation.x += 0.01;
  portal.rotation.y += 0.01;
  renderer.render(scene, camera);
}

window.goToEra = function (era) {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel = null;
  }

  if (era === 'egypt') {
    loader.load('assets/pyramid.glb', gltf => {
      currentModel = gltf.scene;
      currentModel.scale.set(1.5, 1.5, 1.5);
      scene.add(currentModel);
    });
    audio.src = 'images/senorita_iphone.mp3';
    audio.play();

  } else if (era === 'future') {
    loader.load('assets/city.glb', gltf => {
      currentModel = gltf.scene;
      currentModel.scale.set(1.5, 1.5, 1.5);
      scene.add(currentModel);
    });
    audio.src = 'images/senorita_iphone.mp3';
    audio.play();
  }

  const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.4;

function toggleMusic() {
  const music = document.getElementById('bg-music');
  music.unmuted = !music.muted;
}
}

