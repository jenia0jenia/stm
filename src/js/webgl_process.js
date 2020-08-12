'use strict';

let utils = require('./utils.js');

class WebGL {
  constructor() {}

  init() {
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

    console.log('startCube');

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

  }

}

module.exports = { WebGL };
