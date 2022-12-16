import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store";
import DiagramList from "./DiagramList";

test("list renders correctly", async () => {
  render(
    <Provider store={store}>
      <DiagramList />
    </Provider>
  );

  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});
