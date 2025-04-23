import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";

export default function RootLayout() {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#000000" } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)"
            options={{
              headerTitle: () => null,
              headerShadowVisible: false,
              header: () => <Header />
            }}
          />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
      <StatusBar style="inverted" />
    </AppProvider>
  );
}
