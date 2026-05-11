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
// import { addFavorite, fetchFavorite, removeFavorite } from '../../../actions/favoriteActions.js';

export const ProductsContainer = ({ selectedCategory, currentPage, setCurrentPage, userId }) => {
  const { products, pagination, loading, error } = useSelector(state => state.products);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProducts({ categoryId: selectedCategory, search: debouncedSearch, page: currentPage }),
    );
  }, [dispatch, selectedCategory, debouncedSearch, currentPage]);

  // const isFavorite = productId => {
  //   return favoriteItems.some(item => item.id === productId);
  // };

  // const toggleFavorite = product => {
  //   if (isFavorite(product.id)) {
  //     dispatch(removeFavorite(userId, product.id));
  //   } else {
  //     dispatch(addFavorite(userId, product));
  //   }
  // };

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
              product={product}
              // toggleFavorite={() => toggleFavorite(product)}
              // isFavorite={isFavorite(product.id)}
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
