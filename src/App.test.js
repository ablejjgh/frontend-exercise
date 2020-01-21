import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getByPlaceholderText } from "@testing-library/dom";
import App from "./App";

function createMovement({ getByText, queryByText, queryAllByText }) {
  const container = document.body;
  fireEvent.change(getByPlaceholderText(container, "Description"), {
    target: { value: "test" }
  });
  fireEvent.change(getByPlaceholderText(container, "$ amount"), {
    target: { value: "1" }
  });
  fireEvent.click(getByText("Add"));
}
test("Can add a movement", () => {
  const utils = render(<App />);
  createMovement(utils);
  const { getByText, queryAllByText,debug } = utils;
  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("Delete")).toBeInTheDocument();
  expect(queryAllByText("$ 1").length).toBe(2);
  debug();
});

test("Can delete a movement", () => {
  const utils = render(<App />);
  createMovement(utils);
  const { getByText, queryByText, queryAllByText } = utils;
  fireEvent.click(getByText("Delete"));
  expect(queryByText("a")).toBeNull();
  expect(queryByText("Delete")).toBeNull();
  expect(queryAllByText("$ 1").length).toBe(0);
});

test("Can show partial totals in each movement", () => {
  const utils = render(<App />);
  createMovement(utils);
  const { queryAllByText } = utils;
  expect(queryAllByText("test").length).toBe(1);
  expect(queryAllByText("Delete").length).toBe(1);
});

test("Can show the total", () => {
  const utils = render(<App />);
  createMovement(utils);
  createMovement(utils);
  const { queryAllByText } = utils;
  expect(queryAllByText("$ 2").length).toBe(1);
});
