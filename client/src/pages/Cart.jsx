import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components/header/Header';
import { useEffect, useState } from 'react';
import { fetchCart, removeProductFromCart, updateItemQuantity } from '../actions/cartActions';
import { ProductCard } from './shop/components/ProductCard';
import Pagination from '../components/pagination/Pagination';
import { HiOutlineTrash } from 'react-icons/hi';
import styles from './Cart.module.css';

export const Cart = () => {
  const { items, loading, error, totalPrice } = useSelector(state => state.cart);
  const token = localStorage.getItem('token');
  const [updatingQuantity, setUpdatingQuantity] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const onChangeQuantity = async (id, quantity) => {
    setUpdatingQuantity(true);
    await dispatch(updateItemQuantity(id, quantity));
    setUpdatingQuantity(false);
  };

  const onItemDelete = async id => {
    await dispatch(removeProductFromCart(id));
  };

  const isIncreaseAllowed = item => {
    const currentQuantity = item.quantity;
    const stock = item.product?.stock;
    if (stock === null) return true;
    return currentQuantity < stock;
  };

  if (loading) return <div>Загрузка корзины...</div>;
  if (error) return <div>Ошибка загрузки корзины: {error}</div>;

  return (
    <div>
      <Header />

      {items.length > 0 ? (
        <>
          <h3>Ваши товары:</h3>
          <div className={styles.cartProductContainer}>
            {items.map(item => {
              const isAddDisabled = !isIncreaseAllowed(item);
              return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <ProductCard product={item.product} />

                  <div className={styles.btnBlock}>
                    <div className={styles.quantity}>
                      <span
                        onClick={() => onChangeQuantity(item.product._id, -1)}
                        className={updatingQuantity ? styles.disabled : ''}
                        disabled={updatingQuantity}>
                        -
                      </span>
                      <span>{item.quantity}</span>
                      <span
                        onClick={() => !isAddDisabled && onChangeQuantity(item.product._id, 1)}
                        className={isAddDisabled || updatingQuantity ? styles.disabled : ''}
                        disabled={updatingQuantity}>
                        +
                      </span>
                    </div>
                    <span>
                      <HiOutlineTrash
                        style={{
                          color: 'tomato',
                          height: '24px',
                          width: '24px',
                          cursor: 'pointer',
                        }}
                        onClick={() => onItemDelete(item.product._id)}
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <h4>Добавлено товаров на сумму: {totalPrice} руб.</h4>
        </>
      ) : (
        <h2>Товары в вашей корзине отсутствуют</h2>
      )}
    </div>
  );
};
