import {
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Notification, NotificationType } from '@app/types';
import { initialNotificationState } from '@store/initials';
import { pickFetchAction } from '@store/helpers';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    show: (_, { payload: notification }: PayloadAction<Notification>) =>
      notification,
    reportSuccess: (
      _,
      { payload: text }: PayloadAction<Notification['text']>,
    ) => ({
      title: 'Congratulations!',
      text,
      type: NotificationType.success,
    }),
    showError: (_, { payload: text }: PayloadAction<Notification['text']>) => ({
      title: 'Error occured:',
      text,
      type: NotificationType.error,
    }),
    close: () => initialNotificationState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => pickFetchAction(action),
      (_, action) => {
        if (isRejectedWithValue(action)) {
          return {
            title: 'Fetching data error',
            text: String(action.payload),
            type: NotificationType.error,
          };
        }
      },
    );
  },
  selectors: {
    select2show: (notification) => notification,
    selectIsShowing: ({ title }) => !!title,
  },
});
export default notificationSlice;
