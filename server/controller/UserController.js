import { getAllUsers, getUserById, editUser, removeUser } from '../service/UserService.js';

async function getAll(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({ error: null, data: users });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.mesage });
  }
}

async function getById(req, res) {
  try {
    const user = await getUserById(req.params.id);
    res.status(201).json({ error: null, data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function edit(req, res) {
  try {
    const updatedUser = await editUser(req.params.id, req.body);
    res.status(201).json({ error: null, data: updatedUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function remove(req, res) {
  try {
    const updatedUser = await removeUser(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export { getAll, getById, edit, remove };
