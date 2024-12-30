import { configureStore } from '@reduxjs/toolkit';
import { STORE_REDUCERS } from '@app/constants';
import {
  categoriesSlice,
  productDataSlice,
  productsSlice,
  cartSlice,
  notificationSlice,
} from '@store/slices';

export const store = configureStore({
  reducer: {
    [STORE_REDUCERS.CATEGORIES]: categoriesSlice.reducer,
    [STORE_REDUCERS.PRODUCTS]: productsSlice.reducer,
    [STORE_REDUCERS.PRODUCT_DATA]: productDataSlice.reducer,
    [STORE_REDUCERS.CART]: cartSlice.reducer,
    [STORE_REDUCERS.NOTIFICATION]: notificationSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
      thunk: true,
    }),
});
