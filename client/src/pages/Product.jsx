import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router';
import { getProduct } from '../actions/productsActions';
import roles from '../constants/roles';
import { Button } from '../components/button/Button';
import { ProductForm } from './ProductForm';
import { Header } from '../components/header/Header';
import { addToCart } from '../actions/cartActions';

export const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);
  const categories = useSelector(state => state.category.categories);
  const [isEditing, setIsEditing] = useState(false);
  const cartItems = useSelector(state => state.cart.items || []);
  const isItemInCart = () => {
    if (!selectedProduct?.id) return false;
    return cartItems.some(item => {
      console.log('ID1', item.product._id);
      console.log('ID2', selectedProduct.id);

      return item.product._id === selectedProduct.id;
    });
  };
  console.log('ProductI', cartItems);

  let role = null;
  if (user !== null) {
    role = user.role;
  }

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  const onAddToCart = id => {
    dispatch(addToCart(id));
  };

  if (loading) return <div>Loading product</div>;
  if (error) return <div>Error {error}</div>;
  if (!selectedProduct) return <div>Product not found</div>;

  return (
    <div>
      <Header />
      {role === roles.ADMIN && (
        <Button type="button" title="Обновить товар" onClick={() => setIsEditing(prev => !prev)} />
      )}
      {!isEditing ? (
        <>
          <h2>Товар:</h2>
          <h3>{selectedProduct.title}</h3>
          <p>{selectedProduct.description}</p>
          <h4>Цена: {selectedProduct.price} руб.</h4>
          {selectedProduct.stock > 0 ? (
            <p>На складе: {selectedProduct.stock}</p>
          ) : (
            <p>Товара нет в продаже</p>
          )}
          <br />
          {role !== null ? (
            isItemInCart() ? (
              <span>Товар уже в корзине</span>
            ) : (
              <span onClick={() => onAddToCart(selectedProduct.id)}>Добавить в корзину</span>
            )
          ) : (
            <p>
              Чтобы иметь возможность заказать товар
              <Link to={'/login'} style={{ color: 'rgb(89, 56, 115)' }}>
                войдите в свой аккаунт
              </Link>
            </p>
          )}
        </>
      ) : (
        <ProductForm
          categories={categories}
          initialData={selectedProduct}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
