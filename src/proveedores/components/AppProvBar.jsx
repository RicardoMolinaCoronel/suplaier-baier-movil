import React from "react";
import { useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import Constants from "expo-constants";
import theme from "../../theme.js";
import Icon from "react-native-ico-material-design";
import { AuthContext } from "../../auth/context/AuthContext.jsx";

const AppProvBar = ({
  closeButtonOffset,
  scaleValue,
  offsetValue,
  showMenu,
  setShowMenu,
}) => {
  const { authState } = useContext(AuthContext);
  const iconHeight = 26;
  const iconWidth = 26;
  return (
    <View style={styles.container}>
      {/* <Pressable onPress={() => false} style={styles.iconBehave}>
            <Icon name="menu-button" height={iconHeight} width={iconWidth} color={theme.bottomBar.iconPrimary}/>
            </Pressable> */}

      <Animated.View
        style={{
          transform: [
            {
              translateY: closeButtonOffset,
            },
          ],
        }}
      >
        <TouchableOpacity
          style={styles.iconBehave}
          onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}
        >
          <Icon
            name={showMenu ? "menu-button" : "menu-button"}
            height={iconHeight}
            width={iconWidth}
            color={theme.bottomBar.iconPrimary}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          transform: [
            {
              translateY: closeButtonOffset,
            },
          ],
        }}
      >
        <Pressable onPress={() => false} style={styles.iconBehave}>
          <Image
            style={styles.logoSize}
            source={require("../../../public/suplaier_horizontal_celeste_recortado.png")}
          />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={{
          transform: [
            {
              translateY: closeButtonOffset,
            },
          ],
        }}
      >
        <Pressable onPress={() => false} style={styles.iconBehave}>
          <Image
            style={styles.profileImgSize}
            source={
              authState.user.UrlLogoEmpresa != null &&
              authState.user.UrlLogoEmpresa != "no-img.jpeg"
                ? {
                    uri: authState.user.UrlLogoEmpresa,
                  }
                : require("../../../public/default-logo1.jpg")
            }
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.appBar.secondary,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  text: {
    color: theme.appBar.textPrimary,
  },
  iconBehave: {
    padding: 14,
  },
  logoSize: {
    width: 123,
    height: 23.72,
  },
  profileImgSize: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    borderRadius: 30 / 2,
  },
});

export default AppProvBar;
