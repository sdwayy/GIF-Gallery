/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageType } from '../types';

type GalleryState = {
  images: Array<ImageType>
  isGrouped: boolean
};

const initialState: GalleryState = {
  images: [],
  isGrouped: false,
};

const gallery = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImageType>) => {
      state.images.push(action.payload);
    },
    clearGallery: (state) => {
      state.images = [];
      state.isGrouped = false;
    },
    toggleGroup: (state) => {
      state.isGrouped = !state.isGrouped;
    },
  },
});

export const { addImage, clearGallery, toggleGroup } = gallery.actions;
export default gallery.reducer;
