import { Category } from '../model/Category.js';

async function getCategories() {
  try {
    return await Category.find();
  } catch (e) {
    throw new Error(e.message);
  }
}

async function add(title) {
  try {
    const category = await Category.create({ title });
    category.save();
    return category;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function deleteById(id) {
  try {
    const category = await Category.findById(id);

    if (!category) {
      throw new Error('Группа товаров не найдена');
    }
    await Category.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);

    throw new Error(e.message);
  }
}

export { getCategories, add, deleteById };
