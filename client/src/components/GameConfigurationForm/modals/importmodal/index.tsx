import { useEffect, useState } from 'react';
import { IGameConfig, IResults } from '../../../../interfaces/IGameConfig';
import ModalCard from '../../card';

function ImportModal(props: IResults) {
	const [configs, setConfig] = useState<IGameConfig[]>([]);

	useEffect(() => {
		if (props.configs) {
			setConfig(props.configs);
		}
	}, [props]);

	return (
		<div>
			{/* TODO: Quitar botón de aplicar, solamente editar. Para seleccionar la configuración,
			clicar en la tarjeta, que se cambia el fondo o el borde al color primario de la aplicación.
			*/}

			<input type="checkbox" id="import-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box w-max max-w-screen-2xl">
					<label
						htmlFor="import-modal"
						className="btn btn-sm btn-accent btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h3 className="font-bold text-4xl text-center mb-3">Configuraciones</h3>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center w-max">
						{configs?.map((config) => (
							<ModalCard key={config.configName} gameConfig={config} />
						))}
					</div>
					<div className="modal-action">
						<label htmlFor="import-modal" className="btn btn-primary">
							Aplicar
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImportModal;
