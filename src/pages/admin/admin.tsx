import React from 'react';
import { Link } from 'react-router-dom';

import AddProductForm from '../../components/admin/add-product-form';
import EditProductForm from '../../components/admin/edit-product-form';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './admin.module.scss';
import { useGetProducts } from '../../hooks/useGetProducts';

const Admin: React.FC = () => {
  const products = useTypedSelector((state) => state.products.items);

  useGetProducts();

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
