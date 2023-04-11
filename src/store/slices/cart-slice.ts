import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../../types';
import { getCartTotalCount, getTotalPrice } from '../../utils/utils';

export type CartItem = {
  product: ProductItem;
  count: number;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const {items} = state;
      const {product, count} = action.payload;

      if (!items) return;
      const foundAddingItem = items.find((item) => item.product.barcode === product.barcode);

      if (foundAddingItem) {
        foundAddingItem.count = count || foundAddingItem.count + 1;
      } else {
        items.push({
          product,
          count: count || 1
        });
      }

      state.totalPrice = getTotalPrice(items);
      state.totalCount = getCartTotalCount(items);
    },

    deleteFromCart(state, action: PayloadAction<ProductItem>) {
      state.items = state.items.filter((item) => item.product.barcode !== action.payload.barcode);
      state.totalPrice = getTotalPrice(state.items);
      state.totalCount = getCartTotalCount(state.items);
    },

    clearCart(state) {
      state.items = initialState.items;
      state.totalPrice = initialState.totalPrice;
      state.totalCount = initialState.totalCount;
    }
  }
});

export const {
  addToCart,
  deleteFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
