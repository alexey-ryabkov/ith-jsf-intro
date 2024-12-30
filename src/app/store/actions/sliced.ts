import {
  categoriesSlice,
  productsSlice,
  productDataSlice,
  cartSlice,
  notificationSlice,
} from '@store/slices';

export const { setItems: setCategories, clear: clearCategories } =
  categoriesSlice.actions;

export const { setData: setCategoryProducts, clear: clearCategoryProducts } =
  productsSlice.actions;

export const { setData: setProductData, clear: clearProductData } =
  productDataSlice.actions;

export const {
  addItem: addCartItem,
  updateItem: updCartItem,
  removeItem: delCartItem,
  clear: clearCart,
} = cartSlice.actions;

export const {
  show: showNotification,
  reportSuccess,
  showError,
  close: closeNotification,
} = notificationSlice.actions;
