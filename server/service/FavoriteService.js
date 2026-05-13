import mongoose from 'mongoose';
import { Favorite } from '../model/Favorite.js';
import { Product } from '../model/Product.js';

async function getFavoritesByUserId(userId) {
  const favoriteIds = await Favorite.findOne({ userId }).lean();
  if (!favoriteIds || !favoriteIds.productIds.length) {
    return [];
  }
  return favoriteIds.productIds.map(id => ({ productId: id }));
}

async function getFavoriteProductsByUserId(userId) {
  const favoriteItems = await Favorite.findOne({ userId })
    .populate('productIds', 'title price image description')
    .lean();

  return favoriteItems ? favoriteItems.productIds : [];
}

async function addToFavorite(userId, productId) {
  if (!userId || !productId) {
    throw new Error('userId  & productId обязательны');
  }
  const updated = await Favorite.findOneAndUpdate(
    { userId },
    { $addToSet: { productIds: productId } },
    { returnDocument: 'after', upsert: true },
  );
  return updated;
}

async function removeFromFavorite(userId, productId) {
  console.log('remove from favorite called');

  if (!userId || !productId) {
    throw new Error('userId  & productId обязательны');
  }
  const userObjectId = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : userId;
  const productObjectId = mongoose.Types.ObjectId.isValid(productId)
    ? new mongoose.Types.ObjectId(productId)
    : productId;

  const updated = await Favorite.findOneAndUpdate(
    {
      userId: userObjectId,
      productIds: productObjectId,
    },
    { $pull: { productIds: productObjectId } },
    { new: true },
  );
  console.log('updated', updated);
  if (!updated) {
    throw new Error('Товар не найден в избранном');
  }
  return updated;
}
export { getFavoritesByUserId, getFavoriteProductsByUserId, addToFavorite, removeFromFavorite };
