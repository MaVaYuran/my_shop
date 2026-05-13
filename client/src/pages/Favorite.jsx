import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './shop/components/ProductCard';
import { Header } from '../components/header/Header';
import { removeFavorite, fetchFavoriteProducts } from '../actions/favoriteActions';
import { Button } from '../components/button/Button';
import { HiTrash } from 'react-icons/hi';
import styles from './Favorite.module.css';

export const Favorite = () => {
  const { favoriteProducts, productsLoading, productsError } = useSelector(state => state.favorite);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user.id) {
      console.log('fetchfavorite called');

      dispatch(fetchFavoriteProducts(user.id));
    }
  }, [dispatch, isAuthenticated, user.id]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div>Пожалуйста авторизируйтесь для просмотра избранного</div>
      </>
    );
  }

  const deleteFromFavorite = async id => {
    await dispatch(removeFavorite(user.id, id));
    dispatch(fetchFavoriteProducts(user.id));
  };

  if (productsLoading) return <div>Загрузка избранного...</div>;
  if (productsError) return <div>Ошибка загрузки избранного: {productsError}</div>;

  return (
    <>
      <Header />
      <div className={styles.container}>
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              handdleFavorite={() => deleteFromFavorite(item._id)}
              isFavorite={true}
              picture={<HiTrash />}
            />
          ))
        ) : (
          <div>В избранном пока нет товаров</div>
        )}
      </div>
    </>
  );
};
