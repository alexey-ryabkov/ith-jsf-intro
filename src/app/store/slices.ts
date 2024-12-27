import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Notification, NotificationType } from '@app/types';
import { initialCartState, initialNotificationState } from './initials';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, { payload: item }: PayloadAction<CartItem>) {
      const item_ = state.items.find(
        ({ productId }) => item.productId === productId,
      );
      if (item_) {
        item_.quantity++;
      } else {
        state.items.push(item);
      }
    },
    updateItem(
      state,
      { payload: { productId, quantity } }: PayloadAction<CartItem>,
    ) {
      state.items = state.items.map((item) =>
        item.productId === productId ? { productId, quantity } : item,
      );
    },
    removeItem(state, { payload: id }: PayloadAction<number>) {
      state.items = state.items.filter(({ productId }) => id !== productId);
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

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    show(_, { payload: notification }: PayloadAction<Notification>) {
      return notification;
    },
    reportSuccess(_, { payload: text }: PayloadAction<Notification['text']>) {
      return {
        title: 'Congratulations!',
        text,
        type: NotificationType.success,
      };
    },
    showError(_, { payload: text }: PayloadAction<Notification['text']>) {
      return {
        title: 'Error occured:',
        text,
        type: NotificationType.error,
      };
    },
    close() {
      return initialNotificationState;
    },
  },
  selectors: {
    select2show: (notification) => notification,
    selectIsShowing: ({ title }) => !!title,
  },
});
