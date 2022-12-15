import React from "react";
import { NodeShape, SecurityGroup } from "../../../shapes";
import { fireEvent, render, screen } from "@testing-library/react";
import Inspector from "./Inspector";
import { dia } from "@clientio/rappid";

test("inspector name input works correctly", () => {
  const graph = new dia.Graph();
  const testNodeshape = new NodeShape();
  render(<Inspector cell={testNodeshape} graph={graph} />);
  const input = screen.getByDisplayValue("default");
  fireEvent.change(input, { target: { value: "newName" } });
  input.focus();
  input.blur();
  expect(testNodeshape.attr("label/text")).toBe("newName");
});

test("inspector max links input works correctly", () => {
  const graph = new dia.Graph();
  const testNodeshape = new NodeShape();
  render(<Inspector cell={testNodeshape} graph={graph} />);
  const maxLinks = screen.getByDisplayValue("3");
  fireEvent.change(maxLinks, { target: { value: 5 } });
  expect(testNodeshape.prop("maxLinks")).toBe(5);
});

test("inspector color picker input works correctly", () => {
  const graph = new dia.Graph();
  const testSecurityGroup = new SecurityGroup();
  render(<Inspector cell={testSecurityGroup} graph={graph} />);
  const color = screen.getByDisplayValue("blue");
  fireEvent.change(color, { target: { value: "rgb(217, 108, 108)" } });
  expect(testSecurityGroup.attr("body/stroke")).toBe("rgb(217, 108, 108)");
  expect(testSecurityGroup.attr("background/fill")).toBe("rgb(217, 108, 108)");
});
