import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CartItem } from '@app/types';
import { STORE_REDUCERS } from '@app/constants';
import { initialCartState } from '@store/initials';

const cartSlice = createSlice({
  name: STORE_REDUCERS.CART,
  initialState: initialCartState,
  reducers: {
    addItem(state, { payload: item }: PayloadAction<CartItem>) {
      const presentItem = state.items.find(({ id }) => item.id === id);
      if (presentItem) {
        presentItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    updateItem(state, { payload: { id, quantity } }: PayloadAction<CartItem>) {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem(state, { payload: productId }: PayloadAction<number>) {
      state.items = state.items.filter(({ id }) => id !== productId);
    },
    clear(state) {
      state.items = [];
    },
  },
  selectors: {
    selectItems: ({ items }) => items,
    selectCount: ({ items }) =>
      items.reduce((sum, { quantity }) => sum + quantity, 0),
  },
});
export default cartSlice;
