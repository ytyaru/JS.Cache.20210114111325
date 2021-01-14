const WORKER = self; // ServiceWorker
class FullCache {
    #VERSION = '0.0.1';
    #CACHE_FILES = [
        'index.html', 
        'main.js', 
        'FullCache.js', 
    ];
    constructor() {
        this.#setup();
    }
    #setup() {
        const self = this;
        WORKER.addEventListener('install', function(e) {
            console.log(`install event !!`, e);
            self.addAll(e);
        });
        WORKER.addEventListener('fetch', function(e) {
            console.log('fetch event !!', e);
            self.cache(e)
        });
        WORKER.addEventListener('activate', function(e) {
            console.log(`activate event !!`, e);
        });
    }
    addAll(event) {
        const self = this;
        caches.open(this.#VERSION).then(function(cache) {
            console.log('---- open()', self.#CACHE_FILES);
            return cache.addAll(self.#CACHE_FILES);
        });
    }
    cache(event) {
        const self = this;
        // リクエストに一致するデータがキャッシュにあるかどうか
        caches.match(event.request).then(function(cacheResponse) {
            // キャッシュがあればそれを返す、なければリクエストを投げる
            return cacheResponse || fetch(event.request).then(function(response) {
                return caches.open(self.#VERSION).then(function(cache) {
                    // レスポンスをクローンしてキャッシュに入れる
                    cache.put(event.request, response.clone());
                    // オリジナルのレスポンスはそのまま返す
                    return response;
                });  
            });
        });
    }
}
const c = new FullCache(); 
