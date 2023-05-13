import axios, { AxiosResponse } from 'axios';
import { IGameConfig } from '../../../../interfaces/IGameConfig';
import { MouseEventHandler, useEffect, useState } from 'react';

export interface SaveModalProps {
	config: IGameConfig;
	openSuccessAlert: () => void;
	closeSuccessAlert: () => void;
	openErrorAlert: () => void;
	closeErrorAlert: () => void;
}

function SaveModal(props: SaveModalProps) {
	const URL = 'http://localhost:8080/games/wordgame/config/save';
	const [name, setName] = useState<string>();
	const gameConfig = props.config;

	const closeModal = () => {
		const toggle = document.querySelector('.modal-toggle') as HTMLInputElement;
		toggle.checked = false;
	};

	const saveConfig = () => {
		if (name !== null && name !== undefined && name !== '') {
			gameConfig.configName = name;
			const input = document.querySelector('#configName') as HTMLInputElement;
			if (input) {
				input.value = '';
			}
		}

		if (!gameConfig.configName) {
			console.log('Nombre de la configuración está vacío');
			return null;
		}

		axios
			.post(URL, gameConfig, {
				withCredentials: true,
			})
			.then((response: AxiosResponse) => {
				if (response.status >= 200 && response.status < 300) {
					closeModal();
					props.openSuccessAlert();
					setTimeout(() => {
						props.closeSuccessAlert();
					}, 4000);
				}
			})
			.catch((reason) => {
				console.log(reason);
				closeModal();
				props.openErrorAlert();
				setTimeout(() => {
					props.closeErrorAlert();
				}, 4000);
			});
	};

	return (
		<>
			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<label
						htmlFor="my-modal"
						className="btn btn-sm btn-accent btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h3 className="font-bold text-lg">Define un nombre para la configuración!</h3>
					<input
						type="text"
						className="my-4 input input-bordered w-full max-w-xs focus:outline-primary focus:border-none"
						name="configName"
						id="configName"
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="modal-action">
						<label
							htmlFor="my-modal"
							className="btn btn-primary"
							onClick={() => saveConfig()}
						>
							Confirmar
						</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default SaveModal;
