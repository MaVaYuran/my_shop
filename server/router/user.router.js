import { Router } from 'express';
import { getAll, getById, edit, remove } from '../controller/UserController.js';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id/edit', edit);
router.delete('/:id', remove);

export default router;
