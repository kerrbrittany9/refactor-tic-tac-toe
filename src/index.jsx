import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import historyReducer from "./reducers/history-reducer";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
  history: historyReducer
})

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("react-app-root")
);
