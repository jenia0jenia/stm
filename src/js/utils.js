export function addScript(src) {
  let s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  document.getElementsByTagName('head')[0].appendChild( s );
}

// module.export = { addScript };
