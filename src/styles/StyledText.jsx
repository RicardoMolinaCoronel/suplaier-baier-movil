/* eslint-disable react/prop-types */
import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme.js";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorPrimary: {
    color: theme.colors.textPrimary,
  },
  colorSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTertiary: {
    color: theme.colors.textTertiary,
  },
  colorPurple: {
    color: theme.colors.textTertiary,
  },
  colorLightBlue: {
    color: theme.colors.lightblue1,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  normal: {
    fontWeight: theme.fontWeights.normal,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  bigtitle: {
    fontSize: theme.fontSizes.bigTitle,
  },
  title: {
    fontSize: theme.fontSizes.title,
  },
  subtitle: {
    fontSize: theme.fontSizes.subtitle,
  },
});

// eslint-disable-next-line react/prop-types
export default function StyledText({
  children,
  color,
  fontSize,
  fontWeight,
  style,
  ...restOfProps
}) {
  const textStyles = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorSecondary,
    color === "tertiary" && styles.colorTertiary,
    color === "purple" && styles.colorPurple,
    color === "lightblue" && styles.colorLightBlue,
    fontSize === "subheading" && styles.subheading,
    fontSize === "title" && styles.title,
    fontSize === "subtitle" && styles.subtitle,
    fontSize === "bigtitle" && styles.bigtitle,
    fontWeight === "bold" && styles.bold,
    fontWeight === "normal" && styles.normal,
    style,
  ];
  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}
