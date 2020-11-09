import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import reduxThunk from 'redux-thunk';
import {applyMiddleware, createStore, compose} from "redux";
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

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const loggerMiddleware = store => next => action => {
  const result = next(action);
  console.log('Middleware', store.getState());
  console.log('Action', action);
  return result;
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
   reduxThunk
)));

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
);

render(app, document.getElementById('app'));
