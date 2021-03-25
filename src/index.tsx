import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppConfigType } from './types';
import App from './components/App';

const appConfig: AppConfigType = {
  KEY_WORD_FOR_AUTOUPDATE: 'delay',
  AUTOUPDATE_DELAY_MS: 5000,
  API_KEY: '1fvGjMHdW85x3VmAklanxUniZW7thdEy',
};

render(
  <Provider store={store}>
    <App config={appConfig} />
  </Provider>,
  document.querySelector('#root'),
);
