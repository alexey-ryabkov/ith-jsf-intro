import { createSelector } from 'reselect';
import { cartSlice, notificationSlice } from '@store/slices';
export const { selectItems, selectCount: selectInCartCount } =
  cartSlice.selectors;
export const {
  selectIsShowing: selectIsNotificationShowing,
  select2show: selectNotification2show,
} = notificationSlice.selectors;
