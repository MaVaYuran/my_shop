import { Auth, CustomerPage, Cart, Product, Admin, ShopLayout, ProductEdit } from '../pages';

import roles from '../constants/roles';
import { wrappedRoutes } from './wrappedRoutes';

export const routeConfig = [
  {
    path: '/',
    element: <ShopLayout />,
  },
  { path: '/register', element: <Auth isRegister={true} /> },
  { path: '/login', element: <Auth isRegister={false} /> },
  { path: '/admin', element: <Admin />, roles: [roles.ADMIN] },
  {
    path: '/products/:id',
    element: <Product />,
    children: [{ path: 'edit', element: <ProductEdit />, roles: [roles.ADMIN] }],
  },
  {
    path: '/users/:id',
    element: <CustomerPage />,
    roles: [roles.ADMIN, roles.CUSTOMER],
  },
  { path: '/cart', element: <Cart />, roles: [roles.CUSTOMER] },
];

export const buildingRoutes = routeConfig => {
  return routeConfig.map(route => ({
    path: route.path,
    element: wrappedRoutes(route),
    children: route.children ? buildingRoutes(route.children) : null,
  }));
};
