// DOM Elements for Login
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const loginOverlay = document.getElementById('loginOverlay');
const contentContainer = document.getElementById('contentContainer');
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutButton = document.getElementById('logoutButton');
const profilePicture = document.getElementById('profilePicture');

// DOM Elements for Gallery and Detail View
const galleryContainer = document.getElementById('memoryGallery');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalLocation = document.getElementById('modalLocation');
const modalStory = document.getElementById('modalStory');
const closeModalButton = document.getElementById('closeModal');
const editMemoryButton = document.getElementById('editMemoryBtn');
const deleteMemoryButton = document.getElementById('deleteMemoryBtn');

// DOM Elements for Edit/Add Form
const addMemoryButton = document.getElementById('addMemoryBtn');
const editModalOverlay = document.getElementById('editModalOverlay');
const closeEditModalButton = document.getElementById('closeEditModal');
const memoryForm = document.getElementById('memoryForm');
const editModalTitle = document.getElementById('editModalTitle');
const memoryIdInput = document.getElementById('memoryId');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const locationInput = document.getElementById('location');
const imageUrlInput = document.getElementById('imageUrl');
const imagePreview = document.getElementById('imagePreview');
const storyInput = document.getElementById('story');

// Language selector elements
const langKoButton = document.getElementById('langKo');
const langFrButton = document.getElementById('langFr');

// Global variables
let currentMemoryId = null;
let currentLanguage = 'ko'; // Default language
let isLoggedIn = false;
let currentUser = null;

// Login credentials (multiple accounts)
const validUsers = [
    {
        username: 'userone',
        password: 'cute',
        nickname: 'Tytrest',
        profileUrl: ''
    },
    {
        username: 'usertwo',
        password: 'cute',
        nickname: 'u_cute',
        profileUrl: ''
    }
];

// Translation dictionary
const translations = {
    ko: {
        title: "CUTE",
        subtitle: "함께한 순간과 모험의 컬렉션",
        addMemory: "추가하기",
        date: "날짜:",
        location: "장소:",
        edit: "수정",
        delete: "삭제",
        addMemoryTitle: "추억 추가하기",
        editMemoryTitle: "추억 수정하기",
        titleLabel: "제목:",
        dateLabel: "날짜:",
        locationLabel: "장소:",
        imageUrlLabel: "이미지 URL:",
        storyLabel: "이야기:",
        save: "저장하기",
        imageUrlHelp: "* Imgur, Google Photos 등에서 이미지 URL을 복사해서 붙여넣으세요",
        confirmDelete: "이 추억을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
        noMemories: "아직 추억이 없습니다. \"추가하기\" 버튼을 눌러 첫 추억을 기록해보세요!",
        loginTitle: "로그인",
        usernameLabel: "아이디:",
        passwordLabel: "비밀번호:",
        loginButton: "로그인",
        logout: "로그아웃",
        loginError: "아이디 또는 비밀번호가 잘못되었습니다.",
        welcomeUser: "환영합니다, {username}님!",
        imagePreviewError: "이미지를 불러올 수 없습니다. 유효한 이미지 URL을 입력해주세요.",
        imagePreviewLoading: "이미지 로드 중...",
        profileUrlPrompt: "프로필 사진 URL을 입력하세요:",
        profileUrlError: "유효하지 않은 이미지 URL입니다. 다시 시도해주세요.",
        comments: "댓글:",
        commentPlaceholder: "댓글을 입력하세요...",
        postComment: "등록",
        noComments: "아직 댓글이 없습니다. 첫 댓글을 남겨보세요!",
        deleteComment: "삭제",
        confirmDeleteComment: "이 댓글을 삭제하시겠습니까?",
        ago: "전",
        justNow: "방금",
        minute: "분",
        minutes: "분",
        hour: "시간",
        hours: "시간",
        day: "일",
        days: "일"
    },
    fr: {
        title: "CUTE",
        subtitle: "Une collection de nos moments et aventures partagés",
        addMemory: "Ajouter",
        date: "Date :",
        location: "Lieu :",
        edit: "Modifier",
        delete: "Supprimer",
        addMemoryTitle: "Ajouter un souvenir",
        editMemoryTitle: "Modifier un souvenir",
        titleLabel: "Titre :",
        dateLabel: "Date :",
        locationLabel: "Lieu :",
        imageUrlLabel: "URL de l'image :",
        storyLabel: "Histoire :",
        save: "Enregistrer",
        imageUrlHelp: "* Copiez et collez l'URL de l'image depuis Imgur, Google Photos, etc.",
        confirmDelete: "Voulez-vous supprimer ce souvenir ? Cette action est irréversible.",
        noMemories: "Il n'y a pas encore de souvenirs. Cliquez sur \"Ajouter\" pour créer votre premier souvenir !",
        loginTitle: "Connexion",
        usernameLabel: "Identifiant :",
        passwordLabel: "Mot de passe :",
        loginButton: "Connexion",
        logout: "Déconnexion",
        loginError: "Identifiant ou mot de passe incorrect.",
        welcomeUser: "Bienvenue, {username} !",
        imagePreviewError: "Impossible de charger l'image. Veuillez vérifier l'URL de l'image.",
        imagePreviewLoading: "Chargement de l'image...",
        profileUrlPrompt: "Entrez l'URL de la photo de profil:",
        profileUrlError: "URL de l'image invalide. Veuillez réessayer.",
        comments: "Commentaires :",
        commentPlaceholder: "Écrivez un commentaire...",
        postComment: "Publier",
        noComments: "Pas encore de commentaires. Soyez le premier à commenter !",
        deleteComment: "Supprimer",
        confirmDeleteComment: "Voulez-vous supprimer ce commentaire ?",
        ago: "il y a",
        justNow: "à l'instant",
        minute: "minute",
        minutes: "minutes",
        hour: "heure",
        hours: "heures",
        day: "jour",
        days: "jours"
    }
};

