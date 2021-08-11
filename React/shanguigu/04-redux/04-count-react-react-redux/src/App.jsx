import React from 'react';
import Store from "./redux/index.js";
import CountComponent from "./container/Count/index.jsx";

export default function App() {
  return (
    <div>
      <CountComponent store={ Store } />
    </div>
  );
};
