const CHAR_LIMIT = 100;

const chatBox = document.getElementById("chatbox");
const textSpan = document.querySelector("#chatbox span");

export default function openDialog({ text }, callback) {
    chatBox.classList.add("open"); // Opens the chat box

    // Splits the text into chunks of 100 characters each


    callback();
}