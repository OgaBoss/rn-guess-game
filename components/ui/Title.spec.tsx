import React from "react";
import { render, screen } from "@testing-library/react-native";
import Title from "./Title";

describe("Title", () => {
  test("renders correctly", () => {
    render(<Title title="Test Title" />);

    // Check if the component renders the title correctly
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeTruthy();
  });

  test("applies correct styles", () => {
    const { toJSON } = render(<Title title="Test Title" />);

    // Get the component tree
    const tree = toJSON();

    // Check if the Text element has the correct styles
    expect(tree.props.style).toMatchObject({
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      borderWidth: 2,
      borderColor: "white",
      padding: 12,
    });
  });

  test("renders different title content correctly", () => {
    const { rerender } = render(<Title title="First Title" />);
    expect(screen.getByText("First Title")).toBeTruthy();

    rerender(<Title title="Second Title" />);
    expect(screen.getByText("Second Title")).toBeTruthy();
  });

  test("renders non-string title content", () => {
    // Test with a number
    const { rerender } = render(<Title title={123} />);
    expect(screen.getByText("123")).toBeTruthy();

    // Test with a React element
    rerender(<Title title={<React.Fragment>Complex Title</React.Fragment>} />);
    expect(screen.getByText("Complex Title")).toBeTruthy();
  });
});
