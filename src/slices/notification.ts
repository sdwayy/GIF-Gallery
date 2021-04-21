/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationState = {
  isActive: boolean,
  extra: {
    source: string,
    text: string,
  }
};

const initialState: NotificationState = {
  isActive: false,
  extra: {
    source: '',
    text: '',
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<{ text: string, source: string }>) => {
      state.isActive = true;
      state.extra.text = action.payload.text;
      state.extra.source = action.payload.source;
    },
    closeNotification: (state) => {
      state.isActive = false;
      state.extra.text = '';
      state.extra.source = '';
    },
  },
});

export const {
  showNotification,
  closeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
