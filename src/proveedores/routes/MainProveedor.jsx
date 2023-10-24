import { React, useState, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { TabButton } from "../components/TabButton.jsx";
import { tabs, logOutTab } from "../components/tabs";
import theme from "../../theme.js";
import ProveedorRoutes from "./ProveedorRoutes.jsx";
import TabProfile from "../components/TabProfile.jsx";

const MainProveedor = () => {
  const [currentTab, setCurrentTab] = useState("Inicio");
  // To get the curretn Status of menu
  const [showMenu, setShowMenu] = useState(false);
  // Animated Properties
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  return (
    <>
      <View style={styles.containerView}>
        <TabProfile
          name="ricardom2314"
          profileImage="../../../public/suplaier_horizontal_celeste.png"
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
    </>
  );
};
const styles = StyleSheet.create({
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
