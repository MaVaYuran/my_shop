import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';
import { getProduct } from '../actions/productsActions';
import roles from '../constants/roles';
import { Button } from '../components/button/Button';
import ProductForm from './ProductForm';
import { Header } from '../components/header/Header';

export const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.products);
  const { role } = useSelector(state => state.auth.user);
  const categories = useSelector(state => state.category.categories);
  const [isEditing, setIsEditing] = useState(false);
  console.log('product categ', categories);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  const onAddToCart = () => {
    //TODO
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
          <h2>Product:</h2>
          <h3>{selectedProduct.title}</h3>
          <p>{selectedProduct.description}</p>
          <h4>{selectedProduct.price}</h4>
          {selectedProduct.stock > 0 ? (
            <p>На складе: {selectedProduct.stock}</p>
          ) : (
            <p>Товара нет в продаже</p>
          )}
          <br />

          <span onClick={onAddToCart}>Добавить в корзину</span>
        </>
      ) : (
        <ProductForm categories={categories} initialData={selectedProduct} />
      )}
    </div>
  );
};
