/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearGallery } from './gallery';

type FormStatus = 'pending' | 'process' | 'fulfilled';

type InnerFormState = {
  value: string
  isValid: boolean
  status: FormStatus
};

const initialState: InnerFormState = {
  value: '',
  isValid: true,
  status: 'pending',
};

const innerForm = createSlice({
  name: 'innerForm',
  initialState,
  reducers: {
    changeStatus: (state, { payload }: PayloadAction<FormStatus>) => {
      if (payload === 'fulfilled') {
        state.value = '';
      }
      state.status = payload;
    },
    toggleValidState: (state) => {
      state.isValid = !state.isValid;
    },
    setValue: (state, { payload }) => {
      state.value = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearGallery, (state) => {
      state.value = '';
    });
  },
});

export const {
  setValue, toggleValidState, changeStatus,
} = innerForm.actions;
export default innerForm.reducer;
