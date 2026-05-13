import { Router } from 'express';
import {
  getFavorites,
  addFavoriteItem,
  deleteFavoriteItem,
  getFavoriteProducts,
} from '../controller/FavoriteController.js';

const router = Router();
router.get('/ids/:userId', getFavorites);
router.get('/products/:userId', getFavoriteProducts);
router.post('/add', addFavoriteItem);
router.delete('/', deleteFavoriteItem);

export default router;
