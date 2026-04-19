export function hasRole(roles) {
  return (req, res, next) => {
    console.log('role:', req.user.role);
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    next();
  };
}
