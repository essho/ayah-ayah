const CACHE_NAME = 'quran-cache-v1';
const urlsToCache = [
  './index.html',
  './style.css', // إذا كان لديك ملف CSS خارجي
  './script.js', // إذا كان لديك ملف JS خارجي
  './manifest.json',
  './icon.png',
  './quran_data.json',
  
  // قم بإضافة مسارات ملفات الترجمة
  './translation/ar/ar_translation_1.json',
  './translation/en/en_translation_1.json',
  './translation/id/id_translation_1.json',
  // ... كرر هنا لجميع ملفات الترجمة (من 1 إلى 114)
  
  // قم بإضافة مسارات ملفات الصوت
  './audio/hussary_muallim/001001.mp3',
  './audio/001/001.mp3'
  // ... كرر هنا لجميع ملفات الصوت التي تريدها (تجنب إضافة كل شيء لتوفير مساحة)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});