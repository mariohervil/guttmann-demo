import { useState, useEffect, CSSProperties, MouseEventHandler } from 'react';
import IWordGame from './interfaces/WordGame';
import wordsJson from './words.json';
import {
	validateWord,
	shuffleArray,
	followedLastCategory,
	followedAnyCategory,
	getCriteria,
	pickTargetWords,
} from './utils/wordUtils';
import IWord from './interfaces/Word';
import { useRouter } from 'next/router';
import { setInterval, clearInterval } from 'timers';

/*
Esta es la configuración del juego. 
De momento está hardcodeada pero se recibirá del backend o del panel de control del juego.
El tiempo está en segundos, son los timers los que van por ms
*/
const gameConfig = {
	maxCategories: 6,
	maxTries: 5,
	maxScorePerCategory: 8,
	// wordsPerRound: 4,
	maxTimePerGame: 300,
	maxSecondsPerQuestion: 20,
};

const gameData: IWordGame = {
	gameName: 'Word Game',
	rightGuesses: 0,
	wrongGuesses: 0,
	omissions: 0,
	passedCategories: 0,
	perseverativeErrors: 0,
	nonPerseverativeErrors: 0,
	setContinuationErrors: 0,
	responseTime: [],
};
let errors = 0;
let rightAnswers = 0;

