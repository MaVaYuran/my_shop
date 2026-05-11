import React from 'react';
import { Link } from 'react-router';
import styles from './ProductContainer.module.css';

export const ProductCard = ({ product, picture }) => {
  console.log('product in card', product);

  return (
    <Link to={`/products/${product.id}`} key={product.id} className={styles.productCard}>
      <span
        className={styles.picture}
        // onClick={e => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   toggleFavorite();
        // }}
      >
        {picture}
      </span>
      <img className={styles.productImage} alt="product foto" />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <div>{product.price} руб.</div>
      </div>
    </Link>
  );
};
