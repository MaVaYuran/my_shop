import React from 'react';
import styles from './Pagination.module.css';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Button } from '../button/Button';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  return (
    <div className={styles.paginationContainer}>
      {currentPage !== 1 && (
        <>
          <Button
            // disabled={currentPage === 1}
            title={1}
            type="button"
            onClick={() => onPageChange(1)}
          />
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            // disabled={currentPage === 1}
            title={<HiChevronLeft />}
            type="button"
          />
        </>
      )}

      <span className={styles.current}>{currentPage}</span>

      {currentPage !== lastPage && (
        <>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            title={<HiChevronRight />}
            type="button"
          />
          <Button title={lastPage} type="button" onClick={() => onPageChange(lastPage)} />
        </>
      )}
    </div>
  );
};

export default Pagination;
