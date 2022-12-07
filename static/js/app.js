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

const authors = ["Simon Breil", "Vincent Cohadon", "Loukas Changeux", "Alonso Quispe"];

generateCopyright(authors);