/**
 * Generates an ordered array containing the letters of the alphabet
 * 
 * @param {int} length length of generated array
 */
export function generateAlphabetArray(length) {
    const grid = [];
    const letterOffset = 10;

    for (let i = letterOffset; i < length + letterOffset; i++) {
        grid.push(i.toString(36));
    }

    return grid;
}

/**
 * Shuffles an array using the Fisher-Yates shuffle algorithm
 * 
 * @param {Array} array to be shuffled array
 */
export function shuffleArray(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

/**
 * Toggles an css class on a given element
 * 
 * @param {HTMLElement} element element to toggle class on
 * @param {String} cssClass css to class to toggle
 */
export function toggleClass(element, cssClass) {
    if (element.classList.contains(cssClass)) {
        element.classList.remove(cssClass);
    } else {
        element.classList.add(cssClass);
    }
}

/**
 * Sets the page's primary and secondary colors
 * 
 * @param {String} primaryColor primary page color
 * @param {String} secondaryColor secondary page color
 */
export function setPageColors(primaryColor, secondaryColor) {
    document.querySelector("body").style.color = primaryColor;
    document.querySelector("body").style.borderColor = primaryColor;
    document.querySelector("body").style.backgroundColor = secondaryColor;

    for (let element of document.querySelectorAll(".dynamic-color")) {
        element.style.color = primaryColor;
        element.style.borderColor = primaryColor;
    }

    let style = document.querySelector("#custom-color-sheet");
    let css = "#memory td.active { background-color: " + primaryColor + "; color: " + secondaryColor + " }";

    if (!style) {
        style = document.createElement("style");
        style.id = "custom-color-sheet";
        document.head.appendChild(style);
    } else {
        style.innerHTML = '';
    }

    style.appendChild(document.createTextNode(css));
}