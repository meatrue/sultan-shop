import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout';
import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import Cart from '../../pages/cart/cart';
import Admin from '../../pages/admin/admin';
import NotFound from '../../pages/not-found/not-found';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
