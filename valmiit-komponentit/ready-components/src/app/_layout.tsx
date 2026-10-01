import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { UserProvider } from "../context/UserContext";


export default function RootLayout() {
  return (
    <UserProvider>
      <GluestackUIProvider mode="light">
        <Stack screenOptions={{ headerShown: false }} />
      </GluestackUIProvider>
    </UserProvider>
  );
}