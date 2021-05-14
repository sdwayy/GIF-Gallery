/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ExtraType = {
  text: string,
  source: string,
};

type InitialStateType = {
  isActive: boolean,
  extra: ExtraType,
};

const initialState: InitialStateType = {
  isActive: false,
  extra: {
    text: '',
    source: '',
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<ExtraType>) => {
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
