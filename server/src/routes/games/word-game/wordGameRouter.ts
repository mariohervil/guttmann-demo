import express from 'express';
import gameConfigRouter from '../../gameConfig';
const router = express.Router();

router.use('/config', gameConfigRouter);

export default router;
