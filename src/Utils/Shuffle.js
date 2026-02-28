export default function shuffleCards(cards) {
    let shuffled = [...cards, ...cards];
    let shuffledLength = shuffled.length;
    let randomIndex = 0;
    while (shuffledLength !== 0) {
        randomIndex = Math.floor(Math.random() * shuffledLength);
        shuffledLength--;
        [shuffled[shuffledLength], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[shuffledLength]];
    }
    return shuffled;
}
//# sourceMappingURL=Shuffle.js.map