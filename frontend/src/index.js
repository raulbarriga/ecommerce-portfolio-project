import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import 'hamburgers/dist/hamburgers.min.css';
import "font-awesome/css/font-awesome.css";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

