import { MouseEventHandler, createContext, useContext, useEffect, useState } from 'react';
import { IGameConfig, IResults } from '../../../interfaces/IGameConfig';
import ICardProps from '../../../interfaces/ICardProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowAltCircleDown,
	faCancel,
	faCheck,
	faPencilAlt,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios, { AxiosResponse, AxiosError } from 'axios';

function Card(props: ICardProps) {
	const [trash, setTrash] = useState<IGameConfig | IGameConfig[]>();
	const URL = 'http://localhost:8080/games/wordgame/config';
	const DELETE_URL = URL + '/delete';
	const [config, setConfig] = useState<IGameConfig>();
	const [isEditing, setIsEditing] = useState(false);
	const [isCancelling, setIsCancelling] = useState(false);
	const [tempConfig, setTempConfig] = useState<IGameConfig>();
	const [isApplying, setIsApplying] = useState(config);

	/*
TODO: Comentar CreateContext o useContext para guardar la configuración y que sea accesible
TODO: desde cualquier componente en lugar de pasarla entre componentes o guardarla en localStorage

*/

	useEffect(() => {
		setConfig(props.gameConfig);
		setTempConfig(props.gameConfig);
	}, [props]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setConfig(tempConfig);
		setIsEditing(false);
		setIsCancelling(false);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setIsCancelling(false);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTempConfig({
			...tempConfig!,
			[event.target.name]: event.target.value,
		});
	};

	const handleDeleteClick = (event: any) => {
		console.log('ENDPOINT: ' + DELETE_URL);
		console.log('NOMBRE A BORRAR: ' + props.gameConfig.configName);

		axios
			.delete(`${DELETE_URL}/${props.gameConfig.configName}`, {
				withCredentials: true,
			})
			.then((res: AxiosResponse) => {
				console.log(res);
			})
			.catch((error: AxiosError) => {
				console.log(error);
			});
	};

	const applyGameConfig = () => {
		return async (event: any) => {
			const endpoint = event.target.name;
			axios
				.put(URL + endpoint, { gameConfig: config })
				.then((res: AxiosResponse) => {
					console.log(res);
				})
				.catch((error: AxiosError) => {
					console.log(error);
				});
		};
	};

	return (
		<div>
			<div
				className={
					'rounded-[10px] p-6 border-2 text-center fit-content break-words hover:bg-primary hover:text-primary-content'
				}
			>
				{isEditing ? (
					<input
						type="text"
						name="configName"
						maxLength={10}
						value={tempConfig?.configName}
						onChange={handleInputChange}
						className={
							'text-center bg-transparent w-20 h-5 p-2 border-none outline-none appearance-none -webkit-inner-spin-button -webkit-outer-spin-button'
						}
					/>
				) : (
					<h1 className="text-xl font-bold mb-2 ">{config?.configName.toUpperCase()}</h1>
				)}

				<div>
					<p>
						Categories:
						{isEditing ? (
							<input
								type="number"
								name="categories"
								value={tempConfig?.categories}
								onChange={handleInputChange}
								className={
									'text-center bg-transparent w-12 h-5 p-2 border-none outline-none appearance-none -webkit-inner-spin-button -webkit-outer-spin-button'
								}
							/>
						) : (
							<span>&nbsp;{config?.categories}</span>
						)}
					</p>
				</div>

				<div>
					<p>
						Max tries:
						{isEditing ? (
							<input
								type="number"
								name="maxTries"
								value={tempConfig?.maxTries}
								onChange={handleInputChange}
								className={
									'text-center bg-transparent w-12 h-5 p-2 border-none outline-none appearance-none -webkit-inner-spin-button -webkit-outer-spin-button'
								}
							/>
						) : (
							<span>&nbsp;{config?.maxTries}</span>
						)}
					</p>
				</div>

				<div>
					<p>
						Max Score Per Category:
						{isEditing ? (
							<input
								type="number"
								name="maxScorePerCategory"
								value={tempConfig?.maxScorePerCategory}
								onChange={handleInputChange}
								className={
									'text-center bg-transparent w-12 h-5 p-2 border-none outline-none appearance-none -webkit-inner-spin-button -webkit-outer-spin-button'
								}
							/>
						) : (
							<span>&nbsp;{config?.maxScorePerCategory}</span>
						)}
					</p>
				</div>

				<div>
					<p>
						Max Time Per Game:
						{isEditing ? (
							<input
								type="number"
								name="maxTimePerGame"
								value={tempConfig?.maxTimePerGame}
								onChange={handleInputChange}
								className={
									'text-center bg-transparent w-12 h-5 p-2 border-none outline-none appearance-none -webkit-inner-spin-button -webkit-outer-spin-button'
								}
							/>
						) : (
							<span>&nbsp;{config?.maxTimePerGame}</span>
						)}
					</p>
				</div>

				<div>
					<p>
						Max Seconds Per Question:
						{isEditing ? (
							<input
								type="number"
								name="maxSecondsPerQuestion"
								value={tempConfig?.maxSecondsPerQuestion}
								onChange={handleInputChange}
								className={
									'text-center bg-transparent w-12 h-5 p-2 border-none outline-none appearance-none -webkit-inner-spin-button -webkit-outer-spin-button'
								}
							/>
						) : (
							<span>&nbsp; {config?.maxSecondsPerQuestion}</span>
						)}
					</p>
				</div>
				<div style={{ marginTop: '5%' }}>
					{isEditing && (
						<div>
							<button
								className="bg-red-500 text-white rounded-md py-2 px-4 mb-4 mr-2"
								onClick={handleCancelClick}
							>
								<FontAwesomeIcon icon={faCancel} />
							</button>
							<button
								className="bg-green-500 text-white rounded-md py-2 px-4 mb-4"
								onClick={handleSaveClick}
							>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					)}
					{!isEditing && (
						<div>
							<button
								className="bg-secondary text-white rounded-md rounded-full py-2 px-4 mb-4"
								onClick={handleEditClick}
							>
								<FontAwesomeIcon icon={faPencilAlt} />
							</button>
							<button
								type="button"
								className="bg-red-500 text-white rounded-md py-2 px-4 mb-4"
								onClick={(event) => handleDeleteClick(event)}
								name="delete"
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>

							<button
								type="button"
								className="bg-green-500 text-white rounded-md py-2 px-4 mb-4"
								/*onClick={}*/
								name="apply"
							>
								<FontAwesomeIcon icon={faArrowAltCircleDown} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Card;
