import { IModalProps } from 'react-hyper-modal';
export interface IGameConfig {
	gameName: string;
	configName: string;
	categories: number;
	maxTries: number;
	maxScorePerCategory: number;
	maxTimePerGame: number;
	maxSecondsPerQuestion: number;
	[key: string]: number | string;
}

export interface IResults extends IModalProps {
	configs?: IGameConfig[];
	onRequestClose?: () => void;

}
