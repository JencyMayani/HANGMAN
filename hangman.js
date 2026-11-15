let POSSIBLE_WORDS = [
    "obdurate",
    "verisimilitude",
    "defenestrate",
    "obsequious",
    "dissonant",
    "today",
    "idempotent"
];

let guesses = "";
let word = "";
let MAX_GUESSES = 6;
let guessCount = MAX_GUESSES;

let gameStarted = false;
let gameFinished = false;
let message = "";

function newgame() {
    guesses = "";
    guessCount = MAX_GUESSES;

    let randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];

    gameStarted = true;
    gameFinished = false;
    message = "";

    document.getElementById("guess").value = "";

    updatescreen();
}

function guess() {
    let input = document.getElementById("guess");
    let letter = input.value.trim().toLowerCase();
    let guessArea = document.getElementById("guesses");

    // Clear the input field
    input.value = "";

    // Check if a word has been selected
    if (!gameStarted) {
        message = "Please start a new game first!";
        updatescreen();
        return;
    }

    // Check if the game has already ended
    if (gameFinished) {
        return;
    }

    // Check if the input is one letter
    if (!/^[a-z]$/.test(letter)) {
        message = "Please enter one letter.";
        updatescreen();
        return;
    }

    // Prevent guessing the same letter twice
    if (guesses.includes(letter)) {
        message = "You already guessed that letter!";
        updatescreen();
        return;
    }

    // Add the letter to guessed letters
    guesses += letter;

    // Check if the letter is in the word
    if (!word.includes(letter)) {
        guessCount--;
    }

    // Check if the player has won
    let won = true;

    for (let i = 0; i < word.length; i++) {
        if (!guesses.includes(word.charAt(i))) {
            won = false;
        }
    }

    if (won) {
        gameFinished = true;
        message = "Congratulations! You won!";
    }

    // Check if the player has lost
    else if (guessCount === 0) {
        gameFinished = true;
        message = "Game Over! The word was: " + word;
    }

    updatescreen();
}

function updatescreen() {
    let clueString = "";

    for (let i = 0; i < word.length; i++) {
        let letter = word.charAt(i);

        if (guesses.includes(letter)) {
            clueString += letter + " ";
        } else {
            clueString += "_ ";
        }
    }

    document.getElementById("clue").textContent = clueString;

    let guessArea = document.getElementById("guesses");

    guessArea.textContent = "Guessed Letters: " + guesses;

    if (message !== "") {
        guessArea.textContent += "\n" + message;
    }
}

