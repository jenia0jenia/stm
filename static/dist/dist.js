/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/css/style.scss":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--6-3!./src/css/style.scss ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js??ref--6-3!./style.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/css/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/earth/earth.js":
/*!****************************!*\
  !*** ./src/earth/earth.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function query(selector) {
  return document.querySelector(selector);
} // let initializing, location, earthLoaded, postMessage, rotateStart


var initializing, earthLoaded, postMessage, rotateStart;
var earth, canvas, workerUrl;

function move(x, y) {
  console.log('move');
  console.log(x);
  console.log(y);
  postMessage(['move', rotateStart, [x, y]]);
  rotateStart = [x, y];
}

function mouseMove(e) {
  console.log('mouseMove');
  console.log(e.clientX);
  console.log(e.clientY);
  move(e.clientX, e.clientY);
  move(e.clientX, e.clientY);
}

function mouseUp() {
  document.body.classList.remove('is-grabbing');
  document.removeEventListener('mousemove', mouseMove, false);
  document.removeEventListener('mouseup', mouseUp, false);
}

function detectAndStartEarth(offscreen) {
  var webP = new Image();
  webP.src = 'data:image/webp;base64,' + 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';

  webP.onload = webP.onerror = function () {
    startEarth(offscreen, !!webP.height);
  };
}

function startEarth(offscreen, isWebP) {
  earthLoaded = true;
  postMessage(['init', offscreen, earth.clientWidth, earth.clientHeight, window.devicePixelRatio, query('[as=image][href*=map]').href, query('[as=image][href*=here]').href, isWebP], [offscreen]);
  window.addEventListener('resize', function () {
    postMessage(['resize', earth.clientWidth, earth.clientHeight]);
  });
  if (location) setLocation(location);
  canvas.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      // left
      rotateStart = [e.clientX, e.clientY];
      e.preventDefault();
      document.addEventListener('mousemove', mouseMove, false);
      document.addEventListener('mouseup', mouseUp, false);
      document.body.classList.add('is-grabbing');
    }
  });

  if (window.innerWidth > 980) {
    canvas.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        rotateStart = [e.touches[0].pageX, e.touches[0].pageY];
      }
    }, {
      passive: true
    });
    canvas.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        move(e.touches[0].pageX, e.touches[0].pageY);
      }
    }, {
      passive: true
    });
  } else {
    canvas.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        e.preventDefault();
        rotateStart = [e.touches[0].pageX, e.touches[0].pageY];
      }
    });
    canvas.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        e.preventDefault();
        move(e.touches[0].pageX, e.touches[0].pageY);
      }
    });
  }
}

function stopLoading() {
  canvas.style.opacity = 1;
  query('.earth_loading').remove();
}

function setLocation(l) {
  if (earthLoaded) {
    postMessage(['here', l.latitude, l.longitude]);
  } else {
    location = l;
  }
}

var Earth =
/*#__PURE__*/
function () {
  function Earth() {
    _classCallCheck(this, Earth);
  }

  _createClass(Earth, [{
    key: "init",
    value: function init() {
      earth = query('.earth');
      canvas = query('.earth_canvas');
      workerUrl = query('[as=script]').href;
      if (initializing) return;
      initializing = true;
      var test = document.createElement('canvas');

      if (!test.getContext('webgl')) {
        earth.classList.add('is-disabled');
        return;
      }

      if (canvas.transferControlToOffscreen) {
        var worker = new Worker(workerUrl);
        console.log(worker);

        postMessage = function postMessage(data, transfer) {
          return worker.postMessage(data, transfer);
        };

        worker.onmessage = stopLoading;
        detectAndStartEarth(canvas.transferControlToOffscreen());
      } else {
        var script = document.createElement('script');
        script.src = workerUrl;
        script.async = true;

        script.onload = function () {
          postMessage = window.wS;
          detectAndStartEarth(canvas);
        };

        window.wM = stopLoading;
        document.head.appendChild(script);
      }
    }
  }]);

  return Earth;
}();

module.exports = {
  Earth: Earth
};

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./src/js/map.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _webgl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl.js */ "./src/js/webgl.js");
/* harmony import */ var _webgl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_webgl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_earth_earth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/earth/earth.js */ "./src/earth/earth.js");
/* harmony import */ var _src_earth_earth_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_earth_earth_js__WEBPACK_IMPORTED_MODULE_2__);

/* index.js */



 // console.log(utils)

(function Main() {
  var indexjs = function indexjs() {
    console.log('index.js working...'); // console.log(Earth);
    // if( window.innerWidth > 600 ) {

    var webgl = new _webgl_js__WEBPACK_IMPORTED_MODULE_1__["WebGL"]();
    webgl.init();
    webgl.startCube(); // let earth = new Earth;
    // earth.init();
    // }

    site();
  };

  document.addEventListener("DOMContentLoaded", indexjs);
  var map = new _map_js__WEBPACK_IMPORTED_MODULE_0__["YMap"](); // map.init([55.156552, 61.370844])
})();

