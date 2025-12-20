// Memory Game Logic

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
    { name: 'Sunset', classes: 'bg-gradient-to-br from-orange-400 to-pink-600', emoji: '🌅' },
    { name: 'Ocean', classes: 'bg-gradient-to-br from-cyan-400 to-blue-600', emoji: '🌊' },
    { name: 'Forest', classes: 'bg-gradient-to-br from-green-400 to-emerald-600', emoji: '🌲' },
    { name: 'Fire', classes: 'bg-gradient-to-br from-red-400 to-orange-600', emoji: '🔥' },
    { name: 'Galaxy', classes: 'bg-gradient-to-br from-purple-400 to-pink-600', emoji: '🌌' },
    { name: 'Lemon', classes: 'bg-gradient-to-br from-yellow-400 to-orange-500', emoji: '🍋' },
    { name: 'Berry', classes: 'bg-gradient-to-br from-pink-400 to-rose-600', emoji: '🍓' },
    { name: 'Mint', classes: 'bg-gradient-to-br from-teal-400 to-cyan-600', emoji: '🍃' }
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
    cardDiv.className = 'card aspect-square';
    cardDiv.dataset.index = index;
    
    cardDiv.innerHTML = `
        <div class="card-inner h-full">
            <div class="card-front bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg">
                <span class="text-4xl">❓</span>
            </div>
            <div class="card-back ${card.gradient.classes} shadow-lg">
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
                }, 500);
            }
        }, 500);
    } else {
        // No match - flip cards back
        setTimeout(() => {
            first.element.classList.remove('flipped');
            second.element.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
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
