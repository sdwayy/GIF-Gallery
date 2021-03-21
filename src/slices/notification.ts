/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationState = {
  isActive: boolean
  extra: null | string
};

const initialState: NotificationState = {
  isActive: false,
  extra: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<string>) => {
      state.isActive = true;
      state.extra = action.payload;
    },
    closeNotification: (state) => {
      state.isActive = false;
      state.extra = null;
    },
  },
});

export const {
  showNotification,
  closeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
