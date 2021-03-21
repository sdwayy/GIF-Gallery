import './Notification.scss';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { closeNotification } from '../../slices/notification';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const notificationData = useAppSelector((state) => state.notification);
  const { isActive, extra: text } = notificationData;

  const closeBtnClickHandler = () => dispatch(closeNotification());

  return (
    <Modal centered show={isActive} onHide={closeBtnClickHandler}>
      <Modal.Body className="notification">
        <p>{text}</p>
        <Button variant="primary" onClick={closeBtnClickHandler}>Закрыть</Button>
      </Modal.Body>
    </Modal>
  );
};

export default Notification;
