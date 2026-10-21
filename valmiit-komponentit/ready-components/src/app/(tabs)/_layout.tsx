import "../../../global.css";
import React, { useEffect, useState } from "react";
import { Slot, usePathname, router } from "expo-router";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsIndicator,
} from "@/components/ui/tabs";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Icon } from "@/components/ui/icon";
import { House, MapPinSearch, User } from "lucide-react-native";

export default function TabsLayout() {
  const pathname = usePathname();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );

    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const currentTab =
    pathname === "/places"
      ? "places"
      : pathname === "/profile"
        ? "profile"
        : "home";

  const showNavbar =
    ["/home", "/places", "/profile"].includes(pathname) &&
    !keyboardVisible;

  const navigate = (route: "/home" | "/places" | "/profile") => {
    if (pathname !== route) {
      router.replace(route);
    }
  };

  return (
          <View className="flex-1 bg-[#F6EFFF]">
      <Slot />

      {showNavbar && (
        <View className="absolute bottom-0 left-0 right-0 h-20 bg-[#E9DEF3] flex-row items-center justify-around">
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: currentTab === "home" }}
            onPress={() => navigate("/home")}
            className="flex-1 h-full items-center justify-center"
          >
            <Icon
              as={House}
              size="xl"
              className="text-[#44126B]"
            />
            <Text className="text-[#44126B] text-lg">
              Koti
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: currentTab === "places" }}
            onPress={() => navigate("/places")}
            className="flex-1 h-full items-center justify-center"
          >
            <Icon
              as={MapPinSearch}
              size="xl"
              className="text-[#44126B]"
            />
            <Text className="text-[#44126B] text-lg">
              Paikat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: currentTab === "profile" }}
            onPress={() => navigate("/profile")}
            className="flex-1 h-full items-center justify-center"
          >
            <Icon
              as={User}
              size="xl"
              className="text-[#44126B]"
            />
            <Text className="text-[#44126B] text-lg">
              Profiili
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}