import { useEffect, useState } from 'react';
import { Header } from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import styles from './Shop.module.css';
import { fetchCategories } from '../actions/categoryActions';
import Pagination from '../components/pagination/Pagination';
import { Input } from '../components/input/Input';
import { Button } from '../components/button/Button';

export const Shop = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector(state => state.product);
  const {
    categories,
    loading: categLoading,
    error: categError,
  } = useSelector(state => state.category);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ categoryId: selectedCategory, search, page: currentPage }));
  }, [dispatch, selectedCategory, search, currentPage]);
  console.log('prod length', products.length);

  const handleClickCategory = categoryId => {
    console.log('Metjod called');

    setSelectedCategory(categoryId);
    console.log('Selected category', selectedCategory);

    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  if (categLoading) return <div>Loading categories...</div>;
  if (categError) return <div>Error: {categError}</div>;
  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h3>Категории</h3>
          <div className={styles.categoryList}>
            <Button
              type="button"
              title="Все товары"
              isActive={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map(category => (
              <div>
                <Button
                  key={category.id}
                  type="button"
                  title={category.title}
                  isActive={selectedCategory === category.id}
                  onClick={() => handleClickCategory(category.id)}
                />
              </div>
            ))}
          </div>
        </aside>
        <div className={styles.mainContainer}>
          <Input
            label="Поиск"
            type="text"
            title="search"
            value={search}
            placeholder="Поиск товара..."
            onChange={e => setSearch(e.target.value)}
          />
          <div className={styles.productsList}>
            {products && products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <img className={styles.productImage} alt="product foto" />
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <div>{product.price}</div>
                </div>
              ))
            ) : (
              <div>Товары не найдены</div>
            )}
          </div>
        </div>

        {pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};
