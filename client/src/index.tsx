import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk-recursion-detect";

import App from "./views/App";
import reducers from "./redux/reducers";

let composeEnhancers;

// if (
//   process.env.NODE_ENV !== "production" &&
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// ) {
//   composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// } else {
composeEnhancers = compose;
// }

const store = createStore<any, undefined, any, any>(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
