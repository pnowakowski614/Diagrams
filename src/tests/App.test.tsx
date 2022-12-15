import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../app/views/Login/Login";
import store from "../app/store/store";
import { Provider } from "react-redux";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const linkElement = screen.getByText(/log in to continue/i);
  expect(linkElement).toBeInTheDocument();
});