// Sample memories (initial data) with French translations
const sampleMemories = [
    {
        id: 1,
        title: "벚꽃 축제에서",
        date: "2023-04-10",
        location: "서울, 남산공원",
        imageUrl: "https://images.unsplash.com/photo-1587389408588-9411d6ccc129",
        story: "올해 봄, 남산공원에서 함께 봤던 벚꽃이 정말 예뻤어요.\n\n분홍빛 꽃잎이 하늘을 수놓고, 우리는 그 아래서 소풍을 즐겼죠. 피크닉 매트 위에 앉아 이야기를 나누며 보낸 그 시간이 특별했어요.\n\n내년 봄에도 꼭 다시 와보자고 약속했던 날이에요.",
        title_fr: "Festival des cerisiers en fleurs",
        location_fr: "Séoul, Parc de Namsan",
        story_fr: "Ce printemps, les cerisiers en fleurs que nous avons vus ensemble au parc de Namsan étaient vraiment magnifiques.\n\nLes pétales roses ornaient le ciel, et nous avons profité d'un pique-nique en dessous. Ce moment passé assis sur la couverture de pique-nique à discuter était spécial.\n\nC'est le jour où nous avons promis de revenir au printemps prochain.",
        comments: [
            {
                id: 101,
                username: 'Tytrest',
                text: '이때 벚꽃이 정말 예뻤어요! 다음에 또 가요.',
                timestamp: '2023-04-12T14:35:00',
                profileUrl: ''
            },
            {
                id: 102,
                username: 'u_cute',
                text: '사진 너무 잘 찍었어요! 분위기가 너무 좋아요~',
                timestamp: '2023-04-13T10:22:00',
                profileUrl: ''
            }
        ]
    },
    {
        id: 2,
        title: "바닷가 일몰",
        date: "2023-07-22",
        location: "부산, 해운대 해변",
        imageUrl: "https://images.unsplash.com/photo-1517627043994-d62c8b3f0895",
        story: "해운대 바다에서 본 일몰은 정말 환상적이었어요.\n\n붉은 태양이 천천히 바다로 잠기는 모습을 함께 지켜보면서, 우리는 많은 이야기를 나눴어요. 파도 소리를 들으며 모래사장을 걷던 그 순간들이 아직도 생생해요.\n\n시간이 멈춘 것 같은 느낌이었죠.",
        title_fr: "Coucher de soleil à la plage",
        location_fr: "Busan, Plage de Haeundae",
        story_fr: "Le coucher de soleil que nous avons vu à la plage de Haeundae était vraiment fantastique.\n\nEn regardant le soleil rouge plonger lentement dans la mer, nous avons partagé de nombreuses histoires. Ces moments où nous marchions sur le sable en écoutant le bruit des vagues sont encore vivants dans ma mémoire.\n\nC'était comme si le temps s'était arrêté.",
        comments: [
            {
                id: 201,
                username: 'u_cute',
                text: '바다에서 보는 석양이 제일 예쁜 것 같아요.',
                timestamp: '2023-07-23T18:45:00',
                profileUrl: ''
            }
        ]
    },
    {
        id: 3,
        title: "몽글몽글 구름 산책",
        date: "2023-05-15",
        location: "서울, 하늘공원",
        imageUrl: "https://images.unsplash.com/photo-1530569673472-307dc017a82d",
        story: "하늘공원에 피어있는 코스모스 사이로 걸었던 날, 구름이 정말 예뻤어요.\n\n마치 솜사탕 같은 구름들이 우리 위로 둥둥 떠다녔죠. 함께 하늘을 올려다보며 구름 모양을 맞추고 상상의 나래를 펼쳤던 그 날의 기분이 말랑말랑하게 떠올라요.",
        title_fr: "Promenade sous les nuages duveteux",
        location_fr: "Séoul, Parc du Ciel",
        story_fr: "Le jour où nous avons marché parmi les cosmos en fleurs au Parc du Ciel, les nuages étaient vraiment beaux.\n\nDes nuages comme des barbes à papa flottaient au-dessus de nous. Je me souviens encore de la sensation douce de cette journée où nous avons regardé le ciel ensemble, devinant les formes des nuages et laissant libre cours à notre imagination.",
        comments: []
    }
];

