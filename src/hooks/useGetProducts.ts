import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setProducts } from "../store/slices/products-slice";
import { CATALOG_STORAGE_NAME, Storage } from "../api/localstorage";
import catalogItems from '../assets/catalog-items.json';

export function useGetProducts(): void {
  const dispatch = useDispatch();

  useEffect(() => {
    const [loadedItems] = Storage.getFromStorage(CATALOG_STORAGE_NAME);

    if (loadedItems && loadedItems.length) {
      dispatch(setProducts(loadedItems));
      return;
    }

    dispatch(setProducts(catalogItems));
    Storage.saveToStorage(catalogItems, CATALOG_STORAGE_NAME);
  }, []);
}
