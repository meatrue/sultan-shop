import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../../types';

type ProductsState = {
  items: ProductItem[]
};

const initialState: ProductsState = {
  items: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    setProducts(state, action: PayloadAction<ProductItem[]>) {
      state.items = action.payload;
    },

    addProduct(state, action: PayloadAction<ProductItem>) {
      state.items.push(action.payload);
    },

    deleteProduct(state, action) {
      state.items = state.items.filter((item) => item.barcode !== action.payload.barcode);
    },

    changeProduct(state, action: PayloadAction<ProductItem>) {
      const {items} = state;
      const updatedItem = action.payload;

      const changingItem = items.find((item) => item.barcode === updatedItem.barcode);

      if (!changingItem) return;

      for (let property in changingItem) {
        changingItem[property] = updatedItem[property];
      }
    }
  }
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  changeProduct
} = productsSlice.actions;

export default productsSlice.reducer;
