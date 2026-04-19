import { GuardRole } from './GuardRole';

export const wrappedRoutes = route => {
  let element = route.element;
  if (route.roles) {
    element = <GuardRole allowedRoles={route.roles}>{element}</GuardRole>;
  }
  return element;
};
