import { User } from '../model/User.js';

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getUserById(id) {
  try {
    return await User.findById(id);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function editUser(id, dto) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return await User.findUserByIdAndUpdate(id, dto, { new: true });
  } catch (e) {
    throw new Error(e.message);
  }
}

async function removeUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await User.findByIdAndDelete(id);
  } catch (e) {
    throw new Error(e.message);
  }
}

export { getAllUsers, getUserById, editUser, removeUser };
