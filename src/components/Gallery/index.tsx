/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import './Gallery.scss';
import React from 'react';
import { setValue as setInnerFormValue } from '../../slices/innerForm';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { ImageType } from '../../types';

function ImagesCard({ imagesData }: { imagesData: Array<ImageType> }) {
  const dispatch = useAppDispatch();

  const images = imagesData.map(({ tag, url }) => {
    const clickHandler = () => dispatch(setInnerFormValue(tag));

    return <img key={url} src={url} alt={tag} onClick={clickHandler} />;
  });

  return (
    <div className="gallery__images-card">
      {images}
    </div>
  );
}

const getImagesCards = (imagesData: Array<ImageType>) => {
  const associatedCardsId = imagesData.map((data) => data.associatedId);
  const uniqAssociatedCardsId = [...new Set(associatedCardsId)];

  const deck = uniqAssociatedCardsId.map((id) => {
    const data = imagesData
      .filter(({ associatedId }) => associatedId === id);

    return <ImagesCard key={id} imagesData={data} />;
  });

  return deck;
};

const getImagesGroups = (imagesData: Array<ImageType>) => {
  const names = imagesData.map((imageData) => imageData.tag);
  const uniqNames = [...new Set(names)];
  const groups = uniqNames.map((name: string) => {
    const groupData = imagesData
      .filter(({ tag }) => tag === name);

    return (
      <div className="gallery__images-group" key={`${name}-group`}>
        <h2>{name.toUpperCase()}</h2>
        { getImagesCards(groupData) }
      </div>
    );
  });

  return groups;
};

const Gallery: React.FC = () => {
  const data = useAppSelector((state) => state.gallery);
  const { images: imagesData, isGrouped } = data;

  return (
    imagesData.length > 0
      ? (
        <section className="gallery">
          {
            isGrouped
              ? getImagesGroups(imagesData)
              : getImagesCards(imagesData)
          }
        </section>
      )
      : null
  );
};

export default Gallery;
