export default class ServiceWorkerRegister {
    #path;
    constructor(path='sw.js') {
        this.#path = path;
        this.#setup();
    }
    show() {
        console.log(this.msg);
        alert(this.msg);
    }
    #setup() {
        console.log('has navigator:',navigator);
        console.log(`has serviceWorker: ${'serviceWorker' in navigator}`);
        navigator.serviceWorker.register(this.#path, {
            scope: '/'
        }).then(function(registration) {
            const data = {
                type: 'CACHE_URLS',
                payload: [
                    location.href,
                    ...performance.getEntriesByType('resource').map((r) => r.name)
                ]
            };
            registration.installing.postMessage(data);
        }).catch (function (error) {
            console.log(error);
        });
    }
}
