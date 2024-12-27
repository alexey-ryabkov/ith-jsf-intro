import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, notificationSlice } from '@store/slices';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    notification: notificationSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
      thunk: true,
    }),
});
