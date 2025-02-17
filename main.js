import { loadGLTF, loadAudio } from './loader.js';

const startAR = async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: './card.mind',
    maxTrack: 1,
  });
  
  const { renderer, scene, camera } = mindarThree;

  // Add ambient lighting
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  // Load sitar model
  const sitarModel = await loadGLTF('./sitar/scene.gltf');
  sitarModel.scene.scale.set(0.1, 0.1, 0.1);

  // Load sitar audio
  const sitarAudioClip = await loadAudio('./sound/sitar.mp3');
  const audioListener = new THREE.AudioListener();
  camera.add(audioListener);  // Attach the listener to the camera

  const sitarAudio = new THREE.PositionalAudio(audioListener);
  sitarAudio.setBuffer(sitarAudioClip);
  sitarAudio.setRefDistance(1);  // Adjust as needed for proximity effect
  sitarAudio.setLoop(true);
  sitarAudio.setVolume(0.5);

  // Add the model and audio to the MindAR anchor
  const sitarAnchor = mindarThree.addAnchor(0);
  sitarAnchor.group.add(sitarModel.scene);
  sitarAnchor.group.add(sitarAudio);

  // Set up play/pause based on target detection
  sitarAnchor.onTargetFound = () => sitarAudio.play();
  sitarAnchor.onTargetLost = () => sitarAudio.pause();

  // Start the AR experience
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

startAR();
