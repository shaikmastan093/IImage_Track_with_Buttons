export const loadGLTF = (url) => {
    return new Promise((resolve, reject) => {
      const loader = new THREE.GLTFLoader();
      loader.load(
        url,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error)
      );
    });
  };
  
  export const loadAudio = (url) => {
    return new Promise((resolve, reject) => {
      const listener = new THREE.AudioLoader();
      listener.load(
        url,
        (buffer) => resolve(buffer),
        undefined,
        (error) => reject(error)
      );
    });
  };
  