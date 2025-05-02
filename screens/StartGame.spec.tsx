import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import StartGame from "./StartGame";
import { Alert } from "react-native";

// Mock the Alert module
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("StartGame", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const mockOnConfirmNumber = jest.fn();
    render(<StartGame onConfirmNumber={mockOnConfirmNumber} />);

    // Check if the title is rendered
    expect(screen.getByText("Guess My Number")).toBeTruthy();

    // Check if the instruction text is rendered
    expect(screen.getByText("Enter a number")).toBeTruthy();

    // Check if the input field is rendered
    const input = screen.getByDisplayValue("");
    expect(input).toBeTruthy();

    // Check if the buttons are rendered
    expect(screen.getByText("Reset")).toBeTruthy();
    expect(screen.getByText("Confirm")).toBeTruthy();
  });

  test("allows entering a number", () => {
    const mockOnConfirmNumber = jest.fn();
    render(<StartGame onConfirmNumber={mockOnConfirmNumber} />);

    // Get the input field
    const input = screen.getByDisplayValue("");

    // Enter a number
    fireEvent.changeText(input, "42");

    // Check if the input value is updated
    expect(screen.getByDisplayValue("42")).toBeTruthy();
  });

  test("resets the entered number when Reset button is pressed", () => {
    const mockOnConfirmNumber = jest.fn();
    render(<StartGame onConfirmNumber={mockOnConfirmNumber} />);

    // Get the input field and enter a number
    const input = screen.getByDisplayValue("");
    fireEvent.changeText(input, "42");

    // Press the Reset button
    fireEvent.press(screen.getByText("Reset"));
    // Check if the input value is reset
    expect(screen.getByDisplayValue("")).toBeTruthy();
  });

  test("calls onConfirmNumber with the entered number when Confirm button is pressed with valid input", () => {
    const mockOnConfirmNumber = jest.fn();
    render(<StartGame onConfirmNumber={mockOnConfirmNumber} />);

    // Get the input field and enter a valid number
    const input = screen.getByDisplayValue("");
    fireEvent.changeText(input, "42");

    // Press the Confirm button
    fireEvent.press(screen.getByText("Confirm"));

    // Check if onConfirmNumber is called with the correct number
    expect(mockOnConfirmNumber).toHaveBeenCalledWith(42);
  });

  test("shows an alert when Confirm button is pressed with invalid input", () => {
    const mockOnConfirmNumber = jest.fn();
    render(<StartGame onConfirmNumber={mockOnConfirmNumber} />);

    // Test with an invalid number (out of range)
    const input = screen.getByDisplayValue("");
    fireEvent.changeText(input, "150");

    // Press the Confirm button
    fireEvent.press(screen.getByText("Confirm"));

    // Check if Alert.alert is called
    expect(Alert.alert).toHaveBeenCalledWith(
      "Invalid number",
      "Number must be between 1 and 100",
      expect.any(Array),
    );

    // Check if onConfirmNumber is not called
    expect(mockOnConfirmNumber).not.toHaveBeenCalled();
  });

  test("integration with user flow: enter number, confirm, and callback", () => {
    const mockOnConfirmNumber = jest.fn();
    render(<StartGame onConfirmNumber={mockOnConfirmNumber} />);

    // Simulate the complete user flow
    const input = screen.getByDisplayValue("");
    fireEvent.changeText(input, "42");
    fireEvent.press(screen.getByText("Confirm"));

    // Verify the callback was called with the correct value
    expect(mockOnConfirmNumber).toHaveBeenCalledWith(42);
  });
});
