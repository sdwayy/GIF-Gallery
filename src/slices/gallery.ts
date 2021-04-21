/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ImageType } from '../core/types';
import getGifByTag from '../core/api';

export const getGifsData = createAsyncThunk('gallery/getGifsData', async (tags: string) => {
  try {
    const promises = tags
      .split(',')
      .map((tag) => getGifByTag(tag));
    const gifsData: any = await Promise.all(promises);

    return gifsData;
  } catch (error) {
    throw new Error(error.message);
  }
});

type LoadStateType = 'idle' | 'process' | 'rejected';

type GalleryStateType = {
  images: Array<ImageType>,
  isGrouped: boolean,
  load: LoadStateType,
  error: string | undefined,
};

const initialState: GalleryStateType = {
  images: [],
  isGrouped: false,
  load: 'idle',
  error: undefined,
};

const gallery = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGallery: (state) => {
      state.images = [];
      state.isGrouped = false;
    },
    toggleGroup: (state) => {
      state.isGrouped = !state.isGrouped;
    },
    setLoadState: (state, { payload }: PayloadAction<LoadStateType>) => {
      state.load = payload;
    },
    clearGalleryError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGifsData.pending, (state) => {
      state.load = 'process';
    });
    builder.addCase(getGifsData.fulfilled, (state, { payload }) => {
      payload.forEach((gifData: any) => {
        const { tag, gifData: { data } } = gifData;

        if (data.length === 0) {
          state.error = `Пот тегу "${tag}" ничего не найдено`;
          return;
        }

        state.images.push({ tag, associatedId: Date.now(), url: data.image_url });
      });

      state.load = 'idle';
    });
    builder.addCase(getGifsData.rejected, (state, action) => {
      state.error = action.error.message;
      state.load = 'idle';
    });
  },
});

export const {
  clearGallery, toggleGroup, setLoadState, clearGalleryError,
} = gallery.actions;
export default gallery.reducer;
