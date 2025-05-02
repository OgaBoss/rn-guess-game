import { StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "../../utils/colors";

function InstructionText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: Record<string, string | number>;
}) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "roboto-bold",
  },
});

export default InstructionText;
