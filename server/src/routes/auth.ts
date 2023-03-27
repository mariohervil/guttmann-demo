import { Request, Response } from 'express';
import express from 'express';
import User, { IUser } from '../models/user.model';
import Account from '../models/account.model';
import { encrypt, compareEncryption } from '../utils/encryption';
import { v4 as uuidv4 } from 'uuid';
import userOrAccount from '../utils/differentiate';

const router = express.Router();

router.post('/login/', async (request: Request, response: Response) => {
	//console.log(request.session.id);
	if (!request?.body?.username || !request?.body?.password) {
		return response.status(400).send({
			message: 'Username or Password must be filled',
			data: request.body,
		});
	}
	try {
		// @ Patient and Doctor/Admin differentiation based
		const model: any = await userOrAccount(request);

		if (compareEncryption(request.body.password, model.password)) {
			return response.status(200).send({
				message: `Successfully logged in with role ${
					model.role === 0 ? 'Patient' : model.role === 1 ? 'Doctor' : 'Administrator'
				}`,
			});
		}
	} catch (error) {
		console.log(error);
		return response.status(401).send({ message: "Username or password doesn't match" });
	}
});

router.post('/signup/', async (request: Request, response: Response) => {
	try {
	/*
	
	Register testing. Jerarquía: paciente, doctor, administrador.
	Administrador da de alta a doctores y administradores. Doctores solamente a pacientes.

	*/

		// cuentas admin - //! Van las dos a la misma colección
		await Account.create({
			// accountId: uuidv4(),
			username: request.body.username,
			password: encrypt(request.body.password),
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			role: request.body.role + 1,
		});

		// cuentas paciente - //! Van las dos a la misma colección
		await User.create({
			username: request.body.username + ' - patient',
			password: encrypt(request.body.password),
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			role: request.body.role,
			birthYear: request.body.birthYear,
			studies: request.body.studies,
			sex: request.body.sex,
		});

		return response.send({
			status: 200,
			message: 'Registration succeeded',
		});
	} catch (e) {
		return response.send({
			status: 400,
			message: `Registration failed: ${e}`,
		});
	}
});

export default router;
