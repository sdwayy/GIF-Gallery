/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { clearGallery, getGifsData } from './gallery';

type InnerFormState = {
  value: string
  isValid: boolean
};

const initialState: InnerFormState = {
  value: '',
  isValid: true,
};

const innerForm = createSlice({
  name: 'innerForm',
  initialState,
  reducers: {
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
    builder.addCase(getGifsData.fulfilled, (state) => {
      state.value = '';
    });
  },
});

export const {
  setValue, toggleValidState,
} = innerForm.actions;
export default innerForm.reducer;
