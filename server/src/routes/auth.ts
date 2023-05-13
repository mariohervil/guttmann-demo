import { Request, Response } from 'express';
import express from 'express';
import Patient, { IPatient } from '../models/user.model';
import Account, { IAccount } from '../models/account.model';
import { encrypt, compareEncryption } from '../utils/encryption';
import { patientOrAccount } from '../utils/differentiate';
import ISession from '../utils/customSession';

const router = express.Router();

router.post('/login/', async (req: Request, res: Response) => {
	const session = req.session as ISession;
	console.log('Before changing session: \n');
	console.log(req.session);
	if (!req?.body?.username || !req?.body?.password) {
		return res.status(400).send({
			message: 'Username or Password must be filled',
			data: req.body,
		});
	}
	try {
		// @ Patient and Doctor/Admin differentiation based
		const model: IPatient | IAccount | null = await patientOrAccount(req);

		if (compareEncryption(req.body.password, model?.password! as string)) {
			session.username = model?.username!;
			session.role = model?.role!;
			console.log('After changing session: \n');
			console.log(req.session);
			return res.status(200).cookie('SESSION', session).send('Logged in');
		}
	} catch (error) {
		console.log(error);
		return res.status(401).send({ reason: "Username or password doesn't match" });
	}
});

router.post('/signup/patient', async (req: Request, res: Response) => {
	try {
		/*
Register testing. Jerarquía: paciente, doctor, administrador.
Administrador da de alta a doctores y administradores. Doctores solamente a pacientes.
*/

		// cuentas paciente - //! Van las dos a la misma colección
		await Patient.create({
			username: req.body.username + ' - patient',
			password: encrypt(req.body.password),
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			role: req.body.role,
			birthYear: req.body.birthYear,
			studies: req.body.studies,
			sex: req.body.sex,
		});

		return res.status(201).send({
			message: 'Registration succeeded',
		});
	} catch (e) {
		return res.status(400).send({
			message: `Registration failed: ${e}`,
		});
	}
});

router.post('/signup/admin/', async (req: Request, res: Response) => {
	await Account.create({
		username: req.body.username,
		password: encrypt(req.body.password),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		role: 2,
	})
		.then((value: IAccount) => {
			return res.status(201).send(value);
		})
		.catch((reason: string) => {
			return res.status(500).send(reason);
		});
	return res.status(500).send();
});

router.post('/signup/doctor/', async (req: Request, res: Response) => {
	await Account.create({
		username: req.body.username,
		password: encrypt(req.body.password),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		role: 1,
	})
		.then((value: IAccount) => {
			return res.status(201).send(value);
		})
		.catch((reason: string) => {
			return res.status(500).send(reason);
		});
	return res.status(500).send();
});

router.post('/logout', (req: Request, res: Response) => {
	const session: ISession = req.session as ISession;
	if (session.username || session.role) {
		req.session.destroy((error: Error) => {
			if (error) {
				console.log(error);
				return res.status(400).send(`Couldn't log out ${error}`);
			}
		});
		return res.status(200).send('Successfully logged out');
	}
	return res.status(400).send('Already logged out');
});

router.get('/session', (req: Request, res: Response) => {
	const session: ISession = req.session as ISession;
	if (session.username && session.role) {
		return res.status(200).send({
			username: session.username,
			role: session.role,
		});
	}
	return res.status(400).send('No session found');
});
export default router;
