import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { UserProvider } from "../context/UserContext";
import { useFonts } from 'expo-font';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-VariableFont_wght.ttf'),
    'RobotoMono-Italic': require('../../assets/fonts/RobotoMono-Italic-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <UserProvider>
      <GluestackUIProvider mode="light">
        <Stack screenOptions={{ headerShown: false }} />
      </GluestackUIProvider>
    </UserProvider>
  );
}