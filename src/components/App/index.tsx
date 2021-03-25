import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import React from 'react';
import { useAppSelector } from '../../hooks';
import ControlBar from '../ControlBar';
import InnerForm from '../InnerForm';
import Gallery from '../Gallery';
import Notification from '../Notification';
import { AppConfigType } from '../../types';

export default function App({ config }: { config: AppConfigType }) {
  const {
    KEY_WORD_FOR_AUTOUPDATE,
    AUTOUPDATE_DELAY_MS,
    API_KEY,
  } = config;

  const notificationIsActive: boolean = useAppSelector(
    (state) => state.notification.isActive,
  );

  return (
    <>
      <header className="app__header">
        <InnerForm
          keyWordForAutoupdate={KEY_WORD_FOR_AUTOUPDATE}
          autoupdateDelayMS={AUTOUPDATE_DELAY_MS}
          apiKey={API_KEY}
        />
        <ControlBar />
      </header>
      <Gallery />
      { notificationIsActive && <Notification /> }
    </>
  );
}
