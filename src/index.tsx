import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css/normalize.css";
import "bulma/bulma.sass";
import "./index.scss";
import App from './App'; 

ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);