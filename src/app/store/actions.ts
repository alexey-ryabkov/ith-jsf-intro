import { cartSlice, notificationSlice } from '@store/slices';
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
