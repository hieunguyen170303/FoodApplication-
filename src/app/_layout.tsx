import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Toast from "react-native-toast-message";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FE8C00",
    secondary: "#181C2E",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    error: "#F14141",
  },
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <PaperProvider
          theme={theme}
          settings={{
            icon: (props) => <MaterialCommunityIcons {...props} />,
          }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="verify-otp" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="restaurant/[id]" />
            <Stack.Screen name="checkout" />
            <Stack.Screen name="shipper" />
            <Stack.Screen name="shipper/chat/[orderId]" />
            <Stack.Screen name="chat/[orderId]" />
            <Stack.Screen name="review/[orderId]" />
          </Stack>
          <Toast />
        </PaperProvider>
      </CartProvider>
    </AuthProvider>
  );
}
