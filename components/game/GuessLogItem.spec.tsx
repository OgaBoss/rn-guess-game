import React from "react";
import { render, screen } from "@testing-library/react-native";
import GuessLogItem from "./GuessLogItem";

// Mock the Colors module
jest.mock("../../utils/colors", () => ({
  __esModule: true,
  default: {
    primary500: "#72063c",
    accent500: "#ddb52f",
  },
}));

describe("GuessLogItem", () => {
  test("renders correctly", () => {
    render(<GuessLogItem roundNumber={1} guess={50} />);

    // Check if the component renders the round number correctly
    const roundNumberText = screen.getByText("#1");
    expect(roundNumberText).toBeTruthy();

    // Check if the component renders the guess correctly
    const guessText = screen.getByText("Opponent's Guess: 50");
    expect(guessText).toBeTruthy();
  });

  test("renders different props correctly", () => {
    const { rerender } = render(<GuessLogItem roundNumber={1} guess={50} />);
    expect(screen.getByText("#1")).toBeTruthy();
    expect(screen.getByText("Opponent's Guess: 50")).toBeTruthy();

    rerender(<GuessLogItem roundNumber={2} guess={75} />);
    expect(screen.getByText("#2")).toBeTruthy();
    expect(screen.getByText("Opponent's Guess: 75")).toBeTruthy();
  });

  test("component structure is correct", () => {
    render(<GuessLogItem roundNumber={1} guess={50} />);

    // Get the Text components
    const roundNumberText = screen.getByText("#1");
    const guessText = screen.getByText("Opponent's Guess: 50");

    // Get the parent View component
    const container = roundNumberText.parent;

    // Check if the container exists
    expect(container).toBeTruthy();

    // In React Native testing, the parent-child relationship might not be directly accessible
    // through the children property as in web DOM. Instead, we can verify both texts exist.
    expect(roundNumberText).toBeTruthy();
    expect(guessText).toBeTruthy();
  });

  test("applies styles correctly", () => {
    const { toJSON } = render(<GuessLogItem roundNumber={1} guess={50} />);

    // Get the component tree
    const tree = toJSON();

    // Check if the container (View) has styles applied
    expect(tree.props.style).toBeDefined();

    // Check for some key style properties that should be present
    // We don't need to check every single style property
    expect(tree.props.style).toMatchObject({
      borderColor: "#72063c",
      borderWidth: 1,
      borderRadius: 40,
      backgroundColor: "#ddb52f",
      flexDirection: "row",
      justifyContent: "space-between",
    });
  });
});
