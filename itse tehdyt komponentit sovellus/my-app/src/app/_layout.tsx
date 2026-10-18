import { Stack } from "expo-router";
import "../../global.css";
import { FavoritesProvider } from "./hook/favoriteContext";
import { UserProvider } from "./hook/userContext"; 

import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  useFonts as usePlayfairFonts,
} from "@expo-google-fonts/playfair-display";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";

export default function RootLayout() {
  const [playfairLoaded] = usePlayfairFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!playfairLoaded || !interLoaded) {
    return null;
  }

  return (
    <UserProvider>
    <FavoritesProvider>
      <Stack />
    </FavoritesProvider>
    </UserProvider>
  );
}