// 이미지 옵션 설정 - WebP 지원 여부 확인
const supportsWebP = (function() {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext || !canvas.getContext('2d')) {
        return false;
    }
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

// 이미지 로드 상태 관리를 위한 IntersectionObserver 설정
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Utility Functions
// -----------------------------------------------

// 문자열에서 HTML 특수 문자를 이스케이프하는 함수
function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 이미지 URL 유효성을 검사하는 함수
function isValidImageUrl(url) {
    return url && /\.(jpeg|jpg|gif|png|webp|bmp|svg)(\?.*)?$/i.test(url);
}

// 모달 표시 함수
function showModal(modalElement) {
    modalElement.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 모달 닫기 함수
function closeModal(modalElement) {
    modalElement.style.display = 'none';
    document.body.style.overflow = 'auto'; // 스크롤 재활성화
}

// 이미지 최적화 함수
function optimizeImageUrl(url) {
    // Unsplash 이미지 최적화
    if (url.includes('unsplash.com') && !url.includes('&w=')) {
        return `${url}${url.includes('?') ? '&' : '?'}w=800&q=80${supportsWebP ? '&fm=webp' : ''}`;
    }
    // Imgur 이미지 최적화
    else if (url.includes('imgur.com') && !url.includes('.webp') && supportsWebP) {
        return url.replace(/\.(jpg|jpeg|png)/, '.webp');
    }
    return url;
}

// Login functions
function attemptLogin(event) {
    event.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    const user = validUsers.find(user => user.username === username && user.password === password);
    
    if (user) {
        loginSuccess(user);
    } else {
        showLoginError();
    }
}

function loginSuccess(user) {
    isLoggedIn = true;
    currentUser = user;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user.username);
    
    // Update UI
    loginOverlay.style.display = 'none';
    contentContainer.style.display = 'block';
    updateUserDisplay(user);
    
    // Load content
    document.body.classList.add('loaded');
    loadLanguagePreference();
    createMemoryCards();
}

function updateUserDisplay(user) {
    const welcomeText = translations[currentLanguage].welcomeUser.replace('{username}', user.nickname);
    usernameDisplay.textContent = welcomeText;
    
    // Update profile picture if available
    if (user.profileUrl && profilePicture) {
        profilePicture.src = user.profileUrl;
        profilePicture.alt = user.nickname;
        profilePicture.classList.remove('hidden');
    } else if (profilePicture) {
        profilePicture.classList.add('hidden');
    }
}

function showLoginError() {
    loginError.textContent = translations[currentLanguage].loginError;
    passwordInput.value = '';
    
    // Shake effect
    loginForm.classList.add('shake');
    setTimeout(() => {
        loginForm.classList.remove('shake');
    }, 500);
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Reset and show login
    passwordInput.value = '';
    loginError.textContent = '';
    loginOverlay.style.display = 'flex';
    contentContainer.style.display = 'none';
}

// Check if already logged in
function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const savedUsername = localStorage.getItem('username');
        const user = validUsers.find(user => user.username === savedUsername);
        if (user) {
            loginSuccess(user);
        } else {
            // Fallback in case the saved username doesn't match any valid user
            logout();
        }
    }
}

// Load language preference from localStorage
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    applyLanguage();
    updateLanguageButtons();
}

// Save language preference to localStorage
function saveLanguagePreference(language) {
    localStorage.setItem('language', language);
}

