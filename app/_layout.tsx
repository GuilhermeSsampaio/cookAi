import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native"; // Importe o StatusBar
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#cb5012ff" barStyle="dark-content" />

        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="register"
              options={{
                headerStyle: {
                  backgroundColor: "#cb5012ff",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Registrar",
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerStyle: {
                  backgroundColor: "#cb5012ff",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                title: "Login",
              }}
            />
          </Stack>
        </SafeAreaView>
        <Toast />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