function site() {
  if (window) {
    var hideOnScrollDown = function hideOnScrollDown(target, hideClass) {
      // Hide Header on on scroll down
      var didScroll;
      var lastScrollTop = 0;
      var delta = 5;
      var targetHeight = target.clientHeight;
      $(window).scroll(function (event) {
        hasScrolled();
      });

      function hasScrolled() {
        var st = $(window).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop && st > targetHeight) {
          // Scroll Down
          // $('header').removeClass(hideClass).addClass('nav-up');
          target.classList.add(hideClass);
        } else {
          // Scroll Up
          if (st + $(window).height() < $(document).height()) {
            // $('header').removeClass('nav-up').addClass(hideClass);
            target.classList.remove(hideClass);
          }
        }

        lastScrollTop = st;
      }

      target.onmouseover = mainMenuOver; // target.onmouseout = mainMenuOut;

      function mainMenuOver(e) {
        target.classList.remove(hideClass);
      } // function mainMenuOut(e) {
      //   e.target.classList.add(hideClass);
      // }

    };

    var mainMenu = document.getElementById('mainMenu');
    var socialMenu = document.getElementById('socialMenu');
    hideOnScrollDown(mainMenu, 'header_hide');
    hideOnScrollDown(socialMenu, 'footer_hide');
  } else {
    throw Error('\'window\' not found');
  }
}

/***/ }),

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YMap =
/*#__PURE__*/
function () {
  function YMap() {
    _classCallCheck(this, YMap);
  }

  _createClass(YMap, [{
    key: "init",
    value: function init() {
      var _this = this;

      var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [55.76, 37.64];
      this.center = center;

      if (ymaps) {
        ymaps.ready(function () {
          var myMap = new ymaps.Map('map', {
            center: _this.center,
            zoom: 17
          });
        });
      } else {
        console.log('no yandex map api');
      } // return 1;

    }
  }]);

  return YMap;
}();

module.exports = {
  YMap: YMap
};

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: addScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScript", function() { return addScript; });
function addScript(src) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  document.getElementsByTagName('head')[0].appendChild(s);
} // module.export = { addScript };

/***/ }),

/***/ "./src/js/webgl.js":
/*!*************************!*\
  !*** ./src/js/webgl.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js"); // import createWorker from '';
// let createWorker = require('offscreen-canvas/create-worker');


var WebGL =
/*#__PURE__*/
function () {
  function WebGL() {
    _classCallCheck(this, WebGL);
  }

  _createClass(WebGL, [{
    key: "init",
    value: function init() {
      var threejsUrl = document.querySelector('[type=preload][as=script]#treejs').href;
      var tgaUrl = document.querySelector('[type=preload][as=script]#tga').href;
      var webglUrl = document.querySelector('[type=preload][as=script]#webgl').href;
      utils.addScript(threejsUrl);
      utils.addScript(tgaUrl);
      utils.addScript(webglUrl); // console.log('webgl init');
    }
  }, {
    key: "startCube",
    value: function startCube() {
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
      var canvasParent = canvasElement.parentElement; // console.log(canvasElement.clientWidth);

      if (WEBGL.isWebGLAvailable() === false) {
        document.body.appendChild(WEBGL.getWebGLErrorMessage());
      }

      var camera, scene, renderer;
      var meshes = [];
      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 800; // var controls = new THREE.OrbitControls( camera );
        // renderer = new THREE.WebGLRenderer( { antialias: true } );

        renderer = new THREE.WebGLRenderer({
          canvas: canvasElement // alpha: true

        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasParent.appendChild(renderer.domElement);
        var formats = {
          s3tc: renderer.extensions.get('WEBGL_compressed_texture_s3tc'),
          astc: renderer.extensions.get('WEBGL_compressed_texture_astc'),
          etc1: renderer.extensions.get('WEBGL_compressed_texture_etc1'),
          pvrtc: renderer.extensions.get('WEBGL_compressed_texture_pvrtc')
        };
        scene = new THREE.Scene();
        var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
        var material1; // TODO: add cubemap support
        // var loader = new THREE.KTXLoader();

        var loader = new THREE.TGALoader();

        if (formats.pvrtc) {
          material1 = new THREE.MeshBasicMaterial({
            map: loader.load("/static/textures/stm_logo.tga")
          });
          meshes.push(new THREE.Mesh(geometry, material1));
        }

        if (formats.s3tc) {
          material1 = new THREE.MeshBasicMaterial({
            map: loader.load("/static/textures/stm_logo.tga")
          });
          meshes.push(new THREE.Mesh(geometry, material1));
        }

        if (formats.etc1) {
          material1 = new THREE.MeshBasicMaterial({
            map: loader.load("/static/textures/stm_logo.tga")
          });
          meshes.push(new THREE.Mesh(geometry, material1));
        }

        if (formats.astc) {
          material1 = new THREE.MeshBasicMaterial({
            map: loader.load("/static/textures/stm_logo.tga")
          });
          meshes.push(new THREE.Mesh(geometry, material1));
        }

        var x = -meshes.length / 2;

        for (var i = 0; i < meshes.length; ++i, x += 300) {
          var mesh = meshes[i];
          mesh.position.x = x;
          mesh.position.y = 0;
          scene.add(mesh);
        }

        window.addEventListener('resize', onWindowResize, false);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);
        var time = Date.now() * 0.0003;

        for (var i = 0; i < meshes.length; i++) {
          var mesh = meshes[i];
          mesh.rotation.x = time;
          mesh.rotation.y = time;
        }

        renderer.render(scene, camera);
      } // if ( WEBGL.isWebGLAvailable() === false ) {
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

    } // startEarth() {
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

  }]);

  return WebGL;
}();

module.exports = {
  WebGL: WebGL
};

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/css/style.scss ./src/js/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/css/style.scss */"./src/css/style.scss");
module.exports = __webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");


/***/ })

/******/ });