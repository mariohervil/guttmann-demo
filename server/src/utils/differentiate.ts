import { Request } from 'express';
import User from '../models/user.model';
import Account from '../models/account.model';

/**
 *
 * @param {Request} request
 * Promise.race returns one of two models depending on which promise is fulfilled first.
 * If there's not a User model with that username but there's an Account model with that username,
 * the Account model will be returned.
 *
 */
const userOrAccount = async (request: Request) => {
	const username = request.body.username!;
	return await Promise.race([User.findOne({ username }), Account.findOne({ username })]);
};
export default userOrAccount;
