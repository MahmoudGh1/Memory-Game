import { Board } from "./board.js";
import { ICardDifficultySettings } from "../Interfaces/IDifficulty.js";
import formatTime from "../Utils/formatTime.js";
// @ts-ignore
// import { bootstrap } from "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
export class GameController {
    constructor() {
        this.flippedCards = [];
        this.matchedCards = [];
        this.card1IsClicked = false;
        this.card2IsClicked = false;
        this.totalCards = 0;
        this.score = 0;
        this.timer = 60;
        this.moves = 0;
        this.timeInterval = null;
        this.gameOver = false;
        this.defaultLevel = "normal";
        this.progressCount = 0;

        this.sounds = {
            "flip": new Audio("../../public/assets/sounds/flip.mp3"),
            "win": new Audio("../../public/assets/sounds/win.mp3"),
            "match": new Audio("../../public/assets/sounds/match.mp3"),
            "misMatch": new Audio("../../public/assets/sounds/mismatch.mp3"),
            "lose": new Audio("../../public/assets/sounds/lose.mp3"),
        };
        this.board = new Board("game-table");
    }
    startGame(level, images) {
        this.defaultLevel = level;
        let settings;
        switch (level) {
            case "easy":
                settings = ICardDifficultySettings.easy;
                break;
            case "normal":
                settings = ICardDifficultySettings.normal;
                break;
            case "hard":
                settings = ICardDifficultySettings.hard;
                break;
        }
        this.totalCards = settings.pairs * 2;
        this.matchedCards = [];
        this.score = 0;
        this.moves = 0;
        this.board.generateBoard(settings, images, (card) => {
            this.handleCardFlip(card);
        });
        this.startTimer(settings.time);
    }
    handleCardFlip(card) {
        console.log("card flipped, total flipped:", this.flippedCards.length)
        console.log("card imageSrc:", card.imageSrc)
        if (this.flippedCards.length >= 2 || card.isMatched()) {
            card.cardUnFlip()
            return;
        }
        this.playAudio("flip");
        this.moves++;
        const movesSpan = document.querySelector(".moves");
        movesSpan.innerHTML = this.moves.toString();
        this.flippedCards.push(card);
        if (this.flippedCards.length >= 2) {
            this.checkIfMatched();
        }
    }
    checkIfMatched() {
        this.card1IsClicked = true;
        this.card2IsClicked = true;
        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];
        
        if ((card1 === null || card1 === void 0 ? void 0 : card1.imageSrc) === (card2 === null || card2 === void 0 ? void 0 : card2.imageSrc)) {
            this.playAudio("match");
            card1 === null || card1 === void 0 ? void 0 : card1.cardMatch();
            card2 === null || card2 === void 0 ? void 0 : card2.cardMatch();
            this.matchedCards.push(card1, card2);
            this.score += 10;
            let progress = document.querySelector(".progressCount")
            let progressBar = document.querySelector(".progress-bar")
            this.progressCount = Math.floor((this.matchedCards.length / this.totalCards) * 100)
            progressBar.style.width = this.progressCount + "%"
            progress.innerHTML = this.progressCount.toString()
            this.continuePlaying();
        }
        else {
            setTimeout(() => {
                this.playAudio("misMatch");
                card1 === null || card1 === void 0 ? void 0 : card1.cardUnFlip();
                card2 === null || card2 === void 0 ? void 0 : card2.cardUnFlip();
                this.continuePlaying();
            }, 1000);
        }
    }
    continuePlaying() {
        this.flippedCards = [];
        this.card1IsClicked = false;
        this.card2IsClicked = false;
        if (this.matchedCards.length >= this.totalCards) {
            this.userGameEndStatus(true);
        }
    }
    startTimer(time) {
        clearInterval(this.timeInterval);
        this.timer = time;
        this.gameOver = false;
        let display = document.querySelector(".timer-display span");
        if (display) {
            display.innerHTML = formatTime(0);
        }
        this.timeInterval = setInterval(() => {
            this.timer--;
            if (display) {
                display.innerHTML = formatTime(this.timer);
            }
            if (this.timer <= 0) {
                this.userGameEndStatus(false);
            }
        }, 1000);
    }
    playAudio(soundName) {
        let sound;
        switch (soundName) {
            case "flip":
                sound = this.sounds[soundName];
                break;
            case "win":
                sound = this.sounds[soundName];
                break;
            case "lose":
                sound = this.sounds[soundName];
                break;
            case "match":
                sound = this.sounds[soundName];
                break;
            case "misMatch":
                sound = this.sounds[soundName];
                break;
        }
        sound.currentTime = 0;
        sound.play().catch(error => console.log("Browser blocking audio by default to let the user interact to play it"));
    }
    userGameEndStatus(status) {
        clearInterval(this.timeInterval);
        this.gameOver = true;
        const modal = document.getElementById("exampleModal2");
        const title = document.getElementById("exampleModalLabel2");
        const message = document.getElementById("modal-message");
        if (modal && title && message) {
            const myModal = new window.bootstrap.Modal(modal);
            myModal.show();
            if (status) {
                this.playAudio("win");
                title.innerHTML = "Victory";
                title.style.color = "yellow";
                message.innerHTML = `
                <div class="gameStatusIcon">🏆</div>
                <p>Congratulations</p>
                <h3>You finished with ${this.score} points!</h3>
                `;
            }
            else {
                this.playAudio("lose");
                title.innerText = "Game Over!";
                title.style.color = "red";
                message.innerHTML = `
                    <div class="gameStatusIcon">⏰</div>
                    <p>Better luck next time!</p>
                `;
            }
            document.querySelector(".ranking-panel").innerHTML += `
                <p class="text-center text-muted small w-100">Mahmoud Scored: ${this.score}</p>
            `
        }
    }
    restartGame(images) {
        this.startGame(this.defaultLevel, images);
    }
}
//# sourceMappingURL=gameController.js.map