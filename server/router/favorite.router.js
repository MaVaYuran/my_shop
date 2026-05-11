import { Router } from 'express';
import {
  getFavorites,
  addFavoriteItem,
  deleteFavoriteItem,
} from '../controller/FavoriteController.js';

const router = Router();
router.get('/:userId', getFavorites);
router.post('/add', addFavoriteItem);
router.delete('/', deleteFavoriteItem);

export default router;
