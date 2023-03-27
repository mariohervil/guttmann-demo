import { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

import cors from 'cors';
import gameConfigModel from '../models/game-models/gameConfig.model'; 


const router = express.Router();

router.post('/', async (request: Request, response: Response) => {
	console.log("api guardar db")
	try {
	console.log(request.body);
	await gameConfigModel.create({
		categories: request.body.gameConfigData.categories,
		maxTries: request.body.gameConfigData.maxTries,
		maxScorePerCategory: request.body.gameConfigData.maxScorePerCategory,
		wordsPerRound: request.body.gameConfigData.wordsPerRound,
		maxTimePerGame: request.body.gameConfigData.maxTimePerGame,
		maxSecondsPerQuestion: request.body.gameConfigData.maxSecondsPerQuestion,
	});

} catch (error) {
		console.log("Pro: "+error);
		return response.send({
			status:400,
			message:"mal"
		});
}
return response.send({
	status:200,
	message:"pepeepeppe"
});
	// Actualizar el objeto data en memoria
	// Guardar los cambios en el archivo configGames.json
	/*fs.writeFileSync(filePath, JSON.stringify(data));
	console.log('JSON MODIFICADO OK');
	console.log(data);
	response.send('El archivo ha sido actualizado correctamente.');

	console.log(`El archivo ${filePath} no existe.`);
	response.status(404).send(`El archivo ${filePath} no existe.`);*/
});

export default router;
