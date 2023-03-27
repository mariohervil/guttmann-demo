export default interface IWord {
	word: string;
	semantics: string;

	font: string;

	firstLetter: string;
	[key: string]: string; // Index signature
}
