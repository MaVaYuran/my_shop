import { Outlet } from 'react-router';

export const Product = () => {
  return (
    <div>
      <div>Product</div>
      <div>Product edit page</div>
      <Outlet />
    </div>
  );
};
