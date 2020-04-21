import { generateAlphabetArray, shuffleArray } from "./utils.js";

export const memory = (() => {
    'use strict';

    const CARD_ACTIVE_CLASS = 'active';
    const CARD_FOUND_CLASS = 'found'

    let gridSize = 6;
    let defaultCardSymbol = '?';
    let memoryTable;
    let selectedCard;
    let letterGrid = [];

    function initializeTable(letters) {
        for (let y = 0; y < gridSize; y++) {
            letterGrid[y] = [];
            let row = document.createElement('tr');

            for (let x = 0; x < gridSize; x++) {
                let letter = letters.pop();
                letterGrid[y][x] = letter;

                let col = document.createElement('td');
                col.innerText = defaultCardSymbol;
                row.appendChild(col);
            }
            
            memoryTable.appendChild(row);
        }
    }

    function onCardSelected() {
        showCardLetter(this);

        if (selectedCard) {
            if (!cardsAreSame(this, selectedCard)) {
                if (cardsMatch(this, selectedCard)) {
                    this.classList.add(CARD_FOUND_CLASS);
                    selectedCard.classList.add(CARD_FOUND_CLASS);
                }
                
                this.classList.remove(CARD_ACTIVE_CLASS);
                selectedCard.classList.remove(CARD_ACTIVE_CLASS);
            }

            selectedCard = null;
        } else {
            selectedCard = this;
        }

        this.classList.add(CARD_ACTIVE_CLASS);
    }

    function showCardLetter(card) {
        const letter = letterGrid[card.parentElement.rowIndex][card.cellIndex];
        card.innerText = letter;
    }

    function cardsAreSame(card, otherCard) {
        return card.parentElement.rowIndex == otherCard.parentElement.rowIndex && card.cellIndex == otherCard.cellIndex;
    }

    function cardsMatch(card, otherCard) {
        return letterGrid[card.parentElement.rowIndex][card.cellIndex] == letterGrid[otherCard.parentElement.rowIndex][otherCard.cellIndex];
    }

    function getLetters() {
        let letters = generateAlphabetArray(gridSize * gridSize / 2);
        letters = letters.concat(letters);
        return shuffleArray(letters);
    }

    return {
        initialize: (selector) => {
            memoryTable = document.querySelector(selector);
            initializeTable(getLetters());
            
            const cardElements = document.querySelectorAll(selector + ' td');
            for (let cardElement of cardElements) {
                cardElement.addEventListener('click', onCardSelected);
            }
        }
    };
})();