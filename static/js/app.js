import { startGame } from "/game/main.js";

const titleContainer = document.getElementById("title-container");
const gameContainer = document.getElementById("game-container");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const overlay = document.getElementById("overlay");

function switchToGame() {
    // Changes the elements and dim the background

    titleContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    header.classList.add("hidden");
    footer.classList.add("hidden");
    overlay.classList.add("dim");
}

function hideGame() {
    titleContainer.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    header.classList.remove("hidden");
    footer.classList.remove("hidden");
    overlay.classList.remove("dim");
}

function loadFont(name, url) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont.load().then((loaded) => {
        document.fonts.add(loaded);
    }).catch((error) => {
        return error;
    });
}

// Main program

const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    switchToGame();
    startGame(hideGame);
});

// TODO: Delete after development phase
loadFont('Pixel', '/static/fonts/Pixel.ttf');

//switchToGame();
//startGame(hideGame);