import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// const { HashRouter } = ReactRouterDOM;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('react-root')
);
