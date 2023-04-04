import React from 'react';
import ReactPaginate from 'react-paginate';
import { ProductItem } from '../../types';

import classes from './pagination.module.scss';

interface IPaginationProps {
  className?: string;
  items: ProductItem[];
  itemsPerPage: number;
  setCurrentItems: (items: ProductItem[]) => void;
  currentPage: number;
  setItemOffset: (newOffset: number) => void;
  setCurrentPage: (pageNumber: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  className,
  items,
  itemsPerPage,
  setCurrentItems,
  currentPage,
  setItemOffset,
  setCurrentPage,
}) => {
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }): void => {
    const newOffset = (e.selected * itemsPerPage) % items.length;
    const endOffset = newOffset + itemsPerPage;
    setItemOffset(newOffset);
    setCurrentItems(items.slice(newOffset, endOffset));
    setCurrentPage(e.selected);
  };

  const additionalClassName = className ? ` ${className}` : '';

  return (
    <>
      <ReactPaginate
        className={`${classes.pagination}${additionalClassName}`}
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=""
        forcePage={currentPage}
        renderOnZeroPageCount={() => {}}
      />
    </>
  );
};

export default Pagination;
