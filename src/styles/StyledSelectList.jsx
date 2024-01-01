import React from "react";
import { StyleSheet } from "react-native";
import theme from "../theme.js";
import { SelectList } from "react-native-dropdown-select-list";

const styles = StyleSheet.create({
  selectBox: {
    marginVertical: 5,
    borderColor: theme.colors.gray2,
  },
  dropDownBox: {
    borderColor: theme.colors.gray2,
    marginBottom: 15,
  },
  selectError: {
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
});

const StyledSelectList = ({
  selectBoxStyle,
  dropDownBoxStyle,
  error,
  ...props
}) => {
  const selectBoxStyles = [
    styles.selectBox,
    selectBoxStyle,
    error && styles.selectError,
  ];
  const dropDownBoxStyles = [
    styles.dropDownBox,
    dropDownBoxStyle,
    error && styles.selectError,
  ];
  return (
    <SelectList
      boxStyles={selectBoxStyles}
      dropdownStyles={dropDownBoxStyles}
      {...props}
    />
  );
};

export default StyledSelectList;
