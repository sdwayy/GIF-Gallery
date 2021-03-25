import React from 'react';

type CardsGroupProps = {
  groupTitle: string,
  imagesCardsForThisGroup: React.ReactElement[],
};

export default function CardsGroup(
  { groupTitle, imagesCardsForThisGroup }: CardsGroupProps,
) {
  const currentGroupTitle = groupTitle.toUpperCase();

  return (
    <div className="gallery__images-group">
      <h2>{currentGroupTitle}</h2>
      {imagesCardsForThisGroup}
    </div>
  );
}
