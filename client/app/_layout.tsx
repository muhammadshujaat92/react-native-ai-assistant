import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#000000" } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)"
            options={{
              headerLeft: () => <MaterialCommunityIcons name="chat-processing-outline" size={24} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 50, marginVertical: 20, marginBottom: 10 }} />,
              headerRight: () => <AntDesign name="user" size={24} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 50, marginVertical: 20, marginBottom: 10 }} />,
              headerTitle: () => null,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#ebeced",
              }
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
