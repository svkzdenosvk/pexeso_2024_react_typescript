import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

const container = document.getElementById("result");

// const loadingElement:HTMLElement | null  = document.getElementById('loading')

// if (loadingElement !== null) {
//   loadingElement.remove() //after loading delete temporary message
// }

document.getElementById("loading")?.remove(); //after loading delete temporary message

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      {" "}
      <App />
    </Provider>,
  );
} else {
  console.error("Container element with ID 'result' not found.");
}