// Apply translations to the UI
function applyLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update user display with translated welcome message
    if (isLoggedIn) {
        updateUserDisplay(currentUser);
    }
}

// Update language button states
function updateLanguageButtons() {
    langKoButton.classList.toggle('active', currentLanguage === 'ko');
    langFrButton.classList.toggle('active', currentLanguage === 'fr');
    
    // ARIA 상태 업데이트
    langKoButton.setAttribute('aria-pressed', currentLanguage === 'ko');
    langFrButton.setAttribute('aria-pressed', currentLanguage === 'fr');
}

// Change language
function changeLanguage(language) {
    currentLanguage = language;
    saveLanguagePreference(language);
    applyLanguage();
    updateLanguageButtons();
    
    // Refresh memory cards to update displayed dates
    createMemoryCards();
}

// Load memories from localStorage or use sample memories
function loadMemories() {
    const savedMemories = localStorage.getItem('memories');
    if (savedMemories) {
        return JSON.parse(savedMemories);
    } else {
        // First time using the app, save sample memories
        localStorage.setItem('memories', JSON.stringify(sampleMemories));
        return sampleMemories;
    }
}

// Save memories to localStorage
function saveMemories(memories) {
    localStorage.setItem('memories', JSON.stringify(memories));
}

// Generate memory cards in the gallery (최적화된 버전)
function createMemoryCards() {
    const memories = loadMemories();
    galleryContainer.innerHTML = ''; // Clear gallery container
    
    if (memories.length === 0) {
        galleryContainer.innerHTML = `<p class="no-memories">${translations[currentLanguage].noMemories}</p>`;
        return;
    }
    
    // DocumentFragment 사용하여 DOM 조작 최소화
    const fragment = document.createDocumentFragment();
    
    memories.forEach(memory => {
        // Create memory card element
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.memoryId = memory.id;
        
        // Format display date
        const displayDate = formatDate(memory.date);
        
        // Use the appropriate title based on language
        const displayTitle = currentLanguage === 'fr' && memory.title_fr ? memory.title_fr : memory.title;
        const safeTitle = escapeHTML(displayTitle);
        
        // 최적화된 이미지 URL 적용
        const optimizedImageUrl = optimizeImageUrl(memory.imageUrl);
        
        // Create card content with lazy loading
        memoryCard.innerHTML = `
            <div class="image-placeholder" style="background-color: #f0f0f0; padding-top: 75%;">
                <img class="memory-thumbnail lazy-image" data-src="${optimizedImageUrl}" alt="${safeTitle}" loading="lazy">
            </div>
            <div class="memory-info-preview">
                <h3 class="memory-title">${safeTitle}</h3>
                <p class="memory-date">${displayDate}</p>
            </div>
        `;
        
        // Add click event to show modal (이벤트 위임 사용으로 변경)
        memoryCard.dataset.action = 'openModal';
        
        // Append card to fragment
        fragment.appendChild(memoryCard);
    });
    
    // 모든 카드를 한 번에 DOM에 추가
    galleryContainer.appendChild(fragment);
    
    // 지연 로딩 처리
    document.querySelectorAll('.lazy-image').forEach(img => {
        lazyImageObserver.observe(img);
    });
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(currentLanguage === 'ko' ? 'ko-KR' : 'fr-FR', options);
}

// Open memory detail modal
function openMemoryModal(memory) {
    currentMemoryId = memory.id;
    
    // Use language-specific content if available
    const displayTitle = currentLanguage === 'fr' && memory.title_fr ? memory.title_fr : memory.title;
    const displayLocation = currentLanguage === 'fr' && memory.location_fr ? memory.location_fr : memory.location;
    const displayStory = currentLanguage === 'fr' && memory.story_fr ? memory.story_fr : memory.story;
    
    // Populate modal with memory data
    modalImage.src = memory.imageUrl;
    modalImage.alt = displayTitle;
    modalTitle.textContent = displayTitle;
    modalDate.textContent = formatDate(memory.date);
    modalLocation.textContent = displayLocation;
    
    // Replace \n with <br> for proper HTML display
    modalStory.innerHTML = displayStory.replace(/\n/g, '<br>');
    
    // Load comments
    loadComments(memory);
    
    // Show modal
    showModal(modalOverlay);
}

// Close memory detail modal
function closeMemoryModal() {
    closeModal(modalOverlay);
    currentMemoryId = null;
}

