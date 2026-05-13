import React from 'react';
import { Link } from 'react-router';
import styles from './ProductContainer.module.css';

export const ProductCard = ({ product, picture, isFavorite, handdleFavorite }) => {
  return (
    <Link to={`/products/${product.id}`} key={product.id} className={styles.productCard}>
      <span
        className={`${isFavorite ? styles.activeFavorite : ''} ${styles.picture}`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handdleFavorite();
        }}>
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
