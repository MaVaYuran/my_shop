import { Router } from 'express';
import { getAll, getOne, create, edit, remove } from '../controller/ProductController.js';
import { optionalAuthenticate } from '../middlewares/auth.js';

const router = Router();

router.get('/', optionalAuthenticate, getAll);
router.get('/:id', getOne);
router.post('/new', create);
router.patch('/:id/edit', edit);
router.delete('/:id', remove);

export default router;