// Open edit memory modal with empty form (for adding)
function openAddMemoryModal() {
    // Reset form
    memoryForm.reset();
    memoryIdInput.value = '';
    
    // Reset image preview
    imagePreview.classList.add('hidden');
    imagePreview.src = '';
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    editModalTitle.textContent = translations[currentLanguage].addMemoryTitle;
    
    // Show modal
    showModal(editModalOverlay);
}

// Open edit memory modal with filled form (for editing)
function openEditMemoryModal(memoryId) {
    const memories = loadMemories();
    const memory = memories.find(m => m.id === memoryId);
    
    if (!memory) return;
    
    // Fill form with memory data
    memoryIdInput.value = memory.id;
    
    // Use language-specific content if editing in French
    if (currentLanguage === 'fr' && memory.title_fr) {
        titleInput.value = memory.title_fr;
        locationInput.value = memory.location_fr || memory.location;
        storyInput.value = memory.story_fr || memory.story;
    } else {
        titleInput.value = memory.title;
        locationInput.value = memory.location;
        storyInput.value = memory.story;
    }
    
    dateInput.value = memory.date;
    imageUrlInput.value = memory.imageUrl;
    
    // Load image preview
    loadImagePreview(memory.imageUrl);
    
    editModalTitle.textContent = translations[currentLanguage].editMemoryTitle;
    
    // Show modal
    showModal(editModalOverlay);
}

// Close edit memory modal
function closeEditModal() {
    closeModal(editModalOverlay);
}

// Save memory (add or update)
function saveMemory(event) {
    event.preventDefault();
    
    const memories = loadMemories();
    const memoryId = memoryIdInput.value ? parseInt(memoryIdInput.value) : Date.now();
    
    // 기본 메모리 객체 생성
    const memory = {
        id: memoryId,
        title: titleInput.value,
        date: dateInput.value,
        location: locationInput.value,
        imageUrl: imageUrlInput.value,
        story: storyInput.value
    };
    
    // 편집 중인 기존 메모리인 경우 언어별 컨텐츠 보존
    if (memoryIdInput.value) {
        const existingMemory = memories.find(m => m.id === memoryId);
        if (existingMemory) {
            // 현재 언어가 프랑스어가 아니고, 프랑스어 번역이 있으면 보존
            if (currentLanguage !== 'fr' && existingMemory.title_fr) {
                memory.title_fr = existingMemory.title_fr;
                memory.location_fr = existingMemory.location_fr;
                memory.story_fr = existingMemory.story_fr;
            } 
            // 현재 언어가 프랑스어이고, 편집한 내용을 프랑스어 필드에 저장
            else if (currentLanguage === 'fr') {
                memory.title_fr = titleInput.value;
                memory.location_fr = locationInput.value;
                memory.story_fr = storyInput.value;
                
                // 한국어 원본이 있으면 보존, 없으면 같은 값 사용
                memory.title = existingMemory.title || titleInput.value;
                memory.location = existingMemory.location || locationInput.value;
                memory.story = existingMemory.story || storyInput.value;
            }
        }
    } 
    // 새 메모리 추가시 현재 언어가 프랑스어면 해당 필드에 저장
    else if (currentLanguage === 'fr') {
        memory.title_fr = titleInput.value;
        memory.location_fr = locationInput.value;
        memory.story_fr = storyInput.value;
    }
    
    if (memoryIdInput.value) {
        // Update existing memory
        const index = memories.findIndex(m => m.id === memoryId);
        if (index !== -1) {
            memories[index] = memory;
        }
    } else {
        // Add new memory
        memories.push(memory);
    }
    
    // Save to localStorage and refresh gallery
    saveMemories(memories);
    createMemoryCards();
    
    // Close modal
    closeEditModal();
}

// Delete memory
function deleteMemory() {
    if (!currentMemoryId) return;
    
    if (confirm(translations[currentLanguage].confirmDelete)) {
        const memories = loadMemories();
        const filteredMemories = memories.filter(m => m.id !== currentMemoryId);
        
        saveMemories(filteredMemories);
        createMemoryCards();
        closeMemoryModal();
    }
}

// Event listeners
loginForm.addEventListener('submit', attemptLogin);
logoutButton.addEventListener('click', logout);

closeModalButton.addEventListener('click', closeMemoryModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeMemoryModal();
    }
});

closeEditModalButton.addEventListener('click', closeEditModal);
editModalOverlay.addEventListener('click', (e) => {
    if (e.target === editModalOverlay) {
        closeEditModal();
    }
});

