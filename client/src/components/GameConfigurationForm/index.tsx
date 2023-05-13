import { createContext, useContext, useEffect, useState } from 'react';
import { IGameConfig } from '../../interfaces/IGameConfig';
import axios, { AxiosError, AxiosResponse } from 'axios';
import ImportModal from './modals/importmodal';
import SaveModal from './modals/savemodal';
import SuccessAlert from '../Alerts/SuccessAlert';
import ErrorAlert from '../Alerts/ErrorAlert';

const gameConfig: IGameConfig = {
	configName: '',
	gameName: 'Game',
	categories: 3,
	maxTries: 5,
	maxScorePerCategory: 8,
	maxTimePerGame: 300000,
	maxSecondsPerQuestion: 20000,
};

//En esta ruta /games/forms
const GameConfigForm = () => {
	const [gameConfigData, setGameConfigData] = useState<IGameConfig>(gameConfig);
	const [result, setResult] = useState<IGameConfig | IGameConfig[]>();
	const [successAlertVisibility, setSuccessAlertVisibility] = useState<boolean>(false);
	const [errorAlertVisibility, setErrorAlertVisibility] = useState<boolean>(false);
	const CurrentConfig = createContext(gameConfigData);
	useContext(CurrentConfig);
	const URL = 'http://localhost:8080/games/wordgame/config';

	useEffect(() => {
		console.log(successAlertVisibility);
	}, [successAlertVisibility]);

	const handleInputChange = () => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			setGameConfigData({
				...gameConfigData,
				[event.target.name]: Number.parseInt(event.target.value),
			});
		};
	};

	const resetGameConfig = () => {
		return async (event: any) => {
			const endpoint = event.target.name;

			await axios
				.get(`${URL}/${endpoint}`)
				.then((response: AxiosResponse) => {
					sessionStorage.setItem('gameConfig', response.data.gameConfig);
				})
				.catch((error: AxiosError) => {
					console.log(error);
				});
		};
	};

	const importGameConfig = () => {
		return async (event: any) => {
			const endpoint = event.target.nonce;

			await axios
				.get(`${URL}/${endpoint}`, {
					withCredentials: true,
				})
				.then((response: AxiosResponse) => {
					setResult(response?.data!);
					console.log('Configuraciones recibidas');
				})
				.catch((error: AxiosError) => {
					console.log(error);
				});
		};
	};

	const updateGameConfig = () => {
		return async (event: any) => {
			const endpoint = event.target.name;
			axios
				.put(`${URL}/${endpoint}`, { gameConfig: gameConfigData })
				.then((response: AxiosResponse) => {
					console.log('Configuración actualizada');
				})
				.catch((error: AxiosError) => {
					console.log(error);
				});
		};
	};

	const applyGameConfig = () => {
		return (event: any) => {
			localStorage.setItem('gameConfig', JSON.stringify(gameConfigData));
			console.log(localStorage.getItem('gameConfig'));
		};
	};
	/*
	TODO
	! SAVE: CONFIGURACION ENTERA - POST
	? RESET: RECUPERA LA CONFIGURACION DEFAULT - GET
	* IMPORT: RECOGE TODAS LAS CONFIGURACIONES DEL USUARIO - GET
	& APPLY: ACTUALIZA UNA CONFIGURACIÓN EXISTENTE - PUT
*/

	const openSuccessAlert = () => {
		setSuccessAlertVisibility(true);
	};

	const closeSuccessAlert = () => {
		setSuccessAlertVisibility(false);
	};

	const openErrorAlert = () => {
		setErrorAlertVisibility(true);
	};

	const closeErrorAlert = () => {
		setErrorAlertVisibility(false);
	};

	return (
		<>
			<ImportModal configs={result as IGameConfig[]} />
			<SaveModal
				config={gameConfigData}
				openSuccessAlert={openSuccessAlert}
				closeSuccessAlert={closeSuccessAlert}
				openErrorAlert={openErrorAlert}
				closeErrorAlert={closeErrorAlert}
			/>
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">Categories</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="categories"
						type="number"
						placeholder="Categories"
						name="categories"
						onChange={handleInputChange()}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">Max Tries</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="number"
						placeholder="Max Tries"
						name="maxTries"
						onChange={handleInputChange()}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Max Score Per Category
					</label>
					<input
						className=""
						id="maxScorePerCategory"
						type="number"
						placeholder="Max Score Per Category"
						name="maxScorePerCategory"
						onChange={handleInputChange()}
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Max time per Game
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxTimePerGame"
						type="number"
						placeholder="Max time per Game"
						name="maxTimePerGame"
						onChange={handleInputChange()}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Max Seconds Per Question
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxSecondsPerQuestion"
						type="number"
						placeholder="Max Seconds Per Question"
						name="maxSecondsPerQuestion"
						onChange={handleInputChange()}
					/>
				</div>

				<div className="flex flex-row justify-center gap-5">
					<label htmlFor="my-modal" className="btn btn-primary">
						Guardar
					</label>

					<button
						className="btn btn-primary"
						onClick={resetGameConfig()}
						name="reset"
						type="button"
					>
						Reset
					</button>
					<label
						htmlFor="import-modal"
						className="btn btn-primary"
						onClick={importGameConfig()}
						nonce="import"
					>
						Importar
					</label>
					<button
						className="btn btn-primary"
						onClick={applyGameConfig()}
						name="apply"
						type="button"
					>
						Aplicar
					</button>
				</div>
			</form>
			<SuccessAlert visibility={successAlertVisibility} />
			<ErrorAlert visibility={errorAlertVisibility} />
		</>
	);
};

export default GameConfigForm;
