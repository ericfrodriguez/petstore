import express from 'express';
import petsRouter from './pets.router.js';

const router = express.Router();

router.use('/pets', petsRouter);

export default router;