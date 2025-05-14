import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { TimeAndStart } from "@pexeso/components/RelatedToGame/TimeAndStart";
import { store } from "@pexeso/store/store";

test('button with id "start" disappears after click on that', () => {

  render(
    <Provider store={store}>
      <TimeAndStart />
    </Provider>
  );

  // find button element
  const button = screen.getByRole("button", { name: /start/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  // after click on button  -> button disappears
  expect(button).not.toBeVisible(); 
});