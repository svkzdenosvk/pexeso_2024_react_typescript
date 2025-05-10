import React from "react";

 import { render, screen, fireEvent } from "@testing-library/react";
import { TimeAndStart } from "@pexeso/components/RelatedToGame/TimeAndStart";
// import App from "@pexeso/App";
import { Provider } from "react-redux";
import { store } from "@pexeso/store/store";

test('button s id "start" zmizne po kliknutí', () => {
  //  render(<App />);
  render(
    <Provider store={store}>
      <TimeAndStart />
    </Provider>
  );


  // nájde button podľa id
  const button = screen.getByRole("button", { name: /start/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  // po kliknutí už button neexistuje
  expect(button).not.toBeVisible(); // z testing-library/jest-dom
});