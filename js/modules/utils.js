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