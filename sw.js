const CACHE_STATIC_NAME = 'staticCache-v1';
const CACHE_DYNAMIC_NAME = 'dynamicCache-v1';
const CACHE_INMUTABLE_NAME = 'inmutableCache-v1';

var _window = this || self || window;
let url = _window.location.href;

self.addEventListener('install', (event) => {
    
    
    if(url.includes('localhost')){
        console.log('SW: Instalado en localhost');
    }else{
        console.log('SW: Instalado en git');
    }
    const staticCache = caches.open(CACHE_STATIC_NAME).then((cache) => {
        if(url.includes('localhost')){
            return cache.addAll([
                '/',
                'index', //si pongo index.html no me lo reconoce
                'images/noticia1.png',
                'images/noticia2.png',
                'images/noticia3.png',
                'images/noticia4.png',
                'js/app.js'
            ]);
        }else{
            return cache.addAll([
                'https://estephania99.github.io/PWA-U2-T1-EECM/',
                'https://estephania99.github.io/PWA-U2-T1-EECM/index',
                'https://estephania99.github.io/PWA-U2-T1-EECM/images/noticia1.png',
                'https://estephania99.github.io/PWA-U2-T1-EECM/images/noticia2.png',
                'https://estephania99.github.io/PWA-U2-T1-EECM/images/noticia3.png',
                'https://estephania99.github.io/PWA-U2-T1-EECM/images/noticia4.png',
                'https://estephania99.github.io/PWA-U2-T1-EECM/js/app.js'
            ]);
        }
    });

    const inmutableCache = caches.open(CACHE_INMUTABLE_NAME).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
            'https://code.jquery.com/jquery-3.5.1.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js'
        ]);
    });

    //event.waitUntil(inmutableCache)
    event.waitUntil(Promise.all([staticCache, inmutableCache]));
});

self.addEventListener('fetch', (event) => {
    console.log(event.request.url);

    const respuestaCache = caches.match(event.request).then((resp) =>{
        if(resp){
            return resp;
        }
        console.log('No est?? en cach??', event.request.url);

        return fetch(event.request).then((respuestaNet) => {
            event.preventDefault()
            console.log(event.request);
            caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                cache.put(event.request, respuestaNet)
            });

            return respuestaNet.clone()
        })
    })

    event.respondWith(respuestaCache)
})