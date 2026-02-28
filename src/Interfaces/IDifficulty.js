export var ICardDifficulty;
(function (ICardDifficulty) {
    ICardDifficulty["easy"] = "easy";
    ICardDifficulty["normal"] = "normal";
    ICardDifficulty["hard"] = "hard";
})(ICardDifficulty || (ICardDifficulty = {}));
export const ICardDifficultySettings = {
    easy: {
        rows: 3,
        cols: 4,
        pairs: 6,
        time: 300,
    },
    normal: {
        rows: 4,
        cols: 5,
        pairs: 10,
        time: 600,
    },
    hard: {
        rows: 6,
        cols: 6,
        pairs: 18,
        time: 900,
    }
};
//# sourceMappingURL=IDifficulty.js.map