export default interface IGameConfig{
  categories: number,
  maxTries: number,
  maxScorePerCategory: number,
  wordsPerRound: number,
  maxTimePerGame: number,
  maxSecondsPerQuestion: number,
  [key:number]:string
}