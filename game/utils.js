const CHAR_LIMIT = 100;
const ENTER_KEY = "Enter";
export const handler = new Phaser.Events.EventEmitter();


export function getZoomFactor(canvasHeight) {
    const zoomFactor = Math.floor(window.innerHeight / canvasHeight);

    return zoomFactor || 1;
}

export function onClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target)) {
            handler.emit('clickedoutside');
            removeClickListener();
        }
    }
    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }
    document.addEventListener('click', outsideClickListener);
}

export function openArchive(archive, callback=null) {
    const archiveElement = document.getElementById("archive");
    const archiveTitle = archiveElement.querySelector("h3");
    const archiveParagraph = archiveElement.querySelector("p");
    const archiveSpan = archiveElement.querySelector("span");

    archiveTitle.innerText = archive.title;
    archiveParagraph.innerText = archive.content;
    archiveSpan.innerText = `ARCHIVE #${archive.id}`;

    archiveElement.classList.add("open");

    document.addEventListener("keypress", e => {
        if (e.key === ENTER_KEY) {
            archiveElement.classList.remove("open"); // Closes the dialog box
            callback && callback(); // Invokes the callback function
        }
    }, {once: true});
}

export function openDialog({ text }, callback=null) {
    const chatBox = document.getElementById("chatbox");
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

function _updateText(text) {
    const textSpan = document.querySelector("#chatbox span");
    textSpan.innerHTML = text;
}