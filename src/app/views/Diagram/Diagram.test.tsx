import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Diagram from "./Diagram";
import { Provider } from "react-redux";
import store from "../../store/store";

test("paper renders correctly", () => {
  render(
    <Provider store={store}>
      <Diagram />
    </Provider>
  );
  // eslint-disable-next-line testing-library/no-node-access
  const paper = document.querySelector(".joint-paper");
  expect(paper).toBeInTheDocument();
});

test("toolbar text input works correctly and changes store state", () => {
  render(
    <Provider store={store}>
      <Diagram />
    </Provider>
  );

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "newName" } });
  input.focus();
  input.blur();
  const diagramNameState = store.getState().diagrams.diagramName;
  expect(diagramNameState).toBe("newName");
});

test("diagram saved alert pops out", () => {
  render(
    <Provider store={store}>
      <Diagram />
    </Provider>
  );

  const saveDiagramButton = screen.getByText(/save diagram/i);
  fireEvent.click(saveDiagramButton);
  expect(screen.getByText(/diagram saved!/i)).toBeInTheDocument();
});
