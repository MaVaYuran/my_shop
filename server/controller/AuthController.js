import { createUser, findUserByEmail, findUserById } from '../service/AuthService.js';
import { mapUser } from '../utils/userMapper.js';
import bcrypt from 'bcryptjs';
const JWT_SECRET = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken';

// async function login(req, res) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email & password are required' });
//     }
//     const user = await userService.findUserByEmail(email);
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.status(200).json({ token, user: mapUser(user) });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// }
// async function register(req, res) {
//   try {
//     const { email, password, name } = req.body;
//     if (!email || !password || !name) {
//       return res.status(400).json({ message: 'Email, password & name  are required' });
//     }
//     const isExisting = userService.findUserByEmail(email);
//     if (isExisting) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await userService.createUser({ email, password: hashedPassword, name });
//     const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.status(201).json({ token, user: mapUser(user) });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// }
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email & password are required' });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: mapUser(user) });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
async function register(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password & name  are required' });
    }
    const isExisting = await findUserByEmail(email);
    if (isExisting) {
      return res.status(400).json({ message: 'User alresdy exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword, name });
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: mapUser(user) });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
function logout(req, res) {
  res.status(204).send();
}

async function getMe(req, res) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: mapUser(user) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { register, login, logout, getMe };
