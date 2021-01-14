export default class CacheTest {
    #VERSION = '0.0.1';
    #CACHE_FILES = [
        'index.html', 
        'main.js', 
        'CacheTest.js', 
    ];
    constructor() {
        console.log(window.Cache);
        this.open();
        this.keys();
//        this.delete();
    }
    open() {
        const self = this;
        caches.open(this.#VERSION).then(function(cache) {
            console.log('---- open()', self.#CACHE_FILES);
            return cache.addAll(self.#CACHE_FILES);
        });
    }
    keys() {
        const self = this;
        caches.keys().then(function(keyList) {
            console.log('---- keys()');
            return Promise.all(keyList.map(function(key) {
                console.log(`  ${key}`);
                /*
                if (self.#VERSION != key) {
                    return caches.delete(key);
                }
                */
            }));
        });
    }
    delete() {
        const self = this;
        caches.delete(this.#VERSION).then(function(is_found) {
            console.log(`---- delete() ${self.#VERSION} is_found: ${is_found}`);
        });
    }
}