const WordGame = () => {
	const router = useRouter();
	const [round, setRound] = useState<number>(1);
	const [roundTime, setRoundTime] = useState<number>(gameConfig.maxSecondsPerQuestion);
	const [roundWords, setRoundWords] = useState<IWord[]>([]);
	const [target, setTarget] = useState<IWord>();
	const [criteria, setCriteria] = useState<string>();
	const [secondLastCriteria, setSecondLastCriteria] = useState<string>('');

	const [isListeningToPerseverativeErrors, setListenToPerseverativeErrors] =
		useState<boolean>(false);
	const [isListeningToSetContinuationErrors, setListenToSetContinuationErrors] =
		useState<boolean>(false);
	const [gameTime, setGameTime] = useState<number>(gameConfig.maxTimePerGame);

	const [lastCriteria, setLastCriteria] = useState<string>('');
	const [lastWord, setLastWord] = useState<IWord>();

	let roundTimer: NodeJS.Timeout;
	let gameTimer: NodeJS.Timeout;

	const criterias = Object.keys(wordsJson.words[0]).filter((crt) => {
		return !(crt === 'word' || crt === criteria);
	});

	// Se ejecuta al principio de la ejecución de la página. Establece las opciones y el criterio
	useEffect(() => {
		setCriteria('semantics');
		setRoundWords([
			{
				word: 'gel',
				semantics: 'objetos/cosas',
				font: 'times new roman',
				firstLetter: 'g',
			},
			{
				word: 'rana',
				semantics: 'animales',
				font: 'Exo2',
				firstLetter: 'r',
			},
			{
				word: 'cereza',
				semantics: 'alimentos',
				font: 'space mono',
				firstLetter: 'c',
			},
			{
				word: 'equitación',
				semantics: 'deportes',
				font: 'DancingScript',
				firstLetter: 'e',
			},
		]);
	}, []);

	// Se ejecuta por cada segundo que pasa del timer global de 5 minutos
	useEffect(() => {
		if (gameTime === 0) {
			// end game
			clearInterval(gameTimer!);
			endGame();
		} else {
			// decrement count every second
			gameTimer = setInterval(() => {
				setGameTime(gameTime - 1);
			}, 1000);
		}

		return () => clearInterval(gameTimer);
	}, [gameTime]);

	// Se ejecuta por cada segundo del timer de la ronda, controla las omisiones.
	useEffect(() => {
		if (errors >= gameConfig.maxTries) {
			return clearInterval(roundTimer!);
		}
		if (roundTime === 0) {
			// skip round
			gameData.omissions = gameData.omissions + 1;
			gameData.wrongGuesses = gameData.wrongGuesses + 1;
			errors++;
			handleRoundChange();
			setRoundTime(gameConfig.maxSecondsPerQuestion);
		} else {
			// decrement count every second
			roundTimer = setInterval(() => {
				setRoundTime(roundTime - 1);
			}, 1000);
		}
		return () => clearInterval(roundTimer);
	}, [roundTime]);

	// Parte de la solución temporal para recorrer todos los criterios.
	useEffect(() => {
		setSecondLastCriteria(lastCriteria);
	}, [lastCriteria]);

	// Cada ronda reinicia el timer y escoge una nueva palabra de la lista
	useEffect(() => {
		setRoundTime(gameConfig.maxSecondsPerQuestion);
		setTarget(shuffleArray(pickTargetWords(roundWords, lastWord!))[0]);
	}, [round]);

	// Actualiza la última palabra lastWord cuando la palabra diana (target) cambia.
	useEffect(() => {
		setLastWord(target);
	}, [target]);

	/* 
		Se actualiza solamente una vez, cuando se eligen las palabras de opción.
		De esta manera, la palabra objetivo espera a que se elijan
	 */
	useEffect(() => {
		setTarget(shuffleArray(pickTargetWords(roundWords, lastWord!))[0]);
	}, [roundWords]);

	const endGame = () => {
		const queryParams = new URLSearchParams(Object.entries(gameData)).toString();
		router.push('/results?' + queryParams);
	};

	/*
	cierra los timers y te envía a la página de resultados cuando has completado todas las categorías acordadas,
	6 por defecto (2 cada una).
	*/
	useEffect(() => {
		setLastCriteria(criteria!);
		if (gameData.passedCategories >= gameConfig.maxCategories) {
			clearInterval(gameTimer);
			clearInterval(roundTimer);
			endGame();
		}
	}, [criteria]);

	/*
	Recibe la palabra en la que has clicado,
	valida que tu decisión sea correcta y responde consecuentemente.
	Cambia el color de fondo de la palabra añadiendo una clase de CSS,
	la quita después de 1 segundo
	*/
	const handleWordClick = (word: IWord): MouseEventHandler<HTMLDivElement> => {
		return (event: any) => {
			if (errors >= gameConfig.maxTries) return;
			if (validateWord(criteria!, target!, word)) {
				rightGuess();
				setListenToPerseverativeErrors(false);
				if (isListeningToSetContinuationErrors) {
					gameData.setContinuationErrors++;
					setListenToSetContinuationErrors(false);
				}
				event.target.classList.remove('white-bg');
				event.target.classList.add('right-bg');
			} else {
				if (followedAnyCategory(criterias, target!, word) && rightAnswers >= 1) {
					setListenToSetContinuationErrors(true);
				}
				if (
					followedLastCategory(lastCriteria, target!, word) &&
					isListeningToPerseverativeErrors === true &&
					errors > 1
				) {
					gameData.perseverativeErrors++;
				} else {
					gameData.nonPerseverativeErrors++;
				}

				wrongGuess();
				event.target.classList.remove('white-bg');
				event.target.classList.add('error-bg');
			}
			handleRoundChange();
			setTimeout(() => {
				event.target.classList.add('white-bg');
				event.target.classList.remove('error-bg');
				event.target.classList.remove('right-bg');
			}, 400);
		};
	};

	const wrongGuess = () => {
		gameData.wrongGuesses++;
		errors++;
		rightAnswers = 0;
	};

	const rightGuess = () => {
		errors = 0;
		rightAnswers++;
		gameData.rightGuesses++;
	};

	/* aumenta de ronda y guarda el tiempo de respuesta del usuario
	también controla el si hay que cambiar el criterio o 
	has cometido todos los errores permitidos	
	*/
	const handleRoundChange = () => {
		gameData.responseTime = [
			...gameData.responseTime,
			gameConfig.maxSecondsPerQuestion - roundTime,
		];

		if (errors >= gameConfig.maxTries) {
			clearInterval(roundTimer);
			console.log('has perdido');
			clearInterval(gameTimer);
			endGame();
			return;
		} // end game
		else if (rightAnswers >= gameConfig.maxScorePerCategory) {
			gameData.passedCategories++;
			rightAnswers = 0;
			setCriteria(getCriteria(criteria!, lastCriteria, secondLastCriteria));
			setListenToPerseverativeErrors(true);
		}

		setRound(round + 1);
	};

	/*
	Devuelve el siguiente criterio
	*/

	return (
		<>
			<div>
				{' '}
				{gameTime} {roundTime}
			</div>
			<div className="min-h-screen flex flex-col">
				<div className="flex-1 flex flex-col xl:gap-40 sm:gap-0 items-center justify-center">
					<h1
						className="text-6xl font-bold text-black lg:text-8xl cursor-default select-none"
						style={{ fontFamily: target?.font }}
					>
						{target?.word.toUpperCase()}
					</h1>
					<div className="mt-4 max-w-7xl w-full mx-auto bg-gray-700 shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{roundWords.map((word) => (
							<div
								key={word.word}
								onClick={handleWordClick(word)}
								className="py-10 bg-white shadow-lg rounded-lg text-black font-bold text-lg text-center cursor-pointer select-none"
								style={{ fontFamily: word.font, fontSize: '36px' }}
							>
								{word.word}
							</div>
						))}
					</div>
				</div>
				<div className="h-1/5 bg-slate-50 flex items-end justify-center"></div>
			</div>
		</>
	);
};

export default WordGame;
