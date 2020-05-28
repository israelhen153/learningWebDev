import {levels,words,mode} from "./JS/defenitions.js";
import {get_image} from "./JS/imageToWordMod.js";

//Global Var's
let time = levels.low;
let score = 0;
let isPlaying;
let pause;
let timers = [];
let gameMode = mode.default;
let ImageWord = NaN;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#time');
const startButton = document.querySelector('#start');
const restartButton = document.querySelector('#reset');
const pauseButton = document.querySelector('#pause');
const diffButton = document.querySelector('#difficulty');
const imageButton = document.querySelector('#Imager');

// Create besic env and start the game
function init() {
    showWord(words);
    timers[0] = setInterval(countdown, 1000);
    wordInput.addEventListener('input', startMatch); // Start matching on word input
    timers[1] = setInterval(checkStatus, 15); // Check the state of the game
    seconds.innerHTML = time;
}

// Start the game
function startMatch() {
    if (matchWord()) {
        isPlaying = true;
        time = levels[diffButton.options[diffButton.selectedIndex].value];
        showWord(words);
        wordInput.value = "";
        score++;
    }

    if (score === -1) scoreDisplay.innerHTML = 0;
    scoreDisplay.innerHTML = score;
}

// Match the word in the input box with the displaied word
function matchWord() {
    switch (gameMode) {
        case mode.image:
            if (wordInput.value === ImageWord) {
                message.innerHTML = "CORRECT!!!";
                return true;
            } else {                
                message.innerHTML = "";
                return false;
            }   
        default:
            if (wordInput.value === currentWord.innerHTML) {
                message.innerHTML = "CORRECT!!!";
                return true;
            } else {
                message.innerHTML = "";
                return false;
            }
    }
}

// Show a random word
function showWord(words) {
    switch (gameMode) {
        case mode.image:
            imageTest();
            break;    
        default:
            let wordIndex = Math.floor(Math.random() * words.length); 
            currentWord.innerHTML = words[wordIndex];
            break;
    }
}

// Decrise the counter
function countdown() {
    //Make sure time is not run out
    if (!pause) {
        if (time > 0) { 
            time--; 
        } else if (time === 0) {
            isPlaying = false;
        }
    }

    timeDisplay.innerHTML = time;
}

// check how the user fares
function checkStatus() {
    if (!isPlaying && time == 0) {
        message.innerHTML = "Game Over Try again";
        wordInput.value = "";
        score = 0;
        scoreDisplay.innerHTML = score;
    }
}

function resetGame() {
    // Clear the old settings while setting the new ones
    for (let i in timers) {    
        window.clearInterval(timers[i]); 
    }
    pause = false;
    message.innerHTML = ""; 
    scoreDisplay.innerHTML = 0;
    timeDisplay.innerHTML = 0;
    pauseButton.innerHTML = pause ? "Unpause":"pause";
}

// Type Game
function modeChange(targetMode) {
    let hide_div = NaN;
    let displayDiv = NaN;

    switch (targetMode) {
        case mode.image: // Setup the image Game mode          
            let currentImage = get_image();
            ImageWord = currentImage.src.substr(currentImage.src.lastIndexOf("/"));                   
            hide_div = document.getElementById('current-word');
            hide_div.style.display = "None";
            displayDiv = document.getElementById('ImageDiv');
            displayDiv.textContent = "";
            displayDiv.append(currentImage);
            break;
    
        default: // Return to the regular word type mode
            hide_div = document.getElementById('ImageDiv');
            hide_div.textContent = "";
            displayDiv = document.getElementById('current-word');
            displayDiv.style.display = "block";
            break;
    } 
}

// Image Test mode
function imageTest(){
    let currentImage = get_image();
    ImageWord = currentImage.src.substr(currentImage.src.lastIndexOf("/"))
                                .replace("/", "").replace(".jpg","");
    var image_div = document.getElementById('ImageDiv');
    image_div.textContent = "";
    image_div.append(currentImage);
}

// set's listeners on the buttons
function setListeners() {
    startButton.addEventListener("click", () => { 
        time = levels[diffButton.options[diffButton.selectedIndex].value];
        pause = false;
        init();
    });
    pauseButton.addEventListener("click", () => { 
        pause = pause ? false: true; 
        pauseButton.innerHTML = pause ? "Unpause":"pause";
    });
    restartButton.addEventListener("click", () => { resetGame(); });
    diffButton.addEventListener("click", event => {
        time = levels[diffButton.options[diffButton.selectedIndex].value];
    });
    imageButton.addEventListener('click', e => {
        if (imageButton.innerHTML === "Image Test") {
            gameMode = mode.image;
            console.log("Change To Image");
            modeChange(mode.image);
        }else {
            gameMode = mode.default;
            modeChange(mode.default);
        }

        imageButton.innerHTML = gameMode === mode.image ? "Word Test": "Image Test";
    });
}

setListeners();