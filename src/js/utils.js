export function addScript(src) {
  let s = document.createElement('script');
  s.src = src;
  document.getElementsByTagName('head')[0].appendChild( s );
}

// export function getWindowWidth() {
// 	return 
// }
// module.export = { addScript };
