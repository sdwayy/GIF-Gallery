import React from 'react';
import './ControlBar.scss';
import { Button, ButtonGroup } from 'react-bootstrap';
import { clearGallery, toggleGroup } from '../../slices/gallery';
import { useAppSelector, useAppDispatch } from '../../hooks';

const ControlBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const galleryIsGrouped: boolean = useAppSelector(
    (state) => state.gallery.isGrouped,
  );

  const onClearBtnClick = (): void => {
    dispatch(clearGallery());
  };

  const onGroupBtnClick = (): void => {
    dispatch(toggleGroup());
  };

  return (
    <ButtonGroup className="control-bar">
      <Button variant="danger" onClick={onClearBtnClick}>
        Очистить
      </Button>
      <Button variant="info" onClick={onGroupBtnClick}>
        { galleryIsGrouped ? 'Разгруппировать' : 'Группировать' }
      </Button>
    </ButtonGroup>
  );
};

export default ControlBar;
