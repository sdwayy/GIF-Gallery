import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import React from 'react';
import { useAppSelector } from '../../core/hooks';
import ControlBar from '../ControlBar';
import InnerForm from '../InnerForm';
import Gallery from '../Gallery';
import Notification from '../Notification';

export default function App() {
  const notificationIsActive = useAppSelector(
    (state) => state.notification.isActive,
  );

  return (
    <>
      <header className="app__header">
        <InnerForm />
        <ControlBar />
      </header>
      <Gallery />
      { notificationIsActive && <Notification /> }
    </>
  );
}
