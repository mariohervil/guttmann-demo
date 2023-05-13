import express, { Request, Response } from 'express';
import GameConfig, { IGameConfig } from '../models/game-models/gameConfig.model';
import Account from '../models/account.model';
// import ISession from '../utils/customSession';
import defaultJSON from '../../src/gameConfigDefault.json';
import { randomUUID } from 'crypto';
import ISession from '../utils/customSession';
const router = express.Router();

router.post('/save', async (request: Request, response: Response) => {
	for (const field in request.body) {
		console.log(request.body[field]);
		if (!request.body[field]) {
			console.log('did not work');
			return response.status(500).send('Your request body is empty');
		}
	}

	console.log(request.body);
	const gameConfig: IGameConfig = {
		gameName: request.body.gameName,
		configName: request.body.configName,
		categories: request.body.categories,
		maxTries: request.body.maxTries,
		maxScorePerCategory: request.body.maxScorePerCategory,
		maxTimePerGame: request.body.maxTimePerGame,
		maxSecondsPerQuestion: request.body.maxSecondsPerQuestion,
	};

	const newGameConfig = new GameConfig(gameConfig);

	try {
		// SESSION -> usar cuando esté implementado en frontend
		const session = request.session as ISession;
		console.log(`Requested by: ${session.username}`);
		await Account.findOneAndUpdate(
			{ username: session.username /* Sustituir por session.username */ },
			{
				$push: {
					gameConfigs: newGameConfig,
				},
			}
		)
			.then((value) => {
				if (value) {
					return response.status(201).send(value);
				}
				return response.status(500).send(`Error when saving Config`);
			})
			.catch((error) => {
				console.log(error);
				return response.status(500).send(`Error when saving Config ${error}`);
			});
	} catch (error) {
		return response.status(500).send(`Error when saving Config ${error}`);
	}
});

router.get('/reset', async (request: Request, response: Response) => {
	try {
		return response.status(200).send({ gameConfig: defaultJSON });
	} catch (error) {
		return response.status(400).send(`Error when reseting JSON ${error}`);
	}
});

router.get('/import', async (request: Request, response: Response) => {
	let username = (request.session as ISession).username;
	try {
		const result = await Account.findOne({ username }, { gameConfigs: 1, _id: 0 });
		//console.log(result?.gameConfigs);
		return response.status(200).send(result?.gameConfigs);
	} catch (error) {
		console.log('Pro: ' + error);
		return response.status(400).send('Error in importation');
	}
});

router.put('/apply', async (request: Request, response: Response) => {
	const session: ISession = request.session as ISession;
	const username = session.username;
	console.log(session.username);
	const newGameConfig: IGameConfig = request.body.gameConfig;
	try {
		Account.findOneAndUpdate(
			{
				username: username,
				'gameConfigs.configName': newGameConfig?.configName,
			},
			{ $set: { 'gameConfigs.$': newGameConfig } },
			{ new: true },
			(error, account) => {
				if (error) {
					return response.status(500).send(`Failed to update ${error}`);
				}
				return response.status(200).send('Updated successfully');
			}
		);
	} catch (error) {
		return response.status(400).send(`Error applying configuration ${error}`);
	}
});

router.delete('/delete/:configName', async (request: Request, response: Response) => {
	const username = (request.session as ISession).username;
	const conf: string = request.params.configName.toString();

	await Account.findOneAndUpdate(
		{ username: username },
		{ $pull: { gameConfigs: { configName: conf } } },
		{ new: true }
	)
		.then((value) => {
			return response.status(200).send(value);
		})
		.catch((error) => {
			console.log(error);
			return response.status(500).send(`Error when deleting Config ${error}`);
		});
});

export default router;
