import { Navigate } from 'react-router';
import roles from '../constants/roles';

export const GuardRole = ({ allowedRoles, children }) => {
  const role = roles.ADMIN;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};
