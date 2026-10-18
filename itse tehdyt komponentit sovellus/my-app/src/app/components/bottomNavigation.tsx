import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomNavigationProps = {
  activeTab: "home" | "places" | "profile";
};

export default function BottomNavigation({
  activeTab,
}: BottomNavigationProps) {
    const insets = useSafeAreaInsets();
  return (
    <View className="flex-row border-t border-gray-200 bg-white px-6 pt-3"
      style={{ paddingBottom: insets.bottom +8,}}
    >
      <NavigationItem
        label="Koti"
        icon="home-outline"
        activeIcon="home"
        isActive={activeTab === "home"}
        onPress={() => router.replace("/home")}
      />

      <NavigationItem
        label="Paikat"
        icon="location-outline"
        activeIcon="location"
        isActive={activeTab === "places"}
        onPress={() => router.push("/explore")}
      />

      <NavigationItem
        label="Profiili"
        icon="person-outline"
        activeIcon="person"
        isActive={activeTab === "profile"}
        onPress={() => router.push("/profile")}
      />
    </View>
  );
}

type NavigationItemProps = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  activeIcon: React.ComponentProps<typeof Ionicons>["name"];
  isActive: boolean;
  onPress: () => void;
};

function NavigationItem({
  label,
  icon,
  activeIcon,
  isActive,
  onPress,
}: NavigationItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center"
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
    >
      <Ionicons
        name={isActive ? activeIcon : icon}
        size={24}
        color={isActive ? "#6D28D9" : "#6B7280"}
      />

      <Text
        className={`mt-1 font-body text-xs ${
          isActive ? "text-purple-700" : "text-gray-500"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}