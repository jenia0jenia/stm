'use strict';

/* index.js */
let utils = require('./utils.js');

import { WebGL } from './webgl_process.js';

(function Main() {
     
  const indexjs = () => {


    console.log('index.js working...');

		if( window && window.innerWidth > 600 ) {

      let MyWebGL = new WebGL;

      const treejsUrl = document.querySelector('[rel=preload][as=script]#threejs').href;
      const tgaUrl = document.querySelector('[rel=preload][as=script]#tga').href;
      const webglUrl = document.querySelector('[rel=preload][as=script]#webgl').href;

      utils.loadScript(treejsUrl)
        .then(function(script) {
          return utils.loadScript(tgaUrl);
        })
        .then(function(script) {
          return utils.loadScript(webglUrl);
        })
        .then(function(script) {
          MyWebGL.startCube();
        });
		}

    site();

  };

  document.addEventListener("DOMContentLoaded", indexjs);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

  });

})();

function site() {
  let mainMenu = document.getElementById('mainMenu');
  // let socialMenu = document.getElementById('socialMenu');

  hideOnScrollDown(mainMenu, 'header_hide');
  // hideOnScrollDown(socialMenu, 'footer_hide');

  function hideOnScrollDown(target, hideClass) {
    // Hide Header on on scroll down
    let didScroll;
    let setScrollFunction = false;
    let lastScrollTop = 0;
    let delta = 5;
    let targetHeight = target.clientHeight;


    $(window).on('resize', function() {
      if ($(window).innerWidth() >= 768 && !setScrollFunction) {
        $(window).on('scroll', hasScrolled);
        setScrollFunction = true;
      } else if($(window).innerWidth() < 768) {
        $(window).off('scroll', hasScrolled);
        setScrollFunction = false;
      }
    });

    function hasScrolled() {
        let st = $(window).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        if (st > lastScrollTop && st > targetHeight){
            // Scroll Down
            target.classList.add(hideClass);
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                target.classList.remove(hideClass);
            }
        }
        
        lastScrollTop = st;
    }

    target.onmouseover = mainMenuOver;
    // target.onmouseout = mainMenuOut;

    function mainMenuOver(e) {
      target.classList.remove(hideClass);
    }

    // function mainMenuOut(e) {
    //   e.target.classList.add(hideClass);
    // }
  }
}
