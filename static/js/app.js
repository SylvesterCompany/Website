import { startGame } from "../../game/main.js";

/**
 * Generates the copyright including the current year as well as the authors in a random order
 */
function generateCopyright(authors) {
    const year = (new Date()).getFullYear();
    const textElement = document.getElementById("copyright");
    const authorAmount = authors.length;

    textElement.innerHTML = "Copyright &copy " + year + " - ";

    // Adds the names
    for (let i = 0; i < authorAmount; i++) {
        const randomAuthor = authors.splice(Math.round(Math.random() * (authors.length - 1)), 1);
        textElement.innerHTML += randomAuthor;

        if (i === authorAmount - 2) { // Second to last iteration
            textElement.innerHTML += " et ";
        } else if (i < authorAmount - 1) {
            textElement.innerHTML += ", ";
        }
    }
}

function switchToGame() {
    const titleContainer = document.getElementById("title-container");
    const gameContainer = document.getElementById("game-container");

    titleContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    // TODO: Start game
    startGame();
}

// Main program

const authors = ["Simon Breil", "Vincent Cohadon", "Loukas Changeux", "Alonso Quispe"];
const playBtn = document.getElementById("play-btn");

generateCopyright(authors);

playBtn.addEventListener("click", switchToGame);