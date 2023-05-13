import { Request, Response } from 'express';
import express from 'express';
import Patient, { IPatient } from '../models/user.model';
import Account from '../models/account.model';
import { encrypt, compareEncryption } from '../utils/encryption';
import requirePrivilege from '../middleware/requirePrivileges.middleware';
import requireAuth from '../middleware/requireAuth.middleware';

const router = express.Router();

router.delete('/accounts', (req: Request, res: Response) => {});

router.get(
	'/accounts',
	[requirePrivilege(2), requireAuth()],
	async (req: Request, res: Response) => {
		const accounts = await Account.find({ role: { $gt: 0 } });
		res.send(accounts);
	}
);

router.get('/patients', requirePrivilege(1), async (req: Request, res: Response) => {
	const patients = await Patient.find();
	res.send(patients);
});

export default router;
