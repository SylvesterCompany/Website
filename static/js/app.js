import { startGame } from "/game/main.js";

function switchToGame() {
    const titleContainer = document.getElementById("title-container");
    const gameContainer = document.getElementById("game-container");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const overlay = document.getElementById("overlay");

    // Changes the elements and dim the background

    titleContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    header.classList.add("hidden");
    footer.classList.add("hidden");
    overlay.classList.add("dim");
}

// Main program

const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", () => {
    switchToGame();
    startGame();
});

// TODO: Delete after development phase

switchToGame();
startGame();

import openDialog from "/game/utils/openDialog.js";

openDialog({
    text: "Bonjour les amis, j'espère que vous allez bien ! Aujourd'hui, " +
        "je vais vous raconter l'histoire d'un gars qui fait de la programmation à 4 heures du matin, " +
        "alors qu'il devrait logiquement aller dormir, " +
        "car il va devoir continuer son projet. Qu'en pensez-vous ?"
}, () => {
    // setTimeout(() => {
    //     openDialog({
    //         text: "Allez, salut !"
    //     });
    // }, 1000);
});