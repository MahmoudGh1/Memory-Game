import { Card } from "../Components/Card.js";
import shuffleCards from "../Utils/Shuffle.js";
export class Board {
    constructor(tableID) {
        this.cards = [];
        this.tableElement = document.getElementById(tableID);
    }
    generateBoard(levels, cardImages, isFlip) {
        this.clearBoard();
        const selectedImages = cardImages.slice(0, levels.pairs);
        const shuffledStrings = shuffleCards(selectedImages);
        this.tableElement.style.setProperty("--rows", levels.rows.toString())
        let index = 0;
        for (let row = 0; row < levels.rows; row++) {
            const tr = this.tableElement.insertRow();
            for (let column = 0; column < levels.cols; column++) {
                const cardData = {
                    id: Math.random(),
                    imageSrc: shuffledStrings[index] || "",
                };
                const card = new Card(cardData, isFlip);
                this.cards.push(card);
                tr.appendChild(card.Element);
                index++;
            }
        }
    }
    clearBoard() {
        this.tableElement.innerHTML = "";
        this.cards = [];
    }
}
//# sourceMappingURL=board.js.map