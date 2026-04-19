import { registration, loginUser } from '../service/AuthService.js';
import { mapUser } from '../utils/userMapper.js';

async function register(req, res) {
  try {
    const { user, token } = await registration(req.body.email, req.body.password, req.body.name);
    res.status(201).json({ error: null, user: mapUser(user) });
  } catch (e) {
    console.log(e);

    res.status(400).json({ error: e.message || 'Unknown error' });
  }
}
async function login(req, res) {
  try {
    const { user, token } = await loginUser(req.body.email, req.body.password);
    res.status(200).json({ error: null, user: mapUser(user), token });
  } catch (e) {
    console.log(e);

    res.status(400).json({ error: e.message || 'Unknown error' });
  }
}
function logout(req, res) {
  (res.cookie('token', token), { httpOnly: true }).send({});
}

export { register, login, logout };
