import { Request, Response, NextFunction } from 'express';
import ISession from '../utils/customSession';

const requireAuth = () => (request: Request, response: Response, next: NextFunction) => {
	const session: ISession = request.session;
	if (!session.username) {
		return response.status(401).send(false);
	}
	next();
};

export default requireAuth;
