import { Product } from '../model/Product.js';

async function getAllProducts(categoryId = null, search = '', limit = 6, page = 1) {
  const query = {};
  if (categoryId) {
    query.categories = categoryId;
  }

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  try {
    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ title: -1 })
        .populate('categories', 'title'),
      Product.countDocuments(query),
    ]);
    return {
      products,
      pagination: { currentPage: page, lastPage: Math.ceil(totalCount / limit), totalCount },
    };
  } catch (e) {
    console.log('Ошибка при получении списка товаров', e);

    throw new Error('Товары не найдены');
  }
}

async function getProductById(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function createProduct(dto) {
  try {
    const product = await Product.create({ ...dto });
    product.save();
    return product;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function editProduct(id, dto) {
  try {
    const product = Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, dto, { returnDocument: 'after' });
    return updatedProduct;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function removeProduct(id) {
  try {
    const product = Product.findById(id);
    if (!product) {
      throw new Error('Товар не найден');
    }
    await Product.findByIdAndDelete(id);
  } catch (e) {
    throw new Error(e.message);
  }
}

export { getAllProducts, getProductById, createProduct, editProduct, removeProduct };
