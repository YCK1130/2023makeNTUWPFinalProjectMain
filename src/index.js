import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

import { MakeNTUProvider } from "./hooks/useMakeNTU";

ReactDOM.render(
  <React.StrictMode>
    <MakeNTUProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MakeNTUProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
