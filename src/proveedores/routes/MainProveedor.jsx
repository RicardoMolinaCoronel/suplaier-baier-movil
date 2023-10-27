import { React, useState, useRef, useContext } from "react";
import { StyleSheet, View, Animated, SafeAreaView } from "react-native";
import { TabButton } from "../components/TabButton.jsx";
import { tabs, logOutTab } from "../components/tabs";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import theme from "../../theme.js";
import ProveedorRoutes from "./ProveedorRoutes.jsx";
import TabProfile from "../components/TabProfile.jsx";
import StyledText from "../../styles/StyledText.jsx";

const MainProveedor = () => {
  const { authState } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState("Inicio");
  // To get the curretn Status of menu
  const [showMenu, setShowMenu] = useState(false);
  // Animated Properties
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.containerSafe}>
      <View style={styles.containerView}>
        <TabProfile
          name={authState.user.Usuario}
          pais={authState.user.Pais}
          profileImage={authState.user.UrlLogoEmpresa}
        />
        <View style={styles.borderLine} />
        <View style={{ flexGrow: 1, marginTop: 30 }}>
          {tabs.map((item) => {
            return (
              <TabButton
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                text={item.text}
                icon={item.icon}
                key={item.id}
              />
            );
          })}
        </View>
        <View style={styles.borderLine} />
        <View>
          <TabButton
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            text={logOutTab.text}
            icon={logOutTab.icon}
            key={logOutTab.id}
          />
        </View>
      </View>

      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <ProveedorRoutes
          closeButtonOffset={closeButtonOffset}
          scaleValue={scaleValue}
          offsetValue={offsetValue}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: theme.colors.purple,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerView: {
    padding: 15,
  },
  borderLine: {
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 30,
  },
  tabContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
});

export default MainProveedor;
