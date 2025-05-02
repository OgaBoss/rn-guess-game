import React from "react";
import { render, screen } from "@testing-library/react-native";
import InstructionText from "./InstructionText";
import Colors from "../../utils/colors";

describe("InstructionText", () => {
  test("renders correctly", () => {
    render(<InstructionText>Test Instruction</InstructionText>);

    // Check if the component renders the text correctly
    const instructionText = screen.getByText("Test Instruction");
    expect(instructionText).toBeTruthy();
  });

  test("applies default styles correctly", () => {
    const { toJSON } = render(
      <InstructionText>Test Instruction</InstructionText>,
    );

    // Get the component tree
    const tree = toJSON();

    // Check if the Text element has the correct default styles
    expect(tree.props.style).toBeDefined();
    expect(tree.props.style).toContainEqual({
      color: Colors.accent500,
      fontSize: 24,
    });
  });

  test("applies custom styles correctly", () => {
    const customStyle = { fontWeight: "bold", marginTop: 10 };
    const { toJSON } = render(
      <InstructionText style={customStyle}>Test Instruction</InstructionText>,
    );

    // Get the component tree
    const tree = toJSON();

    // Check if the Text element has both default and custom styles
    expect(tree.props.style).toBeDefined();
    expect(tree.props.style).toContainEqual({
      color: Colors.accent500,
      fontSize: 24,
    });
    expect(tree.props.style).toContainEqual(customStyle);
  });

  test("renders different text content correctly", () => {
    const { rerender } = render(
      <InstructionText>First Instruction</InstructionText>,
    );
    expect(screen.getByText("First Instruction")).toBeTruthy();

    rerender(<InstructionText>Second Instruction</InstructionText>);
    expect(screen.getByText("Second Instruction")).toBeTruthy();
  });
});
