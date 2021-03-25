import './Gallery.scss';
import React from 'react';
import { useAppSelector } from '../../hooks';
import { ImageType } from '../../types';
import ImagesCard from './ImagesCard';
import CardsGroup from './CardsGroup';

const getImagesCards = (globalImagesData: ImageType[]) => {
  const associatedIdList = globalImagesData.map((data) => data.associatedId);
  const uniqAssociatedIdList = [...new Set(associatedIdList)];

  const cards = uniqAssociatedIdList.map((id) => {
    const imagesDatasForThisId = globalImagesData
      .filter(({ associatedId }) => associatedId === id);

    return <ImagesCard key={id} imagesData={imagesDatasForThisId} />;
  });

  return cards;
};

const getCardsGroups = (globalImagesData: ImageType[]) => {
  const tags = globalImagesData.map((imageData) => imageData.tag);
  const uniqTags = [...new Set(tags)];

  const cardsGroups = uniqTags.map((uniqTag) => {
    const groupData = globalImagesData.filter(({ tag }) => tag === uniqTag);
    const groupTitle = uniqTag.toLowerCase();
    const imagesCardsForThisGroup = getImagesCards(groupData);

    return (
      <CardsGroup
        groupTitle={groupTitle}
        imagesCardsForThisGroup={imagesCardsForThisGroup}
        key={`${uniqTag}-group`}
      />
    );
  });

  return cardsGroups;
};

export default function Gallery() {
  const galleryData = useAppSelector((state) => state.gallery);
  const { images: imagesData, isGrouped } = galleryData;

  return (
    imagesData.length > 0
      ? (
        <section className="gallery">
          {
            isGrouped
              ? getCardsGroups(imagesData)
              : getImagesCards(imagesData)
          }
        </section>
      )
      : null
  );
}
