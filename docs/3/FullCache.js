const VERSION = '0.0.1';
const CACHE_FILES = [
    'index.html', 
    'main.js', 
    'FullCache.js', 
];
self.addEventListener('install', function(e) {
    console.log(`install event !!`, e);
    addAll(e);
});
self.addEventListener('fetch', function(e) {
    console.log('fetch event !!', e);
    cache(e)
});
self.addEventListener('activate', function(e) {
    console.log(`activate event !!`, e);
});
function addAll(event) {
    caches.open(VERSION).then(function(cache) {
        console.log('---- open()', CACHE_FILES);
        return cache.addAll(CACHE_FILES);
    });
}
function cache(event) {
    // リクエストに一致するデータがキャッシュにあるかどうか
    caches.match(event.request).then(function(cacheResponse) {
        // キャッシュがあればそれを返す、なければリクエストを投げる
        return cacheResponse || fetch(event.request).then(function(response) {
            return caches.open(VERSION).then(function(cache) {
                // レスポンスをクローンしてキャッシュに入れる
                cache.put(event.request, response.clone());
                // オリジナルのレスポンスはそのまま返す
                return response;
            });  
        });
    });
}

