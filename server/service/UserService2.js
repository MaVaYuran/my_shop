import { User } from '../model/User';

class UserService {
  async createUser(dto) {
    try {
      const newUser = await User.create({ ...dto });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const userService = new UserService();
