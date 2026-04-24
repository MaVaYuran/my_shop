import { User } from '../model/User.js';

// async function registration(email, password, name) {

//   const candidate = await User.findOne({ email });
//   if (candidate) {
//     throw new Error('Пользователь с таким адресом уже существует');
//   }
//   const hashPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({ email, password: hashPassword, name });
//   user.save();
//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
//   return { token, user };
// }

// async function loginUser(email, password) {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error('User not found');
//   }

//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

//   return { token, user };
// }
async function createUser(dto) {
  try {
    const newUser = await User.create({ ...dto });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function findUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { createUser, findUserByEmail, findUserById };
