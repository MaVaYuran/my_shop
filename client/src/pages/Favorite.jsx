import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './shop/components/ProductCard';
import styles from './Favorite.module.css';
import { Header } from '../components/header/Header';
import { removeFavorite, fetchFavorite } from '../actions/favoriteActions';

export const Favorite = () => {
  const { items: favoriteItems, loading, error } = useSelector(state => state.favorite);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log('favor', favoriteItems);

  useEffect(() => {
    if (isAuthenticated && user.id) {
      dispatch(fetchFavorite(user.id));
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

  if (loading) return <div>Загрузка избранного</div>;
  if (error) return <div>Ошибка загрузки: {error}</div>;

  return (
    <>
      <Header />
      <div className={styles.container}>
        {favoriteItems.length > 0 ? (
          favoriteItems.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              toggleFavorite={() => dispatch(removeFavorite(item.id, user.id))}
              isFavorite={true}
            />
          ))
        ) : (
          <div>В избранном пока нет товаров</div>
        )}
      </div>
    </>
  );
};
