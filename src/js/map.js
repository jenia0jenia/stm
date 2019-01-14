'use strict';

class YMap {
    constructor() {}

    init(center = [55.76, 37.64]) {
        this.center = center;
        if (ymaps) {
            ymaps.ready(() => {
                var myMap = new ymaps.Map('map', {
                    center: this.center,
                    zoom: 17
                });
            });
        } else {
            console.log('no yandex map api');
        }
        // return 1;
    }
    
}

module.exports = { YMap };