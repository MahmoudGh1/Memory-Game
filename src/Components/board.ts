import {Card} from "../Components/Card"
import { ICardDifficultyLevels } from "../Interfaces/IDifficulty"
import { ICardValue } from "../Interfaces/ICard";
import shuffleCards from "../Utils/Shuffle";

export class Board{
    private cards: Card[] = []
    private tableElement: HTMLTableElement;

    constructor(tableID: string){
        this.tableElement = document.getElementById(tableID) as HTMLTableElement
    }

    public generateBoard(levels: ICardDifficultyLevels, cardImages: string[], isFlip: (card: Card) => void){
        this.clearBoard();
        const selectedImages = cardImages.slice(0, levels.pairs)
        const shuffledStrings = shuffleCards(selectedImages)
        this.tableElement.style.setProperty("--rows", levels.rows.toString())
        let index = 0
        for(let row = 0; row < levels.rows; row++){
            const tr = this.tableElement.insertRow();
            for(let column = 0; column < levels.cols; column++){
                const cardData: ICardValue = {
                    id: Math.random(),
                    imageSrc: shuffledStrings[index] || "",
                };

                const card = new Card(cardData, isFlip);
                this.cards.push(card)
                tr.appendChild(card.Element);
                index++;
                
            }
        }
    }

    private clearBoard(): void{
        this.tableElement.innerHTML = "";
        this.cards = [];
    }
}