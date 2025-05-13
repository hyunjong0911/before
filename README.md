# CUTE | 추억 공유 앨범

## 한국어 설명

간단하고 대화형 정적 웹사이트로, 친구와의 추억을 공유할 수 있습니다. GitHub Pages에서 호스팅하기 위해 설계되었으며, PWA로 설치 가능합니다.

### 주요 기능

- 추억 카드의 갤러리 뷰
- 상세 정보를 위한 대화형 모달 뷰
- 자체 관리 인터페이스 (추억 추가/수정/삭제)
- 이미지 URL 활용으로 간편한 사진 추가 및 자동 최적화
- 댓글 시스템으로 추억에 대한 생각 공유
- 브라우저 로컬 스토리지를 이용한 데이터 저장
- 다양한 화면 크기에 대응하는 반응형 디자인
- 한국어/프랑스어 다국어 지원
- PWA(Progressive Web App) 지원 - 모바일에 앱으로 설치 가능
- 오프라인 모드 지원

### 성능 최적화

- 이미지 지연 로딩(Lazy Loading) 적용
- 이미지 자동 최적화 및 WebP 지원
- 스타일시트 비동기 로딩
- 서비스 워커를 통한 효율적 캐싱 전략
- 모바일 환경 최적화
- 메모리 사용량 최적화

### 간단한 사용 방법

1. 웹사이트를 열어 로그인합니다 (ID: userone 또는 usertwo / PW: cute).
2. 우측 상단에서 언어를 선택할 수 있습니다 (한국어/프랑스어).
3. "추가하기" 버튼을 클릭하여 새 추억을 기록합니다:
   - 제목, 날짜, 장소, 이야기를 입력합니다
   - 이미지 URL을 붙여넣습니다 (Imgur, Google Photos 등에서 이미지 주소 복사)
   - "저장하기" 버튼을 클릭합니다
4. 카드를 클릭하면 추억의 상세 내용이 표시됩니다
5. 상세 화면에서 "수정" 또는 "삭제" 버튼을 사용할 수 있습니다
6. 댓글을 추가하여 추억에 대한 생각을 공유할 수 있습니다

### 모바일 앱으로 설치하기 (PWA)

1. 모바일 브라우저에서 웹사이트 접속
2. 브라우저 메뉴 → "홈 화면에 추가" 또는 "앱 설치" 선택
3. 앱 이름 확인 후 설치
4. 홈 화면에서 앱 아이콘을 통해 접근 가능

### 이미지 URL 얻는 방법

1. **Imgur 사용하기**: 
   - https://imgur.com 에 방문
   - 이미지 업로드 (계정 없이도 가능)
   - 업로드된 이미지 우클릭 → "이미지 주소 복사"

2. **Google Photos 사용하기**:
   - Google Photos에서 이미지 선택
   - 공유 버튼 클릭 → "링크 만들기"
   - 링크 복사 후 사용

### GitHub Pages에 배포하기

1. GitHub에 저장소를 생성합니다
2. 프로젝트 파일을 저장소에 푸시합니다
3. 저장소 설정 → Pages로 이동
4. 소스로 메인 브랜치 선택
5. 저장 후 몇 분 기다리면 사이트가 다음 주소에서 제공됩니다: `https://[사용자명].github.io/[저장소-이름]/`

---

## Description en Français

Un site web statique simple et interactif pour partager des souvenirs avec un ami. Conçu pour être hébergé sur GitHub Pages et installable comme une application PWA.

### Fonctionnalités principales

- Vue galerie des cartes de souvenirs
- Vue modale interactive pour les informations détaillées
- Interface de gestion intégrée (ajout/modification/suppression de souvenirs)
- Ajout facile de photos via URL d'images avec optimisation automatique
- Système de commentaires pour partager des pensées sur les souvenirs
- Stockage des données dans le localStorage du navigateur
- Design responsive pour différentes tailles d'écran
- Support multilingue (coréen/français)
- Support PWA (Progressive Web App) - installable comme une application sur mobile
- Support du mode hors ligne

### Optimisations de performance

- Chargement différé (Lazy Loading) des images
- Optimisation automatique des images et support WebP
- Chargement asynchrone des feuilles de style
- Stratégies de mise en cache efficaces via Service Worker
- Optimisation pour environnements mobiles
- Optimisation de l'utilisation de la mémoire

### Guide d'utilisation simple

1. Ouvrez le site web et connectez-vous (ID: userone ou usertwo / PW: cute).
2. Sélectionnez votre langue en haut à droite (coréen/français).
3. Cliquez sur le bouton "Ajouter" pour créer un nouveau souvenir :
   - Entrez le titre, la date, le lieu et l'histoire
   - Collez l'URL de l'image (copiée depuis Imgur, Google Photos, etc.)
   - Cliquez sur "Enregistrer"
4. Cliquez sur une carte pour voir les détails du souvenir
5. Dans la vue détaillée, utilisez les boutons "Modifier" ou "Supprimer"
6. Ajoutez des commentaires pour partager vos pensées sur un souvenir

### Installation comme application mobile (PWA)

1. Accédez au site web via votre navigateur mobile
2. Dans le menu du navigateur → "Ajouter à l'écran d'accueil" ou "Installer l'application"
3. Confirmez le nom de l'application et installez
4. Accédez à l'application via l'icône sur votre écran d'accueil

### Comment obtenir une URL d'image

1. **Utiliser Imgur** :
   - Visitez https://imgur.com
   - Téléchargez une image (possible sans compte)
   - Clic droit sur l'image → "Copier l'adresse de l'image"

2. **Utiliser Google Photos** :
   - Sélectionnez une image dans Google Photos
   - Cliquez sur Partager → "Créer un lien"
   - Copiez et utilisez le lien

### Déploiement sur GitHub Pages

1. Créez un dépôt sur GitHub
2. Poussez les fichiers du projet dans le dépôt
3. Allez dans Paramètres → Pages
4. Sélectionnez la branche principale comme source
5. Après quelques minutes, votre site sera disponible à : `https://[votre-nom].github.io/[nom-du-dépôt]/`

---

## Structure des fichiers | 파일 구조

- `index.html` - Structure HTML de base | 기본 HTML 구조
- `style.css` - Style et mise en page | 스타일 및 레이아웃
- `script.js` - Logique JavaScript et gestion des données | JavaScript 로직 및 데이터 관리
- `service-worker.js` - Service Worker pour fonctionnalités PWA | PWA 기능을 위한 서비스 워커
- `manifest.json` - Manifeste pour l'installation PWA | PWA 설치를 위한 매니페스트
- `images/` - Répertoire d'images et icônes | 이미지 및 아이콘 디렉토리

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage API
- Service Worker API
- Web App Manifest
- IntersectionObserver API 