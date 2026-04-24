import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticate(req, res, next) {
  try {
    const token = req.headers['authorization'].slice('Bearer '.length).trim();
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const verifiedToken = jwt.verify(token, JWT_SECRET);
    if (!verifiedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findOne({ _id: verifiedToken.id });
    if (!user) {
      res.send({ error: 'Authenticated User not found' });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}
