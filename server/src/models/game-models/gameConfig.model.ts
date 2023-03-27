import { model, Schema, Document } from 'mongoose';
export interface IGameConfig extends Document{
    categories: Number;
    maxTries: Number;
    maxScorePerCategory: Number;
    wordsPerRound: Number;
    maxTimePerGame: Number;
    maxSecondsPerQuestion: Number;
}
const gameConfigSchema = new Schema({
    categories: Number,
    maxTries: Number,
    maxScorePerCategory: Number,
    wordsPerRound: Number,
    maxTimePerGame: Number,
    maxSecondsPerQuestion: Number,
});
export default model<IGameConfig>('GameConfig', gameConfigSchema);