const ENTER_KEY = "Enter";

export default function openArchive(archive, callback=null) {
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