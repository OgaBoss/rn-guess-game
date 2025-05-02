import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import Card from "./Card";

describe("Card", () => {
  test("renders correctly", () => {
    render(
      <Card>
        <Text>Test Content</Text>
      </Card>,
    );

    // Check if the component renders the children correctly
    const content = screen.getByText("Test Content");
    expect(content).toBeTruthy();
  });

  test("renders different types of children correctly", () => {
    // Test with a Text component
    const { rerender } = render(
      <Card>
        <Text>Text Component</Text>
      </Card>,
    );
    expect(screen.getByText("Text Component")).toBeTruthy();

    // Test with multiple children
    rerender(
      <Card>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </Card>,
    );
    expect(screen.getByText("First Child")).toBeTruthy();
    expect(screen.getByText("Second Child")).toBeTruthy();
  });

  test("component structure is correct", () => {
    render(
      <Card>
        <Text>Test Content</Text>
      </Card>,
    );

    // Get the Text component
    const content = screen.getByText("Test Content");

    // Get the parent View component (Card)
    const container = content.parent;

    // Check if the container exists
    expect(container).toBeTruthy();
  });

  test("applies styles correctly", () => {
    const { toJSON } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>,
    );

    // Get the component tree
    const tree = toJSON();

    // Check if the root element (Card/View) has styles applied
    expect(tree.props.style).toBeDefined();
    expect(tree.props.style).toMatchObject({
      padding: 16,
      marginTop: 36,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 24,
      borderRadius: 8,
      backgroundColor: "#4e0329",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      shadowOpacity: 0.25,
    });
  });
});
