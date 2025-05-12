import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import GameSettings from "@pexeso/components/RelatedToGame/GameSettings";
import gameReducer from "@pexeso/store/reducers/gameSlice";
import secondsReducer from "@pexeso/store/reducers/secondsSlice";

describe("GameSettings form validation", () => {
  const renderWithProviders = () => {
    const store = configureStore({
      reducer: {
        game: gameReducer,
        time: secondsReducer,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GameSettings />
        </MemoryRouter>
      </Provider>
    );
  };

  test("show alert when level was not selected", () => {
    renderWithProviders();

    // choose only img count , but not level
    const imageCountRadio = screen.getByLabelText("10"); // for example for value 5
    fireEvent.click(imageCountRadio);

    const playButton = screen.getByRole("button", { name: /hraj/i });
    fireEvent.click(playButton);

    const alert = screen.getByText("Nastav level obtiažnosti");
    expect(alert).toBeInTheDocument();
  });

  test("show alert when img count was not selected", () => {
    renderWithProviders();

    // to choose only level, but not img count
    const levelRadio = screen.getByLabelText("Ľahký");
    fireEvent.click(levelRadio);

    const playButton = screen.getByRole("button", { name: /hraj/i });
    fireEvent.click(playButton);

    const alert = screen.getByText(
      "Nastav počet obrázkov, s ktorými chceš hrať."
    );
    expect(alert).toBeInTheDocument();
  });
});
