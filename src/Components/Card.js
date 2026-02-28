// * Card status
export var cardStatus;

(function (cardStatus) {
    cardStatus[cardStatus["hidden"] = 0] = "hidden";
    cardStatus[cardStatus["flipped"] = 1] = "flipped";
    cardStatus[cardStatus["matched"] = 2] = "matched";
})(cardStatus || (cardStatus = {}));
export class Card {
    constructor(data, isFlip) {
        this.status = cardStatus.hidden;
        this.id = data.id;
        this.imageSrc = data.imageSrc;
        this.isFlip = isFlip;
        this.element = this.createCardElement();
    }
    createCardElement() {
        const td = document.createElement("td");
        td.innerHTML = `
            <div class="card-inner">
                <div class="card-back">
                    <img src="../../public/assets/images/back.jpg" alt="card image" style="width: 100%; height: 100%; object-fit: contain">
                </div>
                <div class="card-front">
                    <img src="${this.imageSrc}" alt="card image" style="width: 100%; height: 100%; object-fit: contain">
                </div>
            </div>
        `;
        td.addEventListener("click", (e) => {
            this.handleFlip();
        });
        return td;
    }
    get Element() {
        return this.element;
    }
    isFlipped() {
        return this.status === cardStatus.flipped;
    }
    isHidden() {
        return this.status === cardStatus.hidden;
    }
    isMatched() {
        return this.status === cardStatus.matched;
    }
    handleFlip() {
        if (!this.isFlipped() && !this.isMatched()) {
            this.cardFlip();
            this.isFlip(this);
        }
        return true;
    }
    cardFlip() {
        this.status = cardStatus.flipped;
        this.element.classList.add("is-flipped");
    }
    cardUnFlip() {
        this.status = cardStatus.hidden;
        this.element.classList.remove("is-flipped");
    }
    cardMatch() {
        this.status = cardStatus.matched;
        this.element.classList.add("matched");
        this.element.style.opacity = "0.5";
        this.element.style.pointerEvents = "none";
    }
}
//# sourceMappingURL=Card.js.map