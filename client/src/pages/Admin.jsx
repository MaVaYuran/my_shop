import { NavLink } from 'react-router';
import { Button } from '../components/button/Button';
import { Header } from '../components/header/Header';
import { useDispatch } from 'react-redux';
import { addCategory } from '../actions/categoryActions';

export const Admin = () => {
  const dispatch = useDispatch();
  const onCreateCategory = () => {
    const title = prompt('Enter the title:');
    const categoryTitle = title.trim();
    if (categoryTitle) {
      const category = dispatch(addCategory(categoryTitle));
      console.log('category was created:', category);
    }
  };
  return (
    <div>
      <Header />
      <div>Admin</div>
      <span onClick={onCreateCategory}>Create category</span>
    </div>
  );
};
