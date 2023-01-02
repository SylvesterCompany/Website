const CHAR_LIMIT = 100;
const ENTER_KEY = "Enter";

const chatBox = document.getElementById("chatbox");
const textSpan = document.querySelector("#chatbox span");

function _updateText(text) {
    textSpan.innerHTML = text;
}

export default function openDialog({ text }, callback=null) {
    chatBox.classList.add("open"); // Opens the dialog box

    // Splits the text into chunks of 100 characters each

    let textChunks = [];
    for (let i = 0; i < text.length; i += CHAR_LIMIT) {
        textChunks = [...textChunks, text.substring(i, i + CHAR_LIMIT)];
    }

    // Dialog loop

    let i = 0;

    _updateText(textChunks[i]);

    document.addEventListener("keypress", e => {
        if (e.key === ENTER_KEY) {
            if (i < textChunks.length - 1) {
                _updateText(textChunks[++i]);
            } else {
                chatBox.classList.remove("open"); // Closes the dialog box
                callback && callback(); // Invokes the callback function
            }
        }
    }, {once: true});
}