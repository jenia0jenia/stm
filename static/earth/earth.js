function query(selector) {
  return document.querySelector(selector);
}

// let initializing, location, earthLoaded, postMessage, rotateStart
var initializing, earthLoaded, postMessage, rotateStart;

var earth, canvas, workerUrl;

function move (x, y) {
  console.log('move');
  console.log(x);
  console.log(y);
  postMessage(['move', rotateStart, [x, y]]);
  rotateStart = [x, y];
}

function mouseMove (e) {
  console.log('mouseMove');
  console.log(e.clientX);
  console.log(e.clientY);
  move(e.clientX, e.clientY);
  move(e.clientX, e.clientY);
}

function mouseUp () {
  document.body.classList.remove('is-grabbing');
  document.removeEventListener('mousemove', mouseMove, false);
  document.removeEventListener('mouseup', mouseUp, false);
}

function detectAndStartEarth (offscreen) {
  let webP = new Image();
  webP.src = 'data:image/webp;base64,' +
             'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  webP.onload = webP.onerror = () => {
    startEarth(offscreen, !!webP.height);
  };
}

function startEarth (offscreen, isWebP) {

  earthLoaded = true;

  postMessage([
    'init',
    offscreen,
    earth.clientWidth,
    earth.clientHeight,
    window.devicePixelRatio,
    query('[as=image][href*=map]').href,
    query('[as=image][href*=here]').href,
    isWebP
  ], [offscreen]);

  window.addEventListener('resize', () => {
    postMessage(['resize', earth.clientWidth, earth.clientHeight]);
  });

  if (location) setLocation(location);

  canvas.addEventListener('mousedown', e => {
    if (e.button === 0) { // left
      rotateStart = [e.clientX, e.clientY];
      e.preventDefault();
      document.addEventListener('mousemove', mouseMove, false);
      document.addEventListener('mouseup', mouseUp, false);
      document.body.classList.add('is-grabbing');
    }
  });

  if (window.innerWidth > 980) {
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        rotateStart = [e.touches[0].pageX, e.touches[0].pageY];
      }
    }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1) {
        move(e.touches[0].pageX, e.touches[0].pageY);
      }
    }, { passive: true });
  } else {
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        e.preventDefault();
        rotateStart = [e.touches[0].pageX, e.touches[0].pageY];
      }
    });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1) {
        e.preventDefault();
        move(e.touches[0].pageX, e.touches[0].pageY);
      }
    });
  }
}

function stopLoading () {
  canvas.style.opacity = 1;
  query('.earth_loading').remove();
}

function setLocation (l) {
  if (earthLoaded) {
    postMessage(['here', l.latitude, l.longitude]);
  } else {
    location = l;
  }
}

class Earth {
  constructor() {}

  init () {

    earth = query('.earth');
    canvas = query('.earth_canvas');
    workerUrl = query('[as=script]').href;

    if (initializing) return;
    initializing = true;

    let test = document.createElement('canvas');
    if (!test.getContext('webgl')) {
      earth.classList.add('is-disabled');
      return;
    }

    if (canvas.transferControlToOffscreen) {
      let worker = new Worker(workerUrl);
      console.log(worker);
      postMessage = (data, transfer) => worker.postMessage(data, transfer);
      worker.onmessage = stopLoading;
      detectAndStartEarth(canvas.transferControlToOffscreen());
    } else {
      let script = document.createElement('script');
      script.src = workerUrl;
      script.async = true;
      script.onload = () => {
        postMessage = window.wS;
        detectAndStartEarth(canvas);
      };
      window.wM = stopLoading;
      document.head.appendChild(script);
    }
  }
}

module.exports = { Earth };
