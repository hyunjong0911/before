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
const storyInput = document.getElementById('story');

// Language selector elements
const langKoButton = document.getElementById('langKo');
const langFrButton = document.getElementById('langFr');

// Global variable to keep track of currently viewed memory
let currentMemoryId = null;
let currentLanguage = 'ko'; // Default language

// Translation dictionary
const translations = {
    ko: {
        title: "우리의 추억 앨범",
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
        noMemories: "아직 추억이 없습니다. \"추가하기\" 버튼을 눌러 첫 추억을 기록해보세요!"
    },
    fr: {
        title: "Notre Album de Souvenirs",
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
        noMemories: "Il n'y a pas encore de souvenirs. Cliquez sur \"Ajouter\" pour créer votre premier souvenir !"
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
        story: "올해 봄, 남산공원에서 함께 봤던 벚꽃이 정말 예뻤어요. 분홍빛 꽃잎이 하늘을 수놓고, 우리는 그 아래서 소풍을 즐겼죠. 피크닉 매트 위에 앉아 이야기를 나누며 보낸 그 시간이 특별했어요. 내년 봄에도 꼭 다시 와보자고 약속했던 날이에요.",
        title_fr: "Festival des cerisiers en fleurs",
        location_fr: "Séoul, Parc de Namsan",
        story_fr: "Ce printemps, les cerisiers en fleurs que nous avons vus ensemble au parc de Namsan étaient vraiment magnifiques. Les pétales roses ornaient le ciel, et nous avons profité d'un pique-nique en dessous. Ce moment passé assis sur la couverture de pique-nique à discuter était spécial. C'est le jour où nous avons promis de revenir au printemps prochain."
    },
    {
        id: 2,
        title: "바닷가 일몰",
        date: "2023-07-22",
        location: "부산, 해운대 해변",
        imageUrl: "https://images.unsplash.com/photo-1517627043994-d62c8b3f0895",
        story: "해운대 바다에서 본 일몰은 정말 환상적이었어요. 붉은 태양이 천천히 바다로 잠기는 모습을 함께 지켜보면서, 우리는 많은 이야기를 나눴어요. 파도 소리를 들으며 모래사장을 걷던 그 순간들이 아직도 생생해요. 시간이 멈춘 것 같은 느낌이었죠.",
        title_fr: "Coucher de soleil à la plage",
        location_fr: "Busan, Plage de Haeundae",
        story_fr: "Le coucher de soleil que nous avons vu à la plage de Haeundae était vraiment fantastique. En regardant le soleil rouge plonger lentement dans la mer, nous avons partagé de nombreuses histoires. Ces moments où nous marchions sur le sable en écoutant le bruit des vagues sont encore vivants dans ma mémoire. C'était comme si le temps s'était arrêté."
    },
    {
        id: 3,
        title: "몽글몽글 구름 산책",
        date: "2023-05-15",
        location: "서울, 하늘공원",
        imageUrl: "https://images.unsplash.com/photo-1530569673472-307dc017a82d",
        story: "하늘공원에 피어있는 코스모스 사이로 걸었던 날, 구름이 정말 예뻤어요. 마치 솜사탕 같은 구름들이 우리 위로 둥둥 떠다녔죠. 함께 하늘을 올려다보며 구름 모양을 맞추고 상상의 나래를 펼쳤던 그 날의 기분이 말랑말랑하게 떠올라요.",
        title_fr: "Promenade sous les nuages duveteux",
        location_fr: "Séoul, Parc du Ciel",
        story_fr: "Le jour où nous avons marché parmi les cosmos en fleurs au Parc du Ciel, les nuages étaient vraiment beaux. Des nuages comme des barbes à papa flottaient au-dessus de nous. Je me souviens encore de la sensation douce de cette journée où nous avons regardé le ciel ensemble, devinant les formes des nuages et laissant libre cours à notre imagination."
    }
];

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
}

// Update language button states
function updateLanguageButtons() {
    langKoButton.classList.toggle('active', currentLanguage === 'ko');
    langFrButton.classList.toggle('active', currentLanguage === 'fr');
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

// Generate memory cards in the gallery
function createMemoryCards() {
    const memories = loadMemories();
    galleryContainer.innerHTML = ''; // Clear gallery container
    
    if (memories.length === 0) {
        galleryContainer.innerHTML = `<p class="no-memories">${translations[currentLanguage].noMemories}</p>`;
        return;
    }
    
    memories.forEach(memory => {
        // Create memory card element
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.memoryId = memory.id;
        
        // Format display date
        const displayDate = formatDate(memory.date);
        
        // Use the appropriate title based on language
        const displayTitle = currentLanguage === 'fr' && memory.title_fr ? memory.title_fr : memory.title;
        
        // Create card content
        memoryCard.innerHTML = `
            <img class="memory-thumbnail" src="${memory.imageUrl}" alt="${displayTitle}">
            <div class="memory-info-preview">
                <h3 class="memory-title">${displayTitle}</h3>
                <p class="memory-date">${displayDate}</p>
            </div>
        `;
        
        // Add click event to show modal
        memoryCard.addEventListener('click', () => {
            openMemoryModal(memory);
        });
        
        // Append card to gallery
        galleryContainer.appendChild(memoryCard);
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
    modalStory.textContent = displayStory;
    
    // Show modal
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

// Close memory detail modal
function closeMemoryModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    currentMemoryId = null;
}

// Open edit memory modal with empty form (for adding)
function openAddMemoryModal() {
    // Reset form
    memoryForm.reset();
    memoryIdInput.value = '';
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    editModalTitle.textContent = translations[currentLanguage].addMemoryTitle;
    
    // Show modal
    editModalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Open edit memory modal with filled form (for editing)
function openEditMemoryModal(memoryId) {
    const memories = loadMemories();
    const memory = memories.find(m => m.id === memoryId);
    
    if (!memory) return;
    
    // Fill form with memory data
    memoryIdInput.value = memory.id;
    titleInput.value = memory.title;
    dateInput.value = memory.date;
    locationInput.value = memory.location;
    imageUrlInput.value = memory.imageUrl;
    storyInput.value = memory.story;
    
    editModalTitle.textContent = translations[currentLanguage].editMemoryTitle;
    
    // Show modal
    editModalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close edit memory modal
function closeEditModal() {
    editModalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
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

// Apply nice animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    loadLanguagePreference();
    createMemoryCards();
    
    // Set today's date as default for new memories
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
}); 