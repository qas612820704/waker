import React from 'react';
import { render } from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import App from './App';
import './index.css';

render(
  <App />,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  runtime.register();
}
