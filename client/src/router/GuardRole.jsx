import { Navigate } from 'react-router';
// import roles from '../constants/roles';
import { useSelector } from 'react-redux';

export const GuardRole = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  let role;
  if (user) {
    role = user.role;
  }
  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};
