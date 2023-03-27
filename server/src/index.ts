import dotenv from 'dotenv';
dotenv.config();
import express, { Request } from 'express';
import Config from './config';
import cors from 'cors';
import RegisterDatabaseConnection from './database/connection';
import auth from './routes/auth';
import gameData from './routes/gameData';
import gameConfig from "./routes/gameConfig" 
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './models/user.model';

// @ Init app
const App = express();

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// @ Router
App.use('/auth', auth);
App.use('/gamedata/', gameData);
App.use('/game/data/config', gameConfig);


// @ Database connection
RegisterDatabaseConnection(Config);

App.listen(process.env.SERVERPORT, () => {
	console.log(`Listening on ${process.env.SERVERPORT}`);
});
