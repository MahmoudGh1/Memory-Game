export enum ICardDifficulty{
    easy = "easy",
    normal = "normal",
    hard = "hard"
}

export interface ICardDifficultyLevels{
    rows: number;
    cols: number;
    pairs: number;
    time: number;
}

export interface ICardDifficultyOptions{
    easy: ICardDifficultyLevels,
    normal: ICardDifficultyLevels,
    hard: ICardDifficultyLevels,
}

export const ICardDifficultySettings: ICardDifficultyOptions = {
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
}