import { model, Schema, Document } from 'mongoose';

export interface IWordGame {
	gameName: String;
	rightGuesses: Number;
	wrongGuesses: Number;
	omissions: Number;

	// Número de categorías correctas identificadas (8 aciertos consecutivos)
	passedCategories: Number;

	// Número de palabras que el sujeto ordena bajo una categoría anterior correcta, a pesar del feedback negativo tras cometer un error​
	perseverativeErrors: Number;

	// Errores que no se deben a la aplicación de una relación correcta anterior, sino errores debidos al azar​
	nonPerseverativeErrors: Number;

	// Cuando el usuario, a mitad de una categoría, responde con otro criterio, para posteriormente volver a la categoría adecuada ​
	setContinuationErrors: Number;

	// Tiempo de respuesta de cada pantalla​
	responseTime: Number;
}

const wordGameSchema = new Schema(
	{
		// campo para diferenciar entre juegos en caso de que metamos todos en la misma colección
		gameName: String,
		rightGuesses: Number,
		wrongGuesses: Number,
		omissions: Number,

		// Número de categorías correctas identificadas (8 aciertos consecutivos)
		passedCategories: Number,

		// Número de palabras que el sujeto ordena bajo una categoría anterior correcta, a pesar del feedback negativo tras cometer un error​
		perseverativeErrors: Number,

		// Errores que no se deben a la aplicación de una relación correcta anterior, sino errores debidos al azar​
		nonPerseverativeErrors: Number,

		// Cuando el usuario, a mitad de una categoría, responde con otro criterio, para posteriormente volver a la categoría adecuada ​
		setContinuationErrors: Number,

		// Tiempo de respuesta de cada pantalla​
		responseTime: Number,
	},
	{ collection: 'gamedata' }
);

export default model<IWordGame>('WordGame', wordGameSchema);
