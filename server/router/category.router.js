import { Router } from 'express';
import { getAll, addCategory, deleteCategory } from '../controller/CategoryController.js';
import { authenticate } from '../middlewares/auth.js';
import roles from '../constants/roles.js';
import { hasRole } from '../middlewares/hasRole.js';

const router = Router();
router.get('/', authenticate, hasRole([roles.ADMIN]), getAll);
router.post('/new', authenticate, hasRole([roles.ADMIN]), addCategory);
router.delete('/:id', authenticate, hasRole([roles.ADMIN]), deleteCategory);

export default router;
