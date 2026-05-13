import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../../hook/useDebounce';
import { fetchProducts } from '../../../actions/productsActions.js';
import { HiOutlineHeart } from 'react-icons/hi';
import Pagination from '../../../components/pagination/Pagination.jsx';
import { Input } from '../../../components/input/Input.jsx';
import { Link } from 'react-router';
import { ProductCard } from './ProductCard.jsx';
import styles from './ProductContainer.module.css';
import { addFavorite, fetchFavorite, removeFavorite } from '../../../actions/favoriteActions.js';

export const ProductsContainer = ({ selectedCategory, currentPage, setCurrentPage, userId }) => {
  const { products, pagination, loading, error } = useSelector(state => state.products);
  const favoriteItems = useSelector(state => state.favorite.items);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryId: selectedCategory,
        search: debouncedSearch,
        page: currentPage,
        userId,
      }),
    );
    if (userId) dispatch(fetchFavorite(userId));
  }, [dispatch, selectedCategory, debouncedSearch, currentPage, userId]);
  console.log('favoriteItems', favoriteItems);

  const toggleFavorite = product => {
    if (!userId) {
      alert('Для добавления в избранное необходимо авторизироваться');
      return;
    }
    try {
      if (product.isFavorite) {
        dispatch(removeFavorite(userId, product.id));
      } else {
        dispatch(addFavorite(userId, product));
      }
      dispatch(
        fetchProducts({
          categoryId: selectedCategory,
          search: debouncedSearch,
          page: currentPage,
          userId,
        }),
      );
    } catch (error) {
      console.error('Ошибка при добавлении в избранное', error);
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.mainContainer}>
      <Input
        label=""
        type="text"
        title="search"
        value={search}
        placeholder="Поиск товара..."
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className={styles.productsList}>
        {products && products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={product.isFavorite}
              handdleFavorite={() => toggleFavorite(product)}
              picture={<HiOutlineHeart />}
            />
          ))
        ) : (
          <div>Товары не найдены</div>
        )}
      </div>
      {pagination && (
        <Pagination
          currentPage={currentPage}
          lastPage={pagination.lastPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
