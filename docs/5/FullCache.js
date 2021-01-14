const WORKER = self; // ServiceWorker
class FullCache {
    #VERSION = '0.0.1';
    constructor() {
        this.#setup();
    }
    #setup() {
        const self = this;
        WORKER.addEventListener('message', (e) => {
            console.log(`message event !!`, e);
            self.addAll(e);
        });
        WORKER.addEventListener('install', function(e) {
            console.log(`install event !!`, e);
            e.waitUntil(WORKER.skipWaiting());
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
        if (event.data.type === 'CACHE_URLS') {
            event.waitUntil(
                caches.open(self.#VERSION).then((cache) => {
                    console.log(`addAll(): ${event.data.payload}`);
                    return cache.addAll(event.data.payload);
                })
            );
        }
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
