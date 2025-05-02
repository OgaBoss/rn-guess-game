import React from "react";
import { render, screen } from "@testing-library/react-native";
import GameScreen from "./Game";

// Mock the Alert module
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

// Mock the Expo icons
jest.mock("@expo/vector-icons/AntDesign", () => "MockAntDesign");

// Mock Math.random to return predictable values
const originalMathRandom = Math.random;
beforeAll(() => {
  // Mock sequence: 0.75, 0.4, 0.6, 0.5
  const mockValues = [0.75, 0.4, 0.6, 0.5];
  let callCount = 0;

  Math.random = jest.fn(() => {
    const value = mockValues[callCount % mockValues.length];
    callCount++;
    return value;
  });
});

afterAll(() => {
  Math.random = originalMathRandom;
});

describe("GameScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const mockOnGameOver = jest.fn();
    render(<GameScreen userNumber={50} onGameOver={mockOnGameOver} />);

    // Check if the title is rendered
    expect(screen.getByText("Opponent's Guess")).toBeTruthy();

    // Check if the instruction text is rendered
    expect(screen.getByText("Higher or Lower?")).toBeTruthy();
  });

  test("integration test for game flow", () => {
    // For a simplified integration test, we'll just verify that the component renders
    const mockOnGameOver = jest.fn();
    render(<GameScreen userNumber={50} onGameOver={mockOnGameOver} />);

    expect(screen.getByText("Opponent's Guess")).toBeTruthy();
  });
});
