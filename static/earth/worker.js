let { MeshPhongMaterial } = require('three/src/materials/MeshPhongMaterial');
let { MeshBasicMaterial } = require('three/src/materials/MeshBasicMaterial');
let { PerspectiveCamera } = require('three/src/cameras/PerspectiveCamera');
let { ImageBitmapLoader } = require('three/src/loaders/ImageBitmapLoader');
let { DirectionalLight } = require('three/src/lights/DirectionalLight');
let { SphereGeometry } = require('three/src/geometries/SphereGeometry');
let { SpriteMaterial } = require('three/src/materials/SpriteMaterial');
let { WebGLRenderer } = require('three/src/renderers/WebGLRenderer');
let { CanvasTexture } = require('three/src/textures/CanvasTexture');
let { AmbientLight } = require('three/src/lights/AmbientLight');
let { ImageLoader } = require('three/src/loaders/ImageLoader');
let { Spherical } = require('three/src/math/Spherical');
let { Vector3 } = require('three/src/math/Vector3');
let { Sprite } = require('three/src/objects/Sprite');
let { Scene } = require('three/src/scenes/Scene');
let { Color } = require('three/src/math/Color');
let { Mesh } = require('three/src/objects/Mesh');

let visited = [
    [
      -34.6,
      -58.4
    ],
    [
      37.8,
      -122.4
    ]
  ];

const IS_WORKER = typeof window !== 'object';
const RADIUS = 0.765 * 0.88;
const PI2 = 2 * Math.PI;

// Base

let renderer;
let scene = new Scene();
let camera = new PerspectiveCamera(45, 1, 0.01, 1000);

let loader;

if (IS_WORKER) {
  loader = new ImageBitmapLoader();
} else {
  loader = new ImageLoader();
}

let canvasHeight, finishLoading, distanceToEdge;
let delta = new Spherical();
console.log(delta);
console.log(camera.position);

// Helpers

function setPosition (position, radius, latitude, longitude) {
  let phi = (90 - latitude) * (Math.PI / 180);
  let theta = (longitude + 180) * (Math.PI / 180);

  position.x = -radius * Math.sin(phi) * Math.cos(theta);
  position.z = radius * Math.sin(phi) * Math.sin(theta);
  position.y = radius * Math.cos(phi);
}

let loaded = 0;

function load () {
  loaded += 1;
  if (loaded === 3) {
    renderer.render(scene, camera);
    finishLoading(1);
  }
}

// Scene

scene.background = new Color(0xffffff);

let sphere = new Mesh(
  new SphereGeometry(RADIUS, 64, 64),
  new MeshPhongMaterial()
);
scene.add(sphere);

let here = new Sprite(
  new SpriteMaterial()
);
here.material.depthTest = false;
here.scale.set(0.1, 0.1, 1);
here.center.set(0.5, 0);
scene.add(here);

visited.forEach(i => {
  let dot = new Mesh(
    new SphereGeometry(0.004, 8),
    new MeshBasicMaterial({
      color: new Color(0xffffff)
    })
  );
  setPosition(dot.position, RADIUS, i[0], i[1]);
  scene.add(dot);
});

// Light

scene.add(new AmbientLight(0x909090));

let light = new DirectionalLight(0x4f4f4f, 1);
light.position.set(1, 0, 1);
scene.add(light);

function moveSun () {
  let now = new Date();
  let solstice = new Date(now.getFullYear() + '-06-21 00:00:00');
  let days = (now - solstice) / (1000 * 60 * 60 * 24);
  let sunLat = 23.44 * Math.cos(2 * Math.PI * days / 365.26);
  let sunLong = 180 - 15 * (now.getUTCHours() + now.getMinutes() / 60);
  setPosition(light.position, 2, sunLat, sunLong);
}

moveSun();
setInterval(moveSun, 30 * 60 * 1000);

// Messages

let commands = {
  init (canvas, width, height, pixelRatio, mapUrl, hereUrl, isWebP) {
    if (!canvas.style) canvas.style = { width, height };

    renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    canvasHeight = height;

    if (!isWebP) {
      mapUrl = mapUrl.replace('webp', 'png');
      hereUrl = hereUrl.replace('webp', 'png');
    }

    loader.load(mapUrl, mapImage => {
      sphere.material.map = new CanvasTexture(mapImage);
      sphere.material.map.flipY = false;
      // console.log(sphere);
      // console.log(scene);
      load();
    });

    loader.load(hereUrl, hereImage => {
      here.material.map = new CanvasTexture(hereImage);
      here.material.map.flipY = false;
      load();
    });
    // console.log();
  },

  resize (width, height) {
    renderer.setSize(width, height);
    canvasHeight = height;
    renderer.render(scene, camera);
  },

  move (start, end) {
    delta.setFromVector3(camera.position);

    console.log('delta BEFORE');
    console.log(delta);
    console.log(camera.position);

    delta.theta -= PI2 * (end[0] - start[0]) / canvasHeight;
    delta.phi -= PI2 * (end[1] - start[1]) / canvasHeight;

    delta.makeSafe();
    camera.position.setFromSpherical(delta);
    camera.lookAt(0, 0, 0);

    let distanceToHere = camera.position.distanceTo(here.position);
    here.material.depthTest = distanceToHere > distanceToEdge;

    renderer.render(scene, camera);
    console.log('delta AFTER');
    console.log(delta);
  },

  here (latitude, longitude) {
    setPosition(here.position, RADIUS, latitude, longitude);
    setPosition(camera.position, 2, latitude > 0 ? 20 : -20, longitude);
    camera.lookAt(0, 0, 0);
    distanceToEdge = camera.position.distanceTo(new Vector3(0, RADIUS, 0));
    load();
  }
};

function onMessage (e) {
  commands[e.data[0]].apply(this, e.data.slice(1));
  // console.log('onMessage');
}

if (IS_WORKER) {
  // console.log('data');
  // console.log(postMessage);
  onmessage = onMessage;
  finishLoading = postMessage;
} else {
  window.wS = data => {
    onMessage({ data });
  };
  finishLoading = window.wM;
}
