import React from 'react';

import { ProductItem } from '../../types';
import CatalogItem from '../catalog-item/catalog-item';

import classes from './catalog-list.module.scss';

interface ICatalogListProps {
  items: ProductItem[];
  className: string;
}

const CatalogList: React.FC<ICatalogListProps> = ({ items, className }) => {
  const additionalClassName = className ? ` ${className}` : '';

  return (
    <section className={`${classes.catalog}${additionalClassName}`}>
      {!!items && items.map((item) => <CatalogItem key={item.barcode} item={item} />)}
    </section>
  );
};

export default CatalogList;
