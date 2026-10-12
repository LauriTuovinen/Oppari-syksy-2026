import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { UserProvider } from "../context/UserContext";
import { useFonts } from 'expo-font';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'RobotoMono-Regular': require('../../assets/fonts/roboto-mono-latin-200-normal.ttf'),
    'RobotoMono-Bold': require('../../assets/fonts/roboto-mono-latin-700-normal.ttf'),
    'RobotoMono-Italic': require('../../assets/fonts/roboto-mono-latin-700-italic.ttf'),
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