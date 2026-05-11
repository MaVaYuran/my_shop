import {
  getFavoritesByUserId,
  addToFavorite,
  removeFromFavorite,
} from '../service/FavoriteService.js';

async function getFavorites(req, res) {
  try {
    const userId = req.params.userId;
    const data = await getFavoritesByUserId(userId);
    res.status(200).json({ data });
  } catch (error) {
    console.error('Fetching favorite error', error);
    res.status(500).json({ message: 'Ошибка загрузки избранного' });
  }
}

async function addFavoriteItem(req, res) {
  try {
    const { userId, productId } = req.body;
    const updatedFavorite = await addToFavorite(userId, productId);
    res.status(201).json({ message: 'Товар добавлен в избранное', data: updatedFavorite });
  } catch (error) {
    if (error.message.includes('обязательны')) {
      res.status(400).json({ message: error.message });
    }
    console.error('Adding to favorite error', error);
    res.status(500).json({ message: 'Ошибка добавления в избранное' });
  }
}
async function deleteFavoriteItem(req, res) {
  try {
    const { userId, productId } = req.body;
    await removeFromFavorite(userId, productId);
    res.status(204).json({ message: 'Товар удалён из избранного' });
  } catch (error) {
    if (error.message === 'Товар не найден в избранном') {
      res.status(404).json({ message: error.message });
    }
    console.error('Error removing from favorite', error);
    res.status(500).json({ message: 'Ошибка удаления из избранного' });
  }
}

export { getFavorites, addFavoriteItem, deleteFavoriteItem };
