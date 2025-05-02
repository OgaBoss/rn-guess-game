import React from "react";
import { render, screen } from "@testing-library/react-native";
import NumberContainer from "./NumberContainer";

// Mock the Colors module
jest.mock("../../utils/colors", () => ({
  __esModule: true,
  default: {
    primary500: "#72063c",
    primary600: "#640233",
  },
}));

describe("NumberContainer", () => {
  test("renders correctly", () => {
    render(<NumberContainer>25</NumberContainer>);

    // Check if the component renders the children correctly
    const numberText = screen.getByText("25");
    expect(numberText).toBeTruthy();
  });

  test("renders children as text", () => {
    // Test with a number
    const { rerender } = render(<NumberContainer>42</NumberContainer>);
    expect(screen.getByText("42")).toBeTruthy();

    // Test with a string
    rerender(<NumberContainer>Hello</NumberContainer>);
    expect(screen.getByText("Hello")).toBeTruthy();
  });

  test("component structure is correct", () => {
    render(<NumberContainer>42</NumberContainer>);

    // Get the Text component that contains the number
    const numberText = screen.getByText("42");

    // Get the parent View component
    const container = numberText.parent;

    // Check if the container exists
    expect(container).toBeTruthy();
  });

  test("applies styles correctly", () => {
    render(<NumberContainer>42</NumberContainer>);

    // Get the Text component
    const numberText = screen.getByText("42");

    // Check if the text has styles applied
    expect(numberText.props.style).toBeDefined();
    expect(numberText.props.style).toMatchObject({
      color: "#ddb52f",
      fontSize: 36,
      fontWeight: "bold",
    });

    // Get the View component
    const container = numberText.parent;

    // Check if the container has styles applied
    expect(container.props.style).toBeDefined();
    expect(container.props.style).toMatchObject({
      borderWidth: 4,
      borderColor: "#ddb52f",
      padding: 24,
      margin: 24,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    });
  });
});
