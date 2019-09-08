'use strict';

/* index.js */

import { YMap } from './map.js';
import { WebGL } from './webgl.js';
import { Earth } from '../../src/earth/earth.js';

// console.log(utils)


(function Main() {
     
  const indexjs = () => {
    console.log('index.js working...');
    // console.log(Earth);

		// if( window.innerWidth > 600 ) {

    	let webgl = new WebGL;
      webgl.init();
    	webgl.startCube();
      // let earth = new Earth;
      // earth.init();
		// }

    site();

  };

  document.addEventListener("DOMContentLoaded", indexjs);

  let map = new YMap();
  // map.init([55.156552, 61.370844])

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
  if (window) {

    let mainMenu = document.getElementById('mainMenu');
    let socialMenu = document.getElementById('socialMenu');

    hideOnScrollDown(mainMenu, 'header_hide');
    hideOnScrollDown(socialMenu, 'footer_hide');

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

  } else {
    throw Error('\'window\' not found');
  }
}
