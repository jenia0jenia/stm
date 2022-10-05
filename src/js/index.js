"use strict";

/* index.js */
let utils = require("./utils.js");

import { WebGL } from "./webgl_process.js";

(function Main() {
    const indexjs = () => {
        console.log("index.js working...");

        if (window && window.innerWidth > 600) {
            let MyWebGL = new WebGL();

            const relTreeJS = document.querySelector(
                "[rel=preload][as=script]#threejs"
            );
            const relTGA = document.querySelector(
                "[rel=preload][as=script]#tga"
            );
            const relWebGL = document.querySelector(
                "[rel=preload][as=script]#webgl"
            );

            utils
                .loadScript(relTreeJS && relTreeJS.href)
                .then(() => {
                    return utils.loadScript(relTGA.href);
                })
                .then(() => {
                    return utils.loadScript(relWebGL.href);
                })
                .then(() => {
                    MyWebGL.startCube();
                });
        }

        site();
    };

    document.addEventListener("DOMContentLoaded", indexjs);

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                document
                    .querySelector(this.getAttribute("href"))
                    .scrollIntoView({
                        behavior: "smooth",
                    });
            });
        });
    });
})();

function site() {
    let mainMenu = document.getElementById("mainMenu");
    // let socialMenu = document.getElementById('socialMenu');

    hideOnScrollDown(mainMenu, "header_hide");
    // hideOnScrollDown(socialMenu, 'footer_hide');

    function hideOnScrollDown(target, hideClass) {
        // Hide Header on on scroll down
        let didScroll;
        let setScrollFunction = false;
        let lastScrollTop = 0;
        let delta = 5;
        let targetHeight = target.clientHeight;

        $(window).on("resize", function () {
            if ($(window).innerWidth() >= 768 && !setScrollFunction) {
                $(window).on("scroll", hasScrolled);
                setScrollFunction = true;
            } else if ($(window).innerWidth() < 768) {
                $(window).off("scroll", hasScrolled);
                setScrollFunction = false;
            }
        });

        $(window).trigger("resize");

        function hasScrolled() {
            let st = $(window).scrollTop();

            if (Math.abs(lastScrollTop - st) <= delta) return;

            if (st > lastScrollTop && st > targetHeight) {
                // Scroll Down
                target.classList.add(hideClass);
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
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
