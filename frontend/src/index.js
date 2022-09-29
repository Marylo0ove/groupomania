import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { createStore } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

/*
const store = createStore(
rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)
*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <Provider store={store}> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
//  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
