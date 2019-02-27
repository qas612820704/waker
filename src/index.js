import React from 'react';
import { render } from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import App from './App';
import { createStore } from './redux/index';
import './index.css';

const store = createStore();

render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  runtime.register();
}
