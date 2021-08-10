import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import Store from "./redux/index.js";

const init = () => ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

Store.subscribe(init);
init();
