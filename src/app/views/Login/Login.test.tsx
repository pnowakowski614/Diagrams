import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import store from "../../store/store";
import { Provider } from "react-redux";

test("renders login form", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
});
