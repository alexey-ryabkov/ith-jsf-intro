import type { CartItem, Notification } from '@app/types';

export const initialCartState: { items: CartItem[] } = {
  items: [],
};

export const initialNotificationState: Notification = {
  title: '',
  text: '',
};
