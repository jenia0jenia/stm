export function addScript(src) {
  let s = document.createElement('script');
  s.src = src;
  document.getElementsByTagName('head')[0].appendChild( s );
}

export function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}

// export function getWindowWidth() {
// 	return 
// }
// module.export = { addScript };
