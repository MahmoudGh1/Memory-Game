import { Board } from "./board";
import { Card } from "./Card";
import { ICardDifficultySettings } from "../Interfaces/IDifficulty";
import formatTime from "../Utils/formatTime";
// @ts-ignore
// import { bootstrap } from "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"

export class GameController{
    private board: Board;
    private flippedCards: Card[] = [];
    private matchedCards: Card[] = [];
    private card1IsClicked: boolean = false;
    private card2IsClicked: boolean = false;
    private totalCards: number = 0;
    private score: number = 0
    private timer: number = 60
    private moves: number = 0
    private timeInterval: any =  null
    private gameOver: boolean = false
    private defaultLevel: string = "normal"
    private progressCount: number = 0

    private sounds = {
        "flip": new Audio("../../public/assets/sounds/flip.mp3"),
        "win": new Audio("../../public/assets/sounds/win.mp3"),
        "match": new Audio("../../public/assets/sounds/match.mp3"),
        "misMatch": new Audio("../../public/assets/sounds/mismatch.mp3"),
        "lose": new Audio("../../public/assets/sounds/lose.mp3"),
    }

    constructor(){
        this.board = new Board("game-table");
    }

    public startGame(level: string, images: string[]){
        this.defaultLevel = level
        let settings;
        switch(level){
            case "easy":
                settings = ICardDifficultySettings.easy
                break;
            case "normal":
                settings = ICardDifficultySettings.normal
                break;
            case "hard":
                settings = ICardDifficultySettings.hard
                break;
        }

        this.totalCards = settings!.pairs* 2;
        this.matchedCards = []
        this.score = 0
        this.moves = 0
        this.board.generateBoard(settings!, images, (card: Card) => {
            this.handleCardFlip(card);
        });

        this.startTimer(settings!.time);
    }

    private handleCardFlip(card: Card){
        if(this.flippedCards.length >= 2 || card.isMatched()){
            card.cardUnFlip()
            return
        }
        this.playAudio("flip")
        this.moves++
        const movesSpan = document.querySelector(".moves") as HTMLElement
        movesSpan.innerHTML = this.moves.toString()
        this.flippedCards.push(card);
        if(this.flippedCards.length >= 2){
            this.checkIfMatched()
        }
    }

    private checkIfMatched(){
        this.card1IsClicked = true
        this.card2IsClicked = true
        
        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];
        if(card1?.imageSrc === card2?.imageSrc){
            this.playAudio("match")
            card1?.cardMatch();
            card2?.cardMatch();
            this.matchedCards.push(card1!, card2!);
            this.score += 10;
            let progress = document.querySelector(".progressCount") as HTMLSpanElement
            let progressBar = document.querySelector(".progress-bar") as HTMLDivElement
            this.progressCount = Math.floor((this.matchedCards.length / this.totalCards) * 100)
            progressBar.style.width = this.progressCount + "%"
            progress.innerHTML = this.progressCount.toString()
            this.continuePlaying();
        }
        else{
            setTimeout(() => {
                this.playAudio("misMatch")
                card1?.cardUnFlip()
                card2?.cardUnFlip()
                this.continuePlaying();
            }, 1000)
        }
    }

    private continuePlaying(){
        this.flippedCards = []
        this.card1IsClicked = false;
        this.card2IsClicked = false
        if(this.matchedCards.length >= this.totalCards){
            this.userGameEndStatus(true)
        }
    }

    private startTimer(time: number){
        clearInterval(this.timeInterval);
        this.timer = time;
        this.gameOver = false
        let display = document.querySelector(".timer-display span") as HTMLElement;
        if(display){
            display.innerHTML = formatTime(0)
        }

        this.timeInterval = setInterval(() => {
            this.timer--;
            if(display){
                display.innerHTML = formatTime(this.timer)
            }

            if(this.timer <= 0){
                this.userGameEndStatus(false)
            }
        }, 1000)
    }

    private playAudio(soundName: string){
        let sound;
        switch(soundName){
            case "flip":
                sound = this.sounds[soundName]
                break;
            case "win":
                sound = this.sounds[soundName]
                break;
            case "lose":
                sound = this.sounds[soundName]
                break;
            case "match":
                sound = this.sounds[soundName]
                break;
            case "misMatch":
                sound = this.sounds[soundName]
                break;            
        }
        sound!.currentTime = 0;
        sound!.play().catch(error => console.log("Browser blocking audio by default to let the user interact to play it"))
    }

    private userGameEndStatus(status: boolean){
        clearInterval(this.timeInterval);
        this.gameOver = true;

        const modal = document.getElementById("exampleModal2");
        const title = document.getElementById("exampleModalLabel2");
        const message = document.getElementById("modal-message");

        if(modal && title && message){
            const myModal = new (window as any).bootstrap.Modal(modal);
            myModal.show();

            if(status){
                this.playAudio("win")
                title.innerHTML = "Victory"
                title.style.color = "yellow"
                message.innerHTML = `
                <div class="gameStatusIcon">🏆</div>
                <p>Congratulations</p>
                <h3>You finished with ${this.score} points!</h3>
                `
                } 
                else {
                this.playAudio("lose")
                title.innerText = "Game Over!";
                title.style.color = "red";
                message.innerHTML = `
                    <div class="gameStatusIcon">⏰</div>
                    <p>Better luck next time!</p>
                `;
            }
            document.querySelector(".ranking-panel").innerHTML += `
                <p class="text-center text-muted small w-100">Mahmoud Scored: ${this.score}</p>
            `;
        }
    }

    public restartGame(images: string[]){
        this.startGame(this.defaultLevel, images)
    }
}