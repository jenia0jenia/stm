'use strict';

let utils = require('./utils.js');
// import createWorker from '';

// let createWorker = require('offscreen-canvas/create-worker');

class WebGL {
  constructor() {}

  init() {

    // const threejsUrl = document.querySelector('[type=preload][as=script]#treejs').href;
    const tgaUrl = document.querySelector('[type=preload][as=script]#tga').href;
    const webglUrl = document.querySelector('[type=preload][as=script]#webgl').href;

    // utils.addScript(threejsUrl);
    utils.addScript(tgaUrl);
    utils.addScript(webglUrl);

    // console.log('webgl init');

  }
  
  startCube() {
    /*
    This is how compressed textures are supposed to be used:
    best for desktop:
    BC1(DXT1) - opaque textures
    BC3(DXT5) - transparent textures with full alpha range
    best for iOS:
    PVR2, PVR4 - opaque textures or alpha
    best for Android:
    ETC1 - opaque textures
    ASTC_4x4, ASTC8x8 - transparent textures with full alpha range
    */

    var canvasElement = document.getElementById('canvasCube');
    var canvasParent = canvasElement.parentElement;

    // console.log(canvasElement.clientWidth);

    if ( WEBGL.isWebGLAvailable() === false ) {
      document.body.appendChild( WEBGL.getWebGLErrorMessage() );
    }

    var camera, scene, renderer;
    var meshes = [];
    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 2000 );
      camera.position.z = 800;

      // var controls = new THREE.OrbitControls( camera );

      // renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        // alpha: true
      });
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      canvasParent.appendChild( renderer.domElement );
      var formats = {
        s3tc: renderer.extensions.get( 'WEBGL_compressed_texture_s3tc' ),
        astc: renderer.extensions.get( 'WEBGL_compressed_texture_astc' ),
        etc1: renderer.extensions.get( 'WEBGL_compressed_texture_etc1' ),
        pvrtc: renderer.extensions.get( 'WEBGL_compressed_texture_pvrtc' )
      };
      scene = new THREE.Scene();
      var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
      var material1;
      // TODO: add cubemap support
      // var loader = new THREE.KTXLoader();
      var loader = new THREE.TGALoader();
      if ( formats.pvrtc ) {
        material1 = new THREE.MeshBasicMaterial( {
          map: loader.load("/static/textures/stm_logo.tga")
        } );
        meshes.push( new THREE.Mesh( geometry, material1 ) );
      }
      if ( formats.s3tc ) {
        material1 = new THREE.MeshBasicMaterial( {
          map: loader.load("/static/textures/stm_logo.tga")
        } );
        meshes.push( new THREE.Mesh( geometry, material1 ) );
      }
      if ( formats.etc1 ) {
        material1 = new THREE.MeshBasicMaterial( {
          map: loader.load("/static/textures/stm_logo.tga")
        } );
        meshes.push( new THREE.Mesh( geometry, material1 ) );
      }
      if ( formats.astc ) {
        material1 = new THREE.MeshBasicMaterial( {
          map: loader.load("/static/textures/stm_logo.tga")
        } );
        meshes.push( new THREE.Mesh( geometry, material1 ) );
      }
      var x = - meshes.length / 2;
      for ( var i = 0; i < meshes.length; ++ i, x += 300 ) {
        var mesh = meshes[ i ];
        mesh.position.x = x;
        mesh.position.y = 0;
        scene.add( mesh );
      }
      window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
      requestAnimationFrame( animate );
      var time = Date.now() * 0.0003;
      for ( var i = 0; i < meshes.length; i ++ ) {
        var mesh = meshes[ i ];
        mesh.rotation.x = time;
        mesh.rotation.y = time;
      }
      renderer.render( scene, camera );
    }


    // if ( WEBGL.isWebGLAvailable() === false ) {
    //   document.body.appendChild( WEBGL.getWebGLErrorMessage() );
    // }

    // var camera, scene, renderer;
    // var mesh1;
    // // var camera, scene, renderer, stats;
    // init();
    // animate();

    // function init() {
    //   var container = document.createElement( 'div' );
    //   document.body.appendChild( container );
    //   camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
    //   camera.position.set( 0, 50, 250 );
    //   scene = new THREE.Scene();
    //   //
    //   var loader = new THREE.TGALoader();
    //   var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
    //   // add box 1 - grey8 texture
    //   var texture1 = loader.load("{% static 'textures/stm_logo.tga' %}");
    //   var material1 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture1 } );
    //   mesh1 = new THREE.Mesh( geometry, material1 );
    //   mesh1.position.x = - 50;
    //   scene.add( mesh1 );
    //   // // add box 2 - tga texture
    //   // var texture2 = loader.load("{% static 'textures/stm_logo.tga' %}");
    //   // var material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture2 } );
    //   // var mesh2 = new THREE.Mesh( geometry, material2 );
    //   // mesh2.position.x = 50;
    //   // scene.add( mesh2 );
    //   //
    //   var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
    //   scene.add( ambientLight );
    //   var light = new THREE.DirectionalLight( 0xffffff, 1 );
    //   light.position.set( 1, 1, 1 );
    //   scene.add( light );
    //   //
    //   // var controls = new THREE.OrbitControls( camera );
    //   //
    //   renderer = new THREE.WebGLRenderer( { antialias: true } );
    //   renderer.setPixelRatio( window.devicePixelRatio );
    //   renderer.setSize( window.innerWidth, window.innerHeight );
    //   container.appendChild( renderer.domElement );
    //   //
    //   // stats = new Stats();
    //   // container.appendChild( stats.dom );
    //   //
    //   window.addEventListener( 'resize', onWindowResize, false );
    // }

    // function onWindowResize() {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize( window.innerWidth, window.innerHeight );
    // }

    // function animate() {
    //   requestAnimationFrame( animate );
    //   var time = Date.now() * 0.0005;
    //   // for ( var i = 0; i < meshes.length; i ++ ) {
    //     // var mesh = meshes[ i ];
    //     mesh1.rotation.x = time;
    //     mesh1.rotation.y = time;
    //   // }
    //   render();



    //   // stats.update();
    // }

    // function render() {
    //   renderer.render( scene, camera );
    // }
  }

  // startEarth() {
  //   const workerUrl = document.querySelector('[type=preload][as=script]').href;
  //   const canvas = document.querySelector('#canvasEarth');

  //   const worker = createWorker(canvas, workerUrl);

  //   window.addEventListener('resize', () => {
  //     worker.post({
  //       type: 'resize',
  //       width: canvas.clientWidth,
  //       height: canvas.clientHeight
  //     });
  //   });
  // }
}

module.exports = { WebGL };
