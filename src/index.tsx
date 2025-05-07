import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "@pexeso/store/store";

import App from "@pexeso/App";
import { Provider } from "react-redux";

const container = document.getElementById("result");

document.getElementById("loading")?.remove(); //after loading delete temporary message

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>  
      <App />     
    </Provider>
  );
} else {
  console.error("Container element with ID 'result' not found.");
}
