// /* global AFRAME, THREE */

// AFRAME.registerComponent("gesture-handler", {
//     schema: {
//       enabled: { default: true },
//       rotationFactor: { default: 5 },
//       minScale: { default: 0.3 },
//       maxScale: { default: 8 },
//     },
  
//     init: function () {
//       this.handleScale = this.handleScale.bind(this);
//       this.handleRotation = this.handleRotation.bind(this);
  
//       this.isVisible = false;
//       this.initialScale = this.el.object3D.scale.clone();
//       this.scaleFactor = 1;
  
//       this.el.sceneEl.addEventListener("targetFound", (e) => {
//         this.isVisible = true;
//       });
  
//       this.el.sceneEl.addEventListener("targetLost", (e) => {
//         this.isVisible = false;
//       });
//     },
  
//     update: function () {
//       if (this.data.enabled) {
//         this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
//         this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
//       } else {
//         this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
//         this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
//       }
//     },
  
//     remove: function () {
//       this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
//       this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
//     },
  
//     handleRotation: function (event) {
//       if (this.isVisible) {
//         this.el.object3D.rotation.z +=
//           event.detail.positionChange.x * this.data.rotationFactor;
//         this.el.object3D.rotation.x +=
//           event.detail.positionChange.y * this.data.rotationFactor;
//       }
//     },
  
//     handleScale: function (event) {
//       if (this.isVisible) {
//         this.scaleFactor *=
//           1 + event.detail.spreadChange / event.detail.startSpread;
  
//         this.scaleFactor = Math.min(
//           Math.max(this.scaleFactor, this.data.minScale),
//           this.data.maxScale
//         );
  
//         this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
//         this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
//         this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
//       }
//     },
//   });
  
AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 }
  },

  init: function () {
    this.handleRotation = this.handleRotation.bind(this);
    this.handleScale = this.handleScale.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    // Set object visibility based on marker tracking
    this.el.sceneEl.addEventListener("targetFound", () => (this.isVisible = true));
    this.el.sceneEl.addEventListener("targetLost", () => (this.isVisible = false));
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    if (!this.isVisible) return;

    const rotationSpeed = this.data.rotationFactor * 0.09; // Adjust for smoother rotation

    this.el.object3D.rotation.y -= event.detail.positionChange.x * rotationSpeed;
    this.el.object3D.rotation.x += event.detail.positionChange.y * rotationSpeed;
  },

  handleScale: function (event) {
    if (!this.isVisible) return;

    const scaleChange = 1 + event.detail.spreadChange / event.detail.startSpread;

    this.scaleFactor = Math.min(
      Math.max(this.scaleFactor * scaleChange, this.data.minScale),
      this.data.maxScale
    );

    this.el.object3D.scale.set(
      this.scaleFactor * this.initialScale.x,
      this.scaleFactor * this.initialScale.y,
      this.scaleFactor * this.initialScale.z
    );
  }
});
