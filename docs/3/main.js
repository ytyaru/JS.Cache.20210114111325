//import CacheTest from './CacheTest.js';
//import FullCache from './FullCache.js';
import ServiceWorkerRegister from './ServiceWorkerRegister.js';
window.addEventListener('load', (event) => {
    const PATH = 'FullCache.js';
    let register = new ServiceWorkerRegister(PATH);
});
