import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controller/CartController.js';

const router = Router();
router.use(authenticate);

router.get('/', getCart);
router.post('/add', addToCart);
router.patch('/edit', updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.post('/clear', clearCart);

export default router;