// 이미지 URL 입력 필드에 이벤트 리스너 추가
imageUrlInput.addEventListener('input', function() {
    // 타이핑할 때마다 실시간으로 미리보기 업데이트
    // 타이핑 지연 시간을 주어 너무 자주 호출되지 않도록 함
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
        loadImagePreview(this.value);
    }, 500);
});

// 이미지 URL 입력 필드에서 포커스가 빠져나갈 때 미리보기 생성
imageUrlInput.addEventListener('blur', function() {
    loadImagePreview(this.value);
});

// Language switcher events
langKoButton.addEventListener('click', () => changeLanguage('ko'));
langFrButton.addEventListener('click', () => changeLanguage('fr'));

addMemoryButton.addEventListener('click', openAddMemoryModal);
editMemoryButton.addEventListener('click', () => {
    closeMemoryModal();
    openEditMemoryModal(currentMemoryId);
});
deleteMemoryButton.addEventListener('click', deleteMemory);

memoryForm.addEventListener('submit', saveMemory);

// Close modals on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMemoryModal();
        closeEditModal();
    }
});

// 버튼 클릭 애니메이션 함수
function addButtonAnimation(button) {
    // 클릭 애니메이션 추가
    button.classList.add('btn-clicked');
    
    // 일정 시간 후 애니메이션 클래스 제거
    setTimeout(() => {
        button.classList.remove('btn-clicked');
    }, 400);
}

// 물결 효과 함수
function createRippleEffect(event) {
    const button = event.currentTarget;
    
    // 이전 물결 효과 제거
    const ripples = button.getElementsByClassName('ripple');
    while (ripples.length > 0) {
        ripples[0].parentNode.removeChild(ripples[0]);
    }
    
    // 새로운 물결 효과 요소 생성
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    // 물결 효과 위치 및 크기 설정
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    
    // 애니메이션 완료 후 물결 효과 제거
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 버튼에 애니메이션 적용하기
function applyButtonAnimations() {
    // 모든 액션 버튼에 애니메이션 추가
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.classList.add('btn-ripple');
        button.addEventListener('click', function(event) {
            addButtonAnimation(this);
            createRippleEffect(event);
        });
    });
    
    // 언어 선택 버튼에 애니메이션 추가
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.classList.add('btn-ripple');
        button.addEventListener('click', function(event) {
            addButtonAnimation(this);
            createRippleEffect(event);
        });
    });
    
    // 로그아웃 버튼에 애니메이션 추가
    if (logoutButton) {
        logoutButton.classList.add('btn-ripple');
        logoutButton.addEventListener('click', function(event) {
            addButtonAnimation(this);
            createRippleEffect(event);
            // 기존 로그아웃 기능은 그대로 동작 (이벤트 헨들러가 이미 등록되어 있음)
        });
    }
    
    // 모달 닫기 버튼에 애니메이션 추가
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            addButtonAnimation(this);
        });
    });
    
    // 로그인 버튼에 애니메이션 추가
    const loginButton = document.querySelector('#loginForm button[type="submit"]');
    if (loginButton) {
        loginButton.classList.add('btn-ripple');
        loginButton.addEventListener('click', function(event) {
            // 잘못된 로그인이 아닐 경우에만 애니메이션 적용 (shake 애니메이션과 충돌 방지)
            if (!loginForm.classList.contains('shake')) {
                addButtonAnimation(this);
                createRippleEffect(event);
            }
        });
    }
}

// 프로필 사진 업데이트 함수
function updateProfilePicture() {
    const profileUrl = prompt(translations[currentLanguage].profileUrlPrompt || '프로필 사진 URL을 입력하세요:');
    
    if (profileUrl && profileUrl.trim()) {
        // 이미지 URL 검증
        const img = new Image();
        img.onload = function() {
            // 이미지 로드 성공 시 프로필 업데이트
            if (currentUser) {
                currentUser.profileUrl = profileUrl.trim();
                // 로컬 스토리지에 사용자 정보 저장
                saveUserProfiles();
                
                // UI 업데이트
                if (profilePicture) {
                    profilePicture.src = currentUser.profileUrl;
                    profilePicture.alt = currentUser.nickname;
                    profilePicture.classList.remove('hidden');
                }
            }
        };
        
        img.onerror = function() {
            alert(translations[currentLanguage].profileUrlError || '유효하지 않은 이미지 URL입니다. 다시 시도해주세요.');
        };
        
        img.src = profileUrl.trim();
    }
}

