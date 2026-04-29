import React from 'react';
import styles from './ProductContainer.module.css';
import { Link } from 'react-router';

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} key={product.id} className={styles.productCard}>
      <img className={styles.productImage} alt="product foto" />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <div>{product.price} руб.</div>
      </div>
    </Link>
  );
};
