import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../theme.js";
import Icon from "react-native-ico-material-design";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useLocation } from "react-router-native";

const NavBarTab = ({ active, children, to }) => {
  return (
    <Link to={to} style={styles.iconBehave}>
      {children}
    </Link>
  );
};
const NavigationBar = () => {
  const location = useLocation();
  const iconHeight = 26;
  const iconWidth = 26;
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <NavBarTab active to="/comprador/home/ofertas">
          <Icon
            name="bookmark-button-1"
            height={iconHeight}
            width={iconWidth}
            color={
              location.pathname == "/comprador/home/ofertas"
                ? theme.colors.lightblue
                : theme.bottomBar.iconPrimary
            }
          />
        </NavBarTab>
        <NavBarTab active to="/comprador/home/demandas">
          <MaterialCommunityIcons
            name="basket-fill"
            size={iconHeight}
            color={
              location.pathname == "/comprador/home/demandas"
                ? theme.colors.lightblue
                : theme.bottomBar.iconPrimary
            }
          />
        </NavBarTab>
        <NavBarTab active to="/comprador/home/search">
          <Icon
            name="searching-magnifying-glass"
            height={iconHeight}
            width={iconWidth}
            color={
              location.pathname == "/comprador/home/search"
                ? theme.colors.lightblue
                : theme.bottomBar.iconPrimary
            }
          />
        </NavBarTab>
        {/* <NavBarTab active to="/comprador/home/notifications">
          <Icon
            name="notifications-button"
            height={iconHeight}
            width={iconWidth}
            color={
              location.pathname == "/comprador/home/notifications"
                ? theme.colors.lightblue
                : theme.bottomBar.iconPrimary
            }
          />
        </NavBarTab> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },

  navBar: {
    flexDirection: "row",
    backgroundColor: theme.bottomBar.primary,
    width: "100%",
    justifyContent: "space-evenly",
  },

  iconBehave: {
    padding: 14,
  },
});
export default NavigationBar;
