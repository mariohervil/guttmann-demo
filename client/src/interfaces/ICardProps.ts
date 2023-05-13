import { IGameConfig } from "./IGameConfig";

interface ICardProps{
    gameConfig: IGameConfig;
    onDelete?: () => void;

}

export default ICardProps;