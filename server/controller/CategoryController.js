import { getCategories, add, deleteById } from '../service/CategoryService.js';

async function getAll(req, res) {
  try {
    const categories = await getCategories();
    res.status(200).json({ error: null, data: categories });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Unknown error' });
  }
}
async function addCategory(req, res) {
  try {
    const newCategory = await add(req.body.title);
    res.status(200).json({ error: null, data: newCategory });
  } catch (e) {
    console.log(e);

    res.status(500).json({ error: e.message || 'Unknown error' });
  }
}
async function deleteCategory(req, res) {
  try {
    await deleteById(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message || 'Unknown error' });
  }
}
export { getAll, addCategory, deleteCategory };