// 사용자 프로필 저장 함수
function saveUserProfiles() {
    const profilesData = validUsers.map(user => ({
        username: user.username,
        nickname: user.nickname,
        profileUrl: user.profileUrl
    }));
    
    localStorage.setItem('userProfiles', JSON.stringify(profilesData));
}

// 사용자 프로필 로드 함수
function loadUserProfiles() {
    const savedProfiles = localStorage.getItem('userProfiles');
    if (savedProfiles) {
        const profiles = JSON.parse(savedProfiles);
        
        profiles.forEach(profile => {
            const user = validUsers.find(u => u.username === profile.username);
            if (user) {
                user.profileUrl = profile.profileUrl || '';
            }
        });
    }
}

// 프로필 영역 클릭 이벤트 설정
function setupProfileArea() {
    const profileArea = document.querySelector('.profile-area');
    if (profileArea) {
        profileArea.addEventListener('click', updateProfilePicture);
    }
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 사용자 프로필 정보 로드
    loadUserProfiles();
    
    // Check login status first
    checkLoginStatus();
    
    // Set max date for date input
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
    
    // 버튼 애니메이션 적용
    applyButtonAnimations();
    
    // 프로필 사진 클릭 이벤트 설정
    if (profilePicture) {
        profilePicture.addEventListener('click', updateProfilePicture);
    }
    
    // 프로필 영역 클릭 이벤트 설정
    setupProfileArea();
    
    // PWA 서비스 워커 등록
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('서비스 워커 등록 성공:', registration.scope);
                })
                .catch(error => {
                    console.log('서비스 워커 등록 실패:', error);
                });
        });
    }
});

// 댓글 시간 포맷팅 함수
function formatCommentTime(timestamp) {
    const commentDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    // 언어별 번역 함수
    function getTimeText(value, unit) {
        if (currentLanguage === 'fr') {
            return `${translations.fr.ago} ${value} ${translations.fr[unit]}`;
        } else {
            return `${value}${translations.ko[unit]} ${translations.ko.ago}`;
        }
    }
    
    if (diffInSeconds < 60) {
        return translations[currentLanguage].justNow;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        const unit = minutes === 1 ? 'minute' : 'minutes';
        return getTimeText(minutes, unit);
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        const unit = hours === 1 ? 'hour' : 'hours';
        return getTimeText(hours, unit);
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        const unit = days === 1 ? 'day' : 'days';
        return getTimeText(days, unit);
    }
}

// 댓글 로드 및 표시 함수
function loadComments(memory) {
    const commentsContainer = document.getElementById('modalComments');
    
    if (!commentsContainer) {
        console.error('Comments container not found');
        return;
    }
    
    // 기존 댓글 컨테이너 내용 초기화
    commentsContainer.innerHTML = '';
    
    // 댓글 섹션 헤더 추가
    const commentsHeader = document.createElement('h3');
    commentsHeader.className = 'comments-header';
    commentsHeader.innerHTML = `<span class="comments-icon">💬</span> ${translations[currentLanguage].comments}`;
    commentsContainer.appendChild(commentsHeader);
    
    // 댓글 입력 폼 추가
    const commentForm = document.createElement('div');
    commentForm.className = 'comment-form';
    commentForm.innerHTML = `
        <div class="comment-input-container">
            <textarea id="commentInput" placeholder="${translations[currentLanguage].commentPlaceholder}" rows="2"></textarea>
            <button id="postCommentBtn" class="action-button comment-button">${translations[currentLanguage].postComment}</button>
        </div>
    `;
    commentsContainer.appendChild(commentForm);
    
    // 댓글 이벤트 리스너 추가
    setTimeout(() => {
        document.getElementById('postCommentBtn').addEventListener('click', () => {
            const commentText = document.getElementById('commentInput').value.trim();
            if (commentText) {
                addComment(memory.id, commentText);
            }
        });
    }, 0);
    
    // 댓글 목록 컨테이너 생성
    const commentsList = document.createElement('div');
    commentsList.className = 'comments-list';
    commentsContainer.appendChild(commentsList);
    
    // 댓글이 없는 경우
    if (!memory.comments || memory.comments.length === 0) {
        const noComments = document.createElement('p');
        noComments.className = 'no-comments';
        noComments.textContent = translations[currentLanguage].noComments;
        commentsList.appendChild(noComments);
        return;
    }
    
    // 댓글 정렬 (최신순)
    const sortedComments = [...memory.comments].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    // 각 댓글 추가
    sortedComments.forEach(comment => {
        const commentElement = createCommentElement(comment, memory.id);
        commentsList.appendChild(commentElement);
    });
}

