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
            scope: './'
        }).then(function(registration) {
            var serviceWorker;
            if (registration.installing) {
                console.log('installing');
                serviceWorker = registration.installing;
            } else if (registration.waiting) {
                console.log('waiting');
                serviceWorker = registration.waiting;
            } else if (registration.active) {
                console.log('active');
                serviceWorker = registration.active;
            }
            if (serviceWorker) {
                console.log(`state: ${serviceWorker.state}`);
                serviceWorker.addEventListener('statechange', function (e) {
                    console.log(`state: ${e.target.state}`);
                });
            }
        }).catch (function (error) {
            console.log(error);
        });
    }
}
