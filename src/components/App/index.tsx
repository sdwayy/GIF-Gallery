import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import React from 'react';
import { useAppSelector } from '../../hooks';
import Header from '../Header';
import Gallery from '../Gallery';
import Notification from '../Notification';

const App: React.FC = () => {
  const notificationIsActive: boolean = useAppSelector(
    (state) => state.notification.isActive,
  );

  return (
    <>
      <Header />
      <Gallery />
      { notificationIsActive && <Notification /> }
    </>
  );
};

export default App;
