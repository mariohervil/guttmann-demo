import { useRouter } from 'next/router';
import IWordGame from '../games/wordgame/interfaces/WordGame';

const Result = () => {
	const router = useRouter();
	const {
		gameName,
		rightGuesses,
		wrongGuesses,
		omissions,
		passedCategories,
		perseverativeErrors,
		nonPerseverativeErrors,
		setContinuationErrors,
		responseTime,
	}: any = router.query;

	return (
		<div className="center-screen">
			<div>Nombre del juego: {gameName}</div>

			<div>Cantidad de aciertos: {rightGuesses}</div>

			<div>Cantidad de fallos: {wrongGuesses}</div>

			<div>Omisiones: {omissions}</div>

			<div>Categorías superadas: {passedCategories}</div>

			<div>Errores perseverativos: {perseverativeErrors}</div>

			<div>Errores no perseverativos: {nonPerseverativeErrors}</div>

			<div>Errores de continuación de set: {setContinuationErrors}</div>

			<div>Tiempo de respuesta: {JSON.stringify(responseTime)}</div>
		</div>
	);
};

export default Result;
