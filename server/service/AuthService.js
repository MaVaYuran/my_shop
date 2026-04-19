import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET;

async function registration(email, password, name) {
  if (!password || !email) {
    throw new Error('Field is required');
  }
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new Error('Пользователь с таким адресом уже существует');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashPassword, name });
  user.save();
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return { user, token };
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not fount');
  }
  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    throw new Error('Wrong password');
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

  return { user, token };
}
export { registration, loginUser };
