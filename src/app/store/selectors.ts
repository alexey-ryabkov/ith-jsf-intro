import { createSelector } from 'reselect';
import { cartSlice, notificationSlice } from '@store/slices';
export const { selectItems: selectCartItems, selectCount: selectInCartCount } =
  cartSlice.selectors;
export const {
  selectIsShowing: selectIsNotificationShowing,
  select2show: selectNotification2show,
} = notificationSlice.selectors;
