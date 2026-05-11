import {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  removeProduct,
} from '../service/ProductService.js';
import { mapProduct } from '../utils/productMapper.js';
import { getFavorites } from './FavoriteController.js';

async function getAll(req, res) {
  try {
    const categoryId = req.query.categoryId || null;

    const search = req.query.search || '';

    const limit = parseInt(req.query.limit) || 6;

    const page = parseInt(req.query.page) || 1;

    if (limit < 1 || page < 1) {
      res.status(400).json({ error: 'Некорректные параметры пагинации' });
    }
    const searchResult = await getAllProducts(categoryId, search, limit, page);
    console.log('searchResult', searchResult);

    res.status(200).json({
      error: null,
      data: searchResult.products.map(mapProduct),
      pagination: searchResult.pagination,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getOne(req, res) {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json({ error: null, data: mapProduct(product) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json({ error: null, data: newProduct });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}

async function edit(req, res) {
  try {
    const updatedProduct = await editProduct(req.params.id, req.body);
    res.status(200).json({ error: null, data: mapProduct(updatedProduct) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    await removeProduct(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export { getAll, getOne, create, edit, remove };
