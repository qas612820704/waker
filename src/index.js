import React from 'react';
import ReactDOM from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
