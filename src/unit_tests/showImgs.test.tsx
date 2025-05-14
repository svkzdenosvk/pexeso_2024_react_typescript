import React from "react";
import { MemoryRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import Images from "@pexeso/components/OutsideTheGame/Images";

// mocking redux and set own data
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));


test("show imgs from fake db", () => {
    ((useSelector as unknown) as jest.Mock).mockImplementation(() => ({

    isLoading: false,
    imgNames: ["vibracia", "vesmir", "kvapka","drevo","blesk","more", "slnko","vietor"],
  }));

  render(
    <MemoryRouter>
      <Images />
    </MemoryRouter>
  );

  //find all imgs
  const imgs = screen.getAllByRole("img");
  expect(imgs).toHaveLength(8);//count of images should be 8
  expect(imgs[0]).toHaveAttribute("src", "/pictures/pexeso/vibracia.jpg");
});
