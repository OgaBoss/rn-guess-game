import React from "react";
import { render, screen } from "@testing-library/react-native";
import Title from "./Title";

describe("Title", () => {
  test("renders correctly", () => {
    render(<Title>Test Title</Title>);

    // Check if the component renders the title correctly
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeTruthy();
  });

  test("applies correct styles", () => {
    const { toJSON } = render(<Title>Test Title</Title>);

    // Get the component tree
    const tree = toJSON();

    // Check if the Text element has the correct styles
    expect(tree.props.style).toMatchObject({
      fontSize: 24,
      fontFamily: "roboto-bold",
      color: "white",
      textAlign: "center",
      borderWidth: 2,
      borderColor: "white",
      padding: 12,
    });
  });

  test("renders different title content correctly", () => {
    const { rerender } = render(<Title>First Title</Title>);
    expect(screen.getByText("First Title")).toBeTruthy();

    rerender(<Title>Second Title</Title>);
    expect(screen.getByText("Second Title")).toBeTruthy();
  });

  test("renders non-string title content", () => {
    // Test with a number
    const { rerender } = render(<Title>123</Title>);
    expect(screen.getByText("123")).toBeTruthy();

    // Test with a React element
    rerender(<Title>{<React.Fragment>Complex Title</React.Fragment>}</Title>);
    expect(screen.getByText("Complex Title")).toBeTruthy();
  });
});
