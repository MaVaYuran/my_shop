import { useEffect, useState } from 'react';
import { Header } from '../../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Shop.module.css';
import { deleteCategory, fetchCategories } from '../../actions/categoryActions';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { ProductsContainer } from './components/ProductsContainer';
import roles from '../../constants/roles';
import { HiOutlineTrash } from 'react-icons/hi';

export const ShopLayout = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const authUser = useSelector(state => state.auth.user);
  const accessedUser = authUser && authUser.role === roles.ADMIN;

  console.log('authUser', authUser);
  console.log('accessed', accessedUser);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClickCategory = categoryId => {
    setSelectedCategory(categoryId);
    console.log('Selected category', selectedCategory);
    setCurrentPage(1);
  };
  const onDeleteCategory = async id => {
    await dispatch(deleteCategory(id));
  };
  if (loading) return <div>Loading categories...</div>;
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
              <div className={styles.categoryContainer}>
                <Button
                  key={category.id}
                  type="button"
                  title={category.title}
                  isActive={selectedCategory === category.id}
                  onClick={() => handleClickCategory(category.id)}
                />
                {accessedUser && (
                  <span onClick={() => onDeleteCategory(category.id)}>
                    <HiOutlineTrash />
                  </span>
                )}
              </div>
            ))}
          </div>
        </aside>
        <ProductsContainer
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          userId={authUser ? authUser.id : null}
        />
      </div>
    </>
  );
};
