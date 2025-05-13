// 캐시 이름과 버전 정의
const CACHE_NAME = 'memory-album-cache-v2';
const DATA_CACHE_NAME = 'memory-album-data-cache-v1';
const OFFLINE_URL = '/index.html';

// 캐시할 핵심 정적 파일 목록
const STATIC_URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap'
];

// 오프라인 페이지 사전 캐싱
const cacheOfflinePage = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
};

// 서비스 워커 설치 및 캐시 초기화 (최적화)
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      try {
        // 핵심 파일들 캐싱
        const cache = await caches.open(CACHE_NAME);
        console.log('캐시 열기 성공');
        
        // 동시에 모든 자원 캐싱 처리
        await Promise.all([
          cache.addAll(STATIC_URLS_TO_CACHE),
          cacheOfflinePage()
        ]);
        
        // 설치 완료 후 즉시 활성화
        await self.skipWaiting();
      } catch (error) {
        console.error('캐시 초기화 실패:', error);
      }
    })()
  );
});

// 네트워크 요청 가로채기 (개선된 전략)
self.addEventListener('fetch', event => {
  // 데이터 요청인지 확인 (API 호출 등)
  if (event.request.url.includes('/api/') || event.request.method !== 'GET') {
    // 네트워크 우선 전략 (Network-first) - API 호출에 적용
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(DATA_CACHE_NAME).then(cache => {
              cache.put(event.request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // 이미지 요청인 경우
  if (event.request.destination === 'image') {
    // 캐시 우선 전략 (Cache-first) - 이미지에 적용
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
    );
    return;
  }
  
  // 기본 요청에 대한 처리 (스테일-와일-리밸리데이트 전략)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // 캐시에서 응답이 있으면 즉시 반환하면서, 백그라운드에서 네트워크 요청 실행
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return null;
          });
        
        return cachedResponse || fetchPromise;
      })
  );
});

// 서비스 워커 활성화 및 오래된 캐시 삭제
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
  
  event.waitUntil(
    (async () => {
      // 캐시 스토리지 제어권 획득
      await self.clients.claim();
      
      // 오래된 캐시 삭제
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('오래된 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })()
  );
});

// 주기적인 백그라운드 동기화 (선택적)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-cache') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(STATIC_URLS_TO_CACHE);
      })
    );
  }
}); 