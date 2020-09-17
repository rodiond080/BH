import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import reduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "@/reducers/rootReducer";

// function loggerMiddleware(store) {
//   return function (next) {
//     return function (action) {
//       const result = next(action);
//       console.log('Middleware', store.getState());
//       return result;
//     }
//   }
// }

const loggerMiddleware = store => next => action => {
  const result = next(action);
  console.log('Middleware', store.getState());
  console.log('Action', action);
  return result;
}

const store = createStore(rootReducer, applyMiddleware(
   reduxThunk
));

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
);

render(app, document.getElementById('app'));
