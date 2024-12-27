const cards = document.querySelectorAll('.card');
const confettiContainer = document.getElementById('confetti-container');
const playAgainBtn = document.getElementById('play-again');
const congratulations = document.getElementById('congratulations');

playAgainBtn.addEventListener('click', () => window.location.reload());

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = 8;

// Add an event listener to each card
cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

// Shuffle cards at the start
shuffle();

function flipCard() {
    // Prevent flipping more cards if the board is locked or the same card is clicked
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

    this.classList.add('flipped'); // Flip the card
    console.log(`Flipped card: ${this.dataset.image}`);
    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Second card flipped
        secondCard = this;
        checkForMatch(); // Check for a match
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Lock matched cards and increment match counter
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchesFound++;

    // Show confetti if all matches are found
    if (matchesFound === totalPairs) showConfetti();

    resetBoard();
}

function unflipCards() {
    lockBoard = true; // Temporarily lock the board
    setTimeout(() => {
        // Unflip cards
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    // Reset board state
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    // Shuffle cards by assigning a random order
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

function startConfetti() {
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random properties
        const confettiColors = ['#FFC107', '#2196F3', '#FF5722', '#4CAF50', '#E91E63'];
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation ends
        confetti.addEventListener('animationend', () => confetti.remove());
    }

    // Generate confetti pieces
    for (let i = 0; i < 100; i++) {
        createConfettiPiece();
    }
}

function showConfetti() {
    startConfetti(); // Start confetti animation
    playAgainBtn.style.display = 'block'; // Show play again button
    congratulations.style.display = 'block'; // Show congratulations message
}
