import { generateAlphabetArray, shuffleArray } from "./utils.js";

export class Memory {
    CARD_HIDE_DELAY = 3000;

    tableElement;
    gridSize;
    cardGrid = [];
    selectedCard;
    
    constructor(tableElement, gridSize) {
        this.tableElement = tableElement;
        this.gridSize = gridSize;

        const letters = this.generateLetterList();
        this.createCardGrid(letters);
    }

    generateLetterList() {
        let letters = generateAlphabetArray(this.gridSize * this.gridSize / 2);
        letters = letters.concat(letters);
        return shuffleArray(letters);
    }

    createCardGrid(letters) {
        for (let y = 0; y < this.gridSize; y++) {
            this.cardGrid[y] = [];
            let row = document.createElement('tr');

            for (let x = 0; x < this.gridSize; x++) {
                let card = new Card(document.createElement('td'), letters.pop());
                card.addClickHandler(this.onCardClicked.bind(this));
                this.cardGrid[y][x] = card;
                row.appendChild(card.getElement());
            }

            this.tableElement.appendChild(row);
        }
    }

    onCardClicked(card) {
        if (!card.isFound()) {
            if (this.selectedCard) {
                if (this.selectedCard != card) {
                    card.show();
    
                    if (this.selectedCard.isEqual(card)) {
                        // Cards match
                        this.selectedCard.markFound();
                        card.markFound();
                    } else {
                        this.selectedCard.hide(this.CARD_HIDE_DELAY);
                        card.hide(this.CARD_HIDE_DELAY);
                    }
    
                    this.selectedCard = null;
                }
            } else {
                card.show();
                this.selectedCard = card;
            }

            if (this.hasWon()) {
                console.log("Congratulations. You played yourself.");
            }
        }
    }

    hasWon() {
        for (let row of this.cardGrid) {
            for (let card of row) {
                if (!card.isFound()) {
                    return false;
                }
            }
        }

        return true;
    }
}

export class Card {
    CARD_ACTIVE_CLASS = 'active';
    CARD_FOUND_CLASS = 'found';

    found = false;
    defaultLetter = '?';
    cardElement;
    letter;

    constructor(cardElement, letter) {
        this.cardElement = cardElement;
        this.letter = letter;
        this.hide();
    }

    show() {
        this.cardElement.classList.add(this.CARD_ACTIVE_CLASS);
        this.cardElement.innerText = this.letter;
    }

    hide(delayTime = 0) {
        setTimeout(() => {
            this.cardElement.classList.remove(this.CARD_ACTIVE_CLASS);
            this.cardElement.innerText = this.defaultLetter;
        }, delayTime);
    }

    markFound() {
        this.hide();
        this.cardElement.classList.add(this.CARD_FOUND_CLASS);
        this.found = true;
    }

    addClickHandler(eventHandler) {
        this.cardElement.addEventListener('click', () => {
            eventHandler(this);
        });
    }

    isEqual(card) {
        return card.getLetter() == this.getLetter();
    }

    isFound() {
        return this.found;
    }

    getElement() {
        return this.cardElement;
    }

    getLetter() {
        return this.letter;
    }
}