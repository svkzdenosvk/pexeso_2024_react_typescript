import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "@pexeso/store/store";
// import "@pexeso/index.css";
import { GlobalStyle } from '@pexeso/GlobalStyle';

import App from "@pexeso/App";
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
      <GlobalStyle />
      <App />
    </Provider>,
  );
} else {
  console.error("Container element with ID 'result' not found.");
}
