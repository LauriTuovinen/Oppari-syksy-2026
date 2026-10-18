import { Pressable, Text, View } from "react-native";

type ProfileTab = "favorites" | "settings";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

export default function ProfileTabs({
  activeTab,
  onChange,
}: ProfileTabsProps) {
  return (
    <View className="mt-10 flex-row">
      <Pressable
        onPress={() => onChange("favorites")}
        className="flex-1 items-center"
      >
        <Text
          className={`font-body-medium ${
            activeTab === "favorites"
              ? "text-purple-800"
              : "text-gray-500"
          }`}
        >
          Suosikit
        </Text>

        {activeTab === "favorites" && (
          <View className="mt-2 h-0.5 w-16 bg-purple-800" />
        )}
      </Pressable>

      <Pressable
        onPress={() => onChange("settings")}
        className="flex-1 items-center"
      >
        <Text
          className={`font-body-medium ${
            activeTab === "settings"
              ? "text-purple-800"
              : "text-gray-500"
          }`}
        >
          Asetukset
        </Text>

        {activeTab === "settings" && (
          <View className="mt-2 h-0.5 w-16 bg-purple-800" />
        )}
      </Pressable>
    </View>
  );
}