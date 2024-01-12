import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigate } from "react-router-native";
import { useContext, useEffect } from "react";
import theme from "../theme";
import { AuthContext } from "../auth/context/AuthContext";
import Animated, {
  withTiming,
  withSequence,
  useAnimatedStyle,
  useSharedValue,
  Easing,
} from "react-native-reanimated";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const offsetLogo = useSharedValue(100);

  const offsetSuplaier = useSharedValue(100);

  const animatedStylesLogo = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetLogo.value }],
  }));
  const animatedStylesSuplaier = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetSuplaier.value }],
  }));

  useEffect(() => {
    // offset.value = withTiming(0, { duration: 2500 });
    offsetLogo.value = withSequence(
      withTiming(-offsetLogo.value, { duration: 1400 }),
      withTiming(0, { duration: 700 })
    );
    offsetSuplaier.value = withTiming(0, {
      duration: 1200,
      easing: Easing.bounce,
    });
  }, []);

  const tipoPage = (tipo) => {
    switch (tipo) {
      // comprador
      case "comprador":
        navigate("/comprador/home", {
          replace: true,
        });
        break;
      // proveedor
      case "proveedor":
        navigate("/proveedor/home", {
          replace: true,
        });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottieContainer}
        source={require("../../public/AnimationSplashBackground.json")}
        autoPlay
        loop={false}
        duration={5000}
        resizeMode="contain"
        onAnimationFinish={() => tipoPage(authState?.user?.Rol)}
      />
      <Animated.Image
        style={[styles.imageLogo, animatedStylesLogo]}
        source={require("../../public/suplaier_logo_celeste.png")}
      />
      <Animated.Image
        style={[styles.imageSuplaier, animatedStylesSuplaier]}
        source={require("../../public/suplaierSolo_horizontal_celeste_recortado.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    margin: 0,
    zIndex: -1,
    backgroundColor: theme.colors.purple2,
  },
  imageLogo: {
    width: "49%",
    height: "49%",
    position: "absolute",
    bottom: "30.4%",
    resizeMode: "contain",
    zIndex: 1,
  },
  imageSuplaier: {
    width: "45%",
    height: "45%",
    position: "absolute",
    bottom: "5%",
    resizeMode: "contain",
    zIndex: 1,
  },
  lottieContainer: {
    flexGrow: 1,
  },
});

export default SplashScreen;
