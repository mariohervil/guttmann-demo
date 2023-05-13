import { IGameConfig } from '../../interfaces/IGameConfig';

export interface DefaultModalProps {
	currentConfig?: IGameConfig;
	fc?: () => void;
}

const DefaultModal = (props: DefaultModalProps) => {
	return (
		<>
			<label htmlFor="my-modal" className="btn btn-primary">
				open modal
			</label>
			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<label
						htmlFor="my-modal"
						className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
					<p className="py-4">
						You've been selected for a chance to get one year of subscription to use
						Wikipedia for free!
					</p>
					<div className="modal-action">
						<label htmlFor="my-modal" className="btn btn-primary" onClick={props.fc}>
							Yay!
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default DefaultModal;
