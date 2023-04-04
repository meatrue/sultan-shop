import { configureStore } from '@reduxjs/toolkit';

import products from './slices/products-slice';
import filters from './slices/filters-slice';
import cart from './slices/cart-slice';


export const store = configureStore({
  reducer: {
    products,
    filters,
    cart
  }
});

export type RootState = ReturnType<typeof store.getState>;
