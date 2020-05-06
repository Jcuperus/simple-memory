import { generateAlphabetArray, shuffleArray } from "./utils.js";

export class Memory
{
    EVENT_START = 'start';
    EVENT_WIN = 'win';
    CARD_HIDE_DELAY = 3000;

    tableElement;
    gridSize;
    defaultLetter;
    cardGrid = [];
    selectedCard;
    shownCards = [];
    gameStarted = false;
    
    constructor(tableElement, gridSize, defaultLetter) {
        this.tableElement = tableElement;
        this.initialize(gridSize, defaultLetter);
    }

    initialize(gridSize, defaultLetter) {
        this.tableElement.innerHTML = '';
        this.gridSize = gridSize;
        this.defaultLetter = defaultLetter;

        const letters = this.generateLetterList();
        this.createCardGrid(letters);
        this.gameStarted = false;
    }

    restart() {
        this.initialize(this.gridSize, this.defaultLetter);
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
                let card = new Card(document.createElement('td'), letters.pop(), this.defaultLetter);
                card.registerClickHandler(this.onCardClicked.bind(this));
                this.cardGrid[y][x] = card;
                row.appendChild(card.getElement());
            }

            this.tableElement.appendChild(row);
        }
    }

    onCardClicked(card) {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.tableElement.dispatchEvent(new Event(this.EVENT_START));
        }

        if (!card.isFound()) {
            if (this.selectedCard) {
                if (this.selectedCard != card) {
                    card.show();
                    this.shownCards.push(card);
    
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
                // Hide all currently shown cards without delay
                while (this.shownCards.length > 0) {
                    this.shownCards.pop().hide();
                }

                card.show();
                this.shownCards.push(card);
                this.selectedCard = card;
            }

            if (this.hasWon()) {
                // Game won
                this.tableElement.dispatchEvent(new Event(this.EVENT_WIN));
                this.gameStarted = false;
            }
        }
    }

    registerEventHandler(event, eventHandler) {
        this.tableElement.addEventListener(event, () => {
            eventHandler(this);
        });
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

export class Card
{
    CARD_ACTIVE_CLASS = 'active';
    CARD_FOUND_CLASS = 'found';

    found = false;
    defaultLetter;
    cardElement;
    letter;

    constructor(cardElement, letter, defaultLetter) {
        this.cardElement = cardElement;
        this.letter = letter;
        this.defaultLetter = defaultLetter;
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

    registerClickHandler(eventHandler) {
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