import { Favorite } from '../model/Favorite.js';
import { Product } from '../model/Product.js';

async function getFavoritesByUserId(userId) {
  const favoriteItems = await Favorite.findOne({ userId });
  if (!favoriteItems || !favoriteItems.productIds.length) {
    return [];
  }
  const products = await Product.find({ _id: { $in: favoriteItems.productIds } }).lean();
  return products;
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
  if (!userId || !productId) {
    throw new Error('userId  & productId обязательны');
    const updated = await Favorite.findOneAndUpdate(
      { userId },
      { $pull: { productIds: productId } },
      { returnDocument: 'after' },
    );

    if (!updated) {
      throw new Error('Товар не найден в избранном');
    }
    return updated;
  }
}
export { getFavoritesByUserId, addToFavorite, removeFromFavorite };
