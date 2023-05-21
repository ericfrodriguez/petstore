import express from 'express';
import { getAll, getById, create } from '../controllers/pet/index.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:petId', getById);
router.post('/', create);

export default router;