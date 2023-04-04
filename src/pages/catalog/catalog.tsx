import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import { ProductItem } from '../../types';
import { setProducts } from '../../store/slices/products-slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import catalogItems from '../../assets/catalog-items.json';
import CatalogList from '../../components/catalog-list/catalog-list';
import Sorting from '../../components/sorting/sorting';
import CareTypes from '../../components/care-types/care-types';
import Pagination from '../../components/pagination/pagination';
import { filterByCareType, getSortedItems } from '../../utils/utils';
import { filtersMethods } from '../../store/filters';
import { CATALOG_STORAGE_NAME, Storage } from '../../api/localstorage';
import GoBack from '../../components/go-back/go-back';
import FiltersBlock from '../../components/filters-block/filters-block';

import classes from './catalog.module.scss';
import '../../scss/style.scss';

export const FiltersContext = React.createContext('');

const ITEMS_PER_PAGE_COUNT = 15;
const ITEM_OFFSET_DEFAULT = 0;

const Catalog: React.FC = () => {
  const { sorting, careType, filters } = useTypedSelector((state) => state.filters);
  const products = useTypedSelector((state) => state.products.items);

  const dispatch = useDispatch();

  const [itemOffset, setItemOffset] = useState<number>(ITEM_OFFSET_DEFAULT);
  const [currentItems, setCurrentItems] = useState<ProductItem[]>(
    products.slice(ITEM_OFFSET_DEFAULT, ITEMS_PER_PAGE_COUNT),
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const [loadedItems, storageError] = Storage.getFromStorage(CATALOG_STORAGE_NAME);

    let filteredSortedProducts: ProductItem[] =
      loadedItems && !storageError ? loadedItems : catalogItems;
    filteredSortedProducts = getSortedItems(filteredSortedProducts, sorting);
    filteredSortedProducts = filterByCareType(filteredSortedProducts, careType);

    for (let filter in filters) {
      const filterMethod = filtersMethods[filter].bind(filters[filter]);
      filteredSortedProducts = filterMethod(filteredSortedProducts);
    }

    dispatch(setProducts(filteredSortedProducts));
    setCurrentItems(filteredSortedProducts.slice(ITEM_OFFSET_DEFAULT, ITEMS_PER_PAGE_COUNT));
    setCurrentPage(0);
  }, [sorting, careType, filters]);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    catalogItems && (
      <div className={classes.mainWrapper}>
        {isMobile ? (
          <GoBack className={classes.goBack} />
        ) : (
          <div className={`${classes.breadcrumbs} breadcrumbs`}>
            <Link className="breadcrumbsItem" to="/">
              Главная
            </Link>
            <span className="breadcrumbsItem">Каталог</span>
          </div>
        )}
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>Каталог</h1>
          {!isMobile && <Sorting />}
        </div>
        {!isMobile && <CareTypes className={classes.careTypes} />}
        <FiltersBlock className={classes.filters} />
        {!!currentItems.length ? (
          <CatalogList items={currentItems} className={classes.catalog} />
        ) : (
          <h2 className={classes.notFound}>Товары не найдены</h2>
        )}

        <Pagination
          className={classes.pagination}
          items={products}
          itemsPerPage={ITEMS_PER_PAGE_COUNT}
          setCurrentItems={setCurrentItems}
          setItemOffset={setItemOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    )
  );
};

export default Catalog;
