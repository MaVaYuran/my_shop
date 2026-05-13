import { Router } from 'express';
import authRouter from './auth.router.js';
import productRouter from './product.router.js';
import userRouter from './user.router.js';
import categoryRouter from './category.router.js';
import cartRouter from './cart.router.js';
import favoriteRouter from './favorite.router.js';
const router = Router({ mergeParams: true });

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/favorite', favoriteRouter);

export default router;
