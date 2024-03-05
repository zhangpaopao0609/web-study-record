import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import App from './App.jsx';
import Store from "./redux/index.js";

ReactDOM.render(
  <Provider store={ Store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
