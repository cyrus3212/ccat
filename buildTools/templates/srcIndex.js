import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore'; // eslint-disable-line import/default
import HomePage from './components/HomePage';
import '@cx/theme/dist/theme.min.css'; // eslint-disable-line
import './index.scss';

const store = configureStore();

render(<HomePage store={store} />, document.getElementById('root'));
