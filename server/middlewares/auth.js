import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';
const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticate(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return (res.status(401), json({ error: 'Unauthorized', message: 'No token provided' }));
  }

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: verifiedToken.id });
    if (!user) {
      res.send({ error: 'Authenticated User not found' });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: 'JWT verification error' });
  }
}
