var version = '0.1';

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('rencs').then(function(cache) {
            return cache.addAll([
                '/',
                'index.html',
                'index.html?launcher=true',
                '/?launcher=true',
                // images
                'img/works/app_bayat.jpg',
                'img/works/catalogue_trslines.jpg',
                'img/works/frontend_maximum.jpg',
                'img/works/frontend_verapi.jpg',
                'img/works/logo_cay_kahve_gunlugu.jpg',
                'img/works/logo_datca_naturel_evler.jpg',
                'img/works/logo_geylani.jpg',
                'img/works/logo_lincat.jpg',
                'img/works/pixel_commander_kenan.gif',
                'img/works/site_aspect_key.jpg',
                'img/works/site_cay_kahve_gunlugu.jpg',
                'img/works/site_edu_technology.jpg',
                'img/back.jpg',
                'img/launcher-icon-1x.png',
                'img/launcher-icon-2x.png',
                'img/launcher-icon-144.png',
                'img/launcher-icon-4x.png',
                'img/launcher-icon-512.png',
                'img/logo.png',
                // fonts
                'fonts/rencs/rencs.eot',
                'fonts/rencs/rencs.svg',
                'fonts/rencs/rencs.ttf',
                'fonts/rencs/rencs.woff',
                'fonts/raleway/raleway.woff',
                'fonts/raleway/raleway.woff2',
                'fonts/raleway/raleway.ttf',
                'fonts/raleway/raleway-bold.woff',
                'fonts/raleway/raleway-bold.woff2',
                'fonts/raleway/raleway-bold-latin-ext.woff',
                'fonts/raleway/raleway-bold-latin-ext.woff2',
                'fonts/raleway/raleway-latin-ext.woff',
                'fonts/raleway/raleway-latin-ext.woff2',
                'fonts/merriweather/merriweather.woff',
                'fonts/merriweather/merriweather.woff2',
                'fonts/merriweather/merriweather.ttf',
                'fonts/merriweather/merriweather-latin-ext.woff',
                'fonts/merriweather/merriweather-latin-ext.woff2',
                // language packs
                'i18n/tr.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});