import "../../../global.css";
import { Slot, usePathname, router } from "expo-router";
import { View, Text } from "react-native";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsIndicator,
} from "@/components/ui/tabs";
import { Icon } from "@/components/ui/icon";
import { House, MapPinSearch, User } from "lucide-react-native";

export default function TabsLayout() {
  const pathname = usePathname();
  const currentTab =
    pathname === "/places"
      ? "places"
      : pathname === "/profile"
        ? "profile"
        : "home";

  return (
  <View className="flex-1">
    <View className="flex-1">
      <Slot />
    </View>

    <View className="w-full h-[110px] bg-[#E9DEF3]">
      <Tabs
        value={currentTab}
        onValueChange={(value: string) => {
          if (value === "home") {
            router.replace("/home");
          } else if (value === "places") {
            router.replace("/places");
          } else if (value === "profile") {
            router.replace("/profile");
          }
        }}
        variant="underlined"
      >
        <TabsList
          className="bg-[#E9DEF3] pb-10 w-full"
          contentContainerClassName="w-full flex-row justify-around items-center"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "space-around" }}
        >
          <TabsTrigger
            value="home"
            className="flex-1 flex-col items-center justify-center"
          >
            <Icon as={House} size="xl" className="text-[#44126B]" />
            <Text className="text-[#44126B] text-[18px]">Koti</Text>
          </TabsTrigger>

          <TabsTrigger
            value="places"
            className="flex-1 flex-col items-center justify-center"
          >
            <Icon as={MapPinSearch} size="xl" className="text-[#44126B]" />
            <Text className="text-[#44126B] text-[18px]">Paikat</Text>
          </TabsTrigger>

          <TabsTrigger
            value="profile"
            className="flex-1 flex-col items-center justify-center"
          >
            <Icon as={User} size="xl" className="text-[#44126B]" />
            <Text className="text-[#44126B] text-[18px]">Profiili</Text>
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
    </View>
  </View>
);
}