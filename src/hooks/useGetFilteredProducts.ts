import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import catalogItems from '../assets/catalog-items.json';
import { CATALOG_STORAGE_NAME, Storage } from '../api/localstorage';
import { filtersMethods } from '../store/filters';
import { Filters, ProductItem, SortingOption } from '../types';
import { filterByCareType, getSortedItems } from '../utils/utils';
import { setProducts } from '../store/slices/products-slice';
import { ITEMS_PER_PAGE_COUNT, ITEM_OFFSET_DEFAULT } from '../pages/catalog/catalog';

export function useGetFilteredProducts(
  {sorting, careType, filters}:
  {sorting: SortingOption, careType: number | null, filters: Filters},
  setCurrentItems: React.Dispatch<React.SetStateAction<ProductItem[]>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  ) {
  const dispatch = useDispatch();

  useEffect(() => {
    const [loadedItems, storageError] = Storage.getFromStorage(CATALOG_STORAGE_NAME);

    let filteredSortedProducts: ProductItem[] =
      loadedItems && loadedItems.length && !storageError ? loadedItems : catalogItems;
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
}
