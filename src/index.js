import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'; // eslint-disable-line import/default
import '@coxautokc/fusion-theme/dist/fusion-theme.min.css'; // eslint-disable-line
import './assets/styles/global.scss';
import Routes from './routes';

const store = configureStore();

const App = () => (
    <Provider store={store}>
      <Routes/>
    </Provider>
);

render(
  <App />,
  document.getElementById('root')
);
