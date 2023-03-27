import { Request, Response } from 'express';
import express from 'express';
import User, { IUser } from '../models/user.model';
import { encrypt, compareEncryption } from '../utils/encryption';

const router = express.Router();

router.delete('users/delete', (request: Request, response: Response) => {});
