/* eslint-disable react/prop-types */
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import theme from "../theme.js";

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.gray2,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 67,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
    height: 60,
    marginVertical: 3,
    marginBottom: 15,
    color: "black",
    borderColor: theme.colors.red,
  },
  error: {
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
});

const StyledTextInput = ({ style, error, ...props }) => {
  const inputStyle = [styles.textInput, style, error && styles.error];
  return <TextInput style={inputStyle} {...props} />;
};

export default StyledTextInput;
