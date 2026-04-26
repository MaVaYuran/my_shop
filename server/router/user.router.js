import { Router } from 'express';
import { getAll, edit, remove } from '../controller/UserController.js';

const router = Router();
router.get('/', getAll);
router.patch('/:id/edit', edit);
router.delete('/:id', remove);

export default router;
