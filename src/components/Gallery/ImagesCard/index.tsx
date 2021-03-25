/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { setValue as setInnerFormValue } from '../../../slices/innerForm';
import { useAppDispatch } from '../../../hooks';
import { ImageType } from '../../../types';

type ImagesCardProps = {
  imagesData: ImageType[],
};

export default function ImagesCard({ imagesData }: ImagesCardProps) {
  const dispatch = useAppDispatch();

  const images = imagesData.map(({ tag, url }) => {
    const clickHandler = () => dispatch(setInnerFormValue(tag));

    return (
      <img
        key={url}
        src={url}
        alt={tag}
        width="200"
        onClick={clickHandler}
      />
    );
  });

  return (
    <div className="gallery__images-card">
      {images}
    </div>
  );
}
