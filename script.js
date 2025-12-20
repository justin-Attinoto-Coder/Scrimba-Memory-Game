// Memory Game Logic

// Constants
const MATCH_ANIMATION_DELAY = 500; // ms
const FLIP_BACK_DELAY = 1000; // ms
const WIN_DELAY = 500; // ms

// Game state
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameStarted = false;
let timerInterval = null;
let seconds = 0;

// Card gradient patterns (8 unique gradients, each will be used twice)
const gradients = [
    { name: 'Sunset', gradient: 'linear-gradient(to bottom right, #fb923c, #db2777)', emoji: '🌅' },
    { name: 'Ocean', gradient: 'linear-gradient(to bottom right, #22d3ee, #2563eb)', emoji: '🌊' },
    { name: 'Forest', gradient: 'linear-gradient(to bottom right, #4ade80, #059669)', emoji: '🌲' },
    { name: 'Fire', gradient: 'linear-gradient(to bottom right, #f87171, #ea580c)', emoji: '🔥' },
    { name: 'Galaxy', gradient: 'linear-gradient(to bottom right, #c084fc, #db2777)', emoji: '🌌' },
    { name: 'Lemon', gradient: 'linear-gradient(to bottom right, #facc15, #f97316)', emoji: '🍋' },
    { name: 'Berry', gradient: 'linear-gradient(to bottom right, #f9a8d4, #e11d48)', emoji: '🍓' },
    { name: 'Mint', gradient: 'linear-gradient(to bottom right, #2dd4bf, #06b6d4)', emoji: '🍃' }
];

// Initialize the game
function initGame() {
    // Reset game state
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    gameStarted = false;
    flippedCards = [];
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Update display
    updateStats();
    
    // Create card pairs
    cards = [...gradients, ...gradients].map((gradient, index) => ({
        id: index,
        gradient: gradient,
        matched: false
    }));
    
    // Shuffle cards
    shuffleArray(cards);
    
    // Render cards
    renderCards();
    
    // Hide win modal
    document.getElementById('win-modal').classList.add('hidden');
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Render cards on the board
function renderCards() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        board.appendChild(cardElement);
    });
}

// Create a card element
function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.index = index;
    
    cardDiv.innerHTML = `
        <div class="card-inner h-full">
            <div class="card-front">
                <span class="text-4xl">❓</span>
            </div>
            <div class="card-back" style="background: ${card.gradient.gradient};">
                <span class="text-4xl">${card.gradient.emoji}</span>
            </div>
        </div>
    `;
    
    cardDiv.addEventListener('click', () => handleCardClick(index));
    
    return cardDiv;
}

// Handle card click
function handleCardClick(index) {
    const card = cards[index];
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    
    // Start timer on first click
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    // Ignore if card is already flipped or matched
    if (cardElement.classList.contains('flipped') || card.matched) {
        return;
    }
    
    // Ignore if two cards are already flipped
    if (flippedCards.length >= 2) {
        return;
    }
    
    // Flip the card
    cardElement.classList.add('flipped');
    flippedCards.push({ index, card, element: cardElement });
    
    // Check for match if two cards are flipped
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        checkMatch();
    }
}

// Check if flipped cards match
function checkMatch() {
    const [first, second] = flippedCards;
    
    if (first.card.gradient.name === second.card.gradient.name) {
        // Match found!
        setTimeout(() => {
            first.card.matched = true;
            second.card.matched = true;
            first.element.classList.add('matched');
            second.element.classList.add('matched');
            matchedPairs++;
            updateStats();
            flippedCards = [];
            
            // Check if game is won
            if (matchedPairs === gradients.length) {
                setTimeout(() => {
                    winGame();
                }, WIN_DELAY);
            }
        }, MATCH_ANIMATION_DELAY);
    } else {
        // No match - flip cards back
        setTimeout(() => {
            first.element.classList.remove('flipped');
            second.element.classList.remove('flipped');
            flippedCards = [];
        }, FLIP_BACK_DELAY);
    }
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        updateStats();
    }, 1000);
}

// Update stats display
function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matchedPairs;
    
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer').textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Win game
function winGame() {
    // Stop timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Show win modal
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('final-moves').textContent = moves;
    document.getElementById('final-time').textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('win-modal').classList.remove('hidden');
}

// Event listeners
document.getElementById('reset-btn').addEventListener('click', initGame);
document.getElementById('play-again-btn').addEventListener('click', initGame);

// Initialize game on load
initGame();
