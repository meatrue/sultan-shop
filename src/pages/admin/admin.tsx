import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import catalogItems from '../../store/catalog-items.json';
import { CATALOG_STORAGE_NAME, Storage } from '../../api/localstorage';
import AddProductForm from '../../components/admin/add-product-form';
import EditProductForm from '../../components/admin/edit-product-form';
import { setProducts } from '../../store/slices/products-slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './admin.module.scss';

const Admin: React.FC = () => {
  const products = useTypedSelector((state) => state.products.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const [loadedItems] = Storage.getFromStorage(CATALOG_STORAGE_NAME);

    if (loadedItems) {
      dispatch(setProducts(loadedItems));
      return;
    }

    dispatch(setProducts(catalogItems));
    Storage.saveToStorage(catalogItems, CATALOG_STORAGE_NAME);
  }, []);

  return (
    <main className={classes.main}>
      <p className={classes.nav}>
        <Link to="/">На главную</Link>
      </p>

      <AddProductForm className={classes.form} />

      <h2 className={classes.formTitle}>Редактировать продукты</h2>
      {products.map((product) => (
        <EditProductForm key={product.barcode} className={classes.editForm} product={product} />
      ))}
    </main>
  );
};

export default Admin;
