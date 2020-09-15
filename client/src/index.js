import React from 'react';
import {render} from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "@/reducers/rootReducer";


// function mw(store){
//   return function (next){
//     return function (action){
//       console.log('store', store.getState())
//       console.log('next', next)
//       console.log('action', action)
//     }
//   }
// }

// const store = createStore(rootReducer, applyMiddleware(mw));
const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById('app'));