// 댓글 요소 생성 함수
function createCommentElement(comment, memoryId) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.dataset.commentId = comment.id;
    
    // 댓글 작성자가 현재 로그인한 사용자인지 확인
    const isCurrentUser = currentUser && currentUser.nickname === comment.username;
    
    // 댓글 내용 채우기
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">
                ${comment.profileUrl ? `<img src="${comment.profileUrl}" alt="${comment.username}" class="comment-profile-pic">` : 
                `<div class="comment-profile-placeholder">${comment.username.charAt(0)}</div>`}
                <span class="comment-username">${escapeHTML(comment.username)}</span>
            </div>
            <div class="comment-time">${formatCommentTime(comment.timestamp)}</div>
        </div>
        <div class="comment-text">${escapeHTML(comment.text)}</div>
        ${isCurrentUser ? `<div class="comment-actions">
            <button class="delete-comment-btn" data-comment-id="${comment.id}">${translations[currentLanguage].deleteComment}</button>
        </div>` : ''}
    `;
    
    // 삭제 버튼에 이벤트 리스너 추가
    setTimeout(() => {
        const deleteBtn = commentElement.querySelector('.delete-comment-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm(translations[currentLanguage].confirmDeleteComment)) {
                    deleteComment(memoryId, comment.id);
                }
            });
        }
    }, 0);
    
    return commentElement;
}

// 댓글 추가 함수
function addComment(memoryId, commentText) {
    if (!currentUser) return;
    
    const memories = loadMemories();
    const memory = memories.find(m => m.id === memoryId);
    
    if (!memory) return;
    
    // 댓글 배열이 없으면 생성
    if (!memory.comments) {
        memory.comments = [];
    }
    
    // 새 댓글 객체 생성
    const newComment = {
        id: Date.now(),
        username: currentUser.nickname,
        text: commentText,
        timestamp: new Date().toISOString(),
        profileUrl: currentUser.profileUrl || ''
    };
    
    // 댓글 추가
    memory.comments.push(newComment);
    
    // 메모리 저장
    saveMemories(memories);
    
    // UI 업데이트
    document.getElementById('commentInput').value = '';
    
    // 댓글 목록 새로고침
    loadComments(memory);
}

// 댓글 삭제 함수
function deleteComment(memoryId, commentId) {
    const memories = loadMemories();
    const memory = memories.find(m => m.id === memoryId);
    
    if (!memory || !memory.comments) return;
    
    // 댓글 찾아서 삭제
    memory.comments = memory.comments.filter(c => c.id !== commentId);
    
    // 메모리 저장
    saveMemories(memories);
    
    // 댓글 목록 새로고침
    loadComments(memory);
}

// 이벤트 위임을 사용한 갤러리 클릭 처리
galleryContainer.addEventListener('click', (event) => {
    const memoryCard = event.target.closest('.memory-card');
    if (memoryCard && memoryCard.dataset.action === 'openModal') {
        const memoryId = parseInt(memoryCard.dataset.memoryId);
        const memories = loadMemories();
        const memory = memories.find(m => m.id === memoryId);
        if (memory) {
            openMemoryModal(memory);
        }
    }
});

// Load image preview (최적화된 버전)
function loadImagePreview(imageUrl) {
    if (!imageUrl) {
        imagePreview.classList.add('hidden');
        return;
    }

    imagePreview.classList.add('hidden');
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = translations[currentLanguage].imagePreviewLoading;
    loadingMessage.className = 'loading-message';
    imagePreview.parentNode.appendChild(loadingMessage);

    // 이미지 URL 최적화
    const optimizedImageUrl = optimizeImageUrl(imageUrl);
    
    // 디바운스 처리로 연속 호출 방지
    clearTimeout(imagePreview.loadTimer);
    imagePreview.loadTimer = setTimeout(() => {
        const tempImage = new Image();
        tempImage.onload = function() {
            imagePreview.src = optimizedImageUrl;
            imagePreview.classList.remove('hidden');
            if (loadingMessage.parentNode) {
                loadingMessage.parentNode.removeChild(loadingMessage);
            }
        };
        
        tempImage.onerror = function() {
            if (loadingMessage.parentNode) {
                loadingMessage.textContent = translations[currentLanguage].imagePreviewError;
            }
            setTimeout(() => {
                if (loadingMessage.parentNode) {
                    loadingMessage.parentNode.removeChild(loadingMessage);
                }
            }, 3000);
        };
        
        tempImage.src = optimizedImageUrl;
    }, 300);
} 