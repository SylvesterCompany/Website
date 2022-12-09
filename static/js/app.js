function switchToCanvas() {
    const titleContainer = document.getElementById("title-container");
    const gameContainer = document.getElementById("game-container");

    titleContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
}

// Main program
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", switchToCanvas);