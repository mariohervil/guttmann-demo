import IWord from '../interfaces/Word';
import wordsJson from '../words.json';

const shuffleArray = (array: IWord[]) => {
	let i = array.length;
	while (--i > 0) {
		let temp = Math.floor(Math.random() * (i + 1));
		[array[temp], array[i]] = [array[i], array[temp]];
	}
	return array;
};

const validateWord = (criteria: string, target: IWord, chosenWord: IWord) => {
	return target[criteria] === chosenWord[criteria];
};

const followedLastCategory = (lastCriteria: string, target: IWord, chosenWord: IWord) => {
	if (lastCriteria == '') return false;
	return target[lastCriteria] === chosenWord[lastCriteria];
};

const followedAnyCategory = (criterias: string[], target: IWord, chosenWord: IWord) => {
	return criterias.some((crit) => target[crit] === chosenWord[crit]);
};

const shuffleAny = (array: string[]) => {
	let i = array.length;
	while (--i > 0) {
		let temp = Math.floor(Math.random() * (i + 1));
		[array[temp], array[i]] = [array[i], array[temp]];
	}
	return array;
};

const getCriteria = (
	criteria: string,
	lastCriteria: string,
	secondLastCriteria: string
): string => {
	return Object.keys(wordsJson.words[0]).filter((crt) => {
		return !(
			crt === 'word' ||
			crt === criteria ||
			crt === lastCriteria ||
			crt === secondLastCriteria
		);
	})[0];
};

/*
	Params 
	función para escoger palabras, tiene validaciones para que siempre 
	coincidan las palabras diana con al menos dos de las opciones, más la fuente
	que se añade después de escoger la target, de entre las fuentes de las dos
	palabras que quedan en las opciones
	
	*/
const pickTargetWords = (pickedWords: IWord[], lastWord: IWord): IWord[] => {
	const fontsSet = new Set<string>();

	const filteredArray = wordsJson.words.filter((word) => {
		const isLastWordDifferent = lastWord?.word !== word.word; // Compare with the current word

		if (isLastWordDifferent) {
			!pickedWords.some((pickedWord) => {
				fontsSet.add(pickedWord.font);
				return pickedWord.word === word.word;
			});
		}

		return isLastWordDifferent;
	});

	const fonts = Array.from(fontsSet);
	/*
		Used fonts sirve para guardar las fuentes que tienen las palabras opción
		y usarlas para escoger la fuente de la palabra target
		*/
	const usedFonts = new Set<string>();
	const result: IWord[] = [];

	for (const word of filteredArray) {
		let count = 0;
		usedFonts.clear();
		for (const pickedWord of pickedWords) {
			if (
				word.semantics === pickedWord.semantics ||
				word.firstLetter === pickedWord.firstLetter
			) {
				usedFonts.add(pickedWord.font);
				count++;
			}
			if (count === 2) {
				word.font = shuffleAny(fonts.filter((font) => !usedFonts.has(font)))[0];
				result.push(word);
				break;
			}
		}
	}
	return result;
};

/*
	
	Función algoritmo para seleccionar las palabras de abajo, 

	*/
const pickOptionWords = (): IWord[] => {
	const array: IWord[] = shuffleArray(wordsJson.words);

	const semantics: string[] = [];
	const firstLetters: string[] = [];
	const fonts: string[] = ['space mono', 'DancingScript', 'times new roman', 'Exo2'];

	const filteredWords = array.filter((word) => {
		if (semantics.includes(word.semantics) || firstLetters.includes(word.firstLetter)) {
			return false;
		}
		semantics.push(word.semantics);
		firstLetters.push(word.firstLetter);
		return true;
	});

	filteredWords.forEach((word) => {
		word.font = shuffleAny(fonts).pop()!;
	});
	return filteredWords.slice(0, 4);
};

export {
	shuffleArray,
	validateWord,
	shuffleAny,
	followedLastCategory,
	followedAnyCategory,
	getCriteria,
	pickTargetWords,
};
