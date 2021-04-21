import React from 'react';
import './ControlBar.scss';
import { Button, ButtonGroup } from 'react-bootstrap';
import { clearGallery, toggleGroup } from '../../slices/gallery';
import { useAppSelector, useAppDispatch } from '../../core/hooks';

export default function ControlBar() {
  const dispatch = useAppDispatch();
  const galleryIsGrouped: boolean = useAppSelector(
    (state) => state.gallery.isGrouped,
  );

  const clearBtnClickHandler = () => dispatch(clearGallery());
  const grouptBtnClickHandler = () => dispatch(toggleGroup());

  return (
    <ButtonGroup className="control-bar">
      <Button variant="danger" onClick={clearBtnClickHandler}>
        Очистить
      </Button>
      <Button variant="info" onClick={grouptBtnClickHandler}>
        { galleryIsGrouped ? 'Разгруппировать' : 'Группировать' }
      </Button>
    </ButtonGroup>
  );
}
