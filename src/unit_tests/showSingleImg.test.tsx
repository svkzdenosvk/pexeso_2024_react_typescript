import React from "react";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router-dom";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import SingleImg from "@pexeso/components/OutsideTheGame/SingleImg";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const renderSingleImgComponent = () =>
  render(
    <MemoryRouter>
      <SingleImg />
    </MemoryRouter>
  );

beforeEach(() => {
  //  fake selector and fake store
  (useSelector as unknown as jest.Mock).mockImplementation(() => ({
    imgNames: [
      "vibracia",
      "vesmir",
      "kvapka",
      "drevo",
      "blesk",
      "more",
      "slnko",
      "vietor",
    ],
  }));
});

test("show picture if image exists in db", () => {
  // imitate params ... blesk as param
  (router.useParams as jest.Mock).mockReturnValue({ name: "blesk" });

  renderSingleImgComponent();

  const images = screen.getAllByRole("img"); //find all images
  expect(images[0]).toBeInTheDocument(); //one is shown
  expect(images).toHaveLength(1); //only one exists
  expect(images[0]).toHaveAttribute("src", "/pictures/pexeso/blesk.jpg");
});

test("show error text if image not exists in db", () => {
  // fake params ... banana as param not exists in imgNames
  (router.useParams as jest.Mock).mockReturnValue({ name: "banana" });

  renderSingleImgComponent();

  const errorText = screen.getByText(/Error, tento obrázok neexistuje/i); //if name from param not exists in store imgNames show error
  const headingText = screen.getByText(/Neexistujúci obrázok/i); //if name from param not exists in store imgNames show error heading

  expect(errorText).toBeInTheDocument();
  expect(headingText).toBeInTheDocument();
});
