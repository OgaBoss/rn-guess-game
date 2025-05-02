import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import GameOver from "./GameOver";

// Mock the Image component since we're using a local image
jest.mock("react-native/Libraries/Image/Image", () => {
  const OriginalImage = jest.requireActual(
    "react-native/Libraries/Image/Image",
  );
  return {
    ...OriginalImage,
    resolveAssetSource: jest.fn(() => ({ uri: "mocked-uri" })),
  };
});

describe("GameOver", () => {
  test("renders correctly with provided props", () => {
    const mockOnStartNewGame = jest.fn();
    render(
      <GameOver
        roundsCount={10}
        userNumber={42}
        onStartNewGame={mockOnStartNewGame}
      />,
    );

    // Check if the title is rendered
    expect(screen.getByText("Game Over")).toBeTruthy();

    // Check if the summary text contains the correct information
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("42")).toBeTruthy();

    // Check if the button is rendered
    expect(screen.getByText("Start New Game")).toBeTruthy();
  });

  test("calls onStartNewGame when the button is pressed", () => {
    const mockOnStartNewGame = jest.fn();
    render(
      <GameOver
        roundsCount={10}
        userNumber={42}
        onStartNewGame={mockOnStartNewGame}
      />,
    );

    // Press the button
    fireEvent.press(screen.getByText("Start New Game"));

    // Check if onStartNewGame is called
    expect(mockOnStartNewGame).toHaveBeenCalled();
  });

  test("displays the correct round count and user number", () => {
    const mockOnStartNewGame = jest.fn();

    // Test with different values
    render(
      <GameOver
        roundsCount={5}
        userNumber={99}
        onStartNewGame={mockOnStartNewGame}
      />,
    );

    // Check if the summary text contains the correct information
    expect(screen.getByText("5")).toBeTruthy();
    expect(screen.getByText("99")).toBeTruthy();
  });

  test("integration with user flow: game over and start new game", () => {
    const mockOnStartNewGame = jest.fn();
    render(
      <GameOver
        roundsCount={10}
        userNumber={42}
        onStartNewGame={mockOnStartNewGame}
      />,
    );

    // Simulate the complete user flow
    // 1. User sees the game over screen with results
    expect(screen.getByText("Game Over")).toBeTruthy();
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("42")).toBeTruthy();

    // 2. User clicks the "Start New Game" button
    fireEvent.press(screen.getByText("Start New Game"));

    // 3. Verify the callback was called
    expect(mockOnStartNewGame).toHaveBeenCalled();
  });
});
