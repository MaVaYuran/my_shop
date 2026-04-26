import { NavLink } from 'react-router';
import { Button } from '../components/button/Button';
import { Header } from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../actions/categoryActions';
import { useState } from 'react';
import { Input } from '../components/input/Input';
import ProductForm from './ProductForm';
import styles from './Admin.module.css';

export const Admin = () => {
  const [openProductForm, setOpenProductForm] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);
  console.log('categories state', categories);

  const onCreateCategory = () => {
    const title = prompt('Enter the title:');
    const categoryTitle = title.trim();
    if (categoryTitle) {
      const category = dispatch(addCategory(categoryTitle));
      console.log('category was created:', category);
    }
  };

  const onCreateProduct = () => {
    setOpenProductForm(prev => !prev);
  };
  return (
    <div>
      <Header />
      <div>Admin</div>
      <div className={styles.btnContainer}>
        <Button onClick={onCreateCategory} type="button" title="Create category" />
        <Button onClick={onCreateProduct} type="button" title="Create product" />
      </div>
      {openProductForm && <ProductForm categories={categories} />}
    </div>
  );
};
