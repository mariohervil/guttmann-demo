import { Request, Response, NextFunction } from 'express';
import ISession from '../utils/customSession';

const requirePrivilege =
	(requiredPrivilege: Number) => (request: Request, response: Response, next: NextFunction) => {
		const session: ISession = request.session;
		if (session?.role! < requiredPrivilege) {
			return response.status(403).send('Forbidden');
		}
		next();
	};

export default requirePrivilege;
