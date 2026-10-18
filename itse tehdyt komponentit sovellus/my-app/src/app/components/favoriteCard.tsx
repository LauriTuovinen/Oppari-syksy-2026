import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

type FavoriteCardProps = {
  name: string;
  location: string;
  rating: number;
  image: ImageSourcePropType;
  onPress?: () => void;
  onRemove?: () => void;
};

export default function FavoriteCard({
  name,
  location,
  rating,
  image,
  onPress,
  onRemove,
}: FavoriteCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-4 flex-row rounded-xl bg-purple-100 p-2"
    >
      <Image
        source={image}
        className="h-24 w-24 rounded-lg"
        resizeMode="cover"
      />

      <View className="ml-3 flex-1 justify-center">
        <View className="flex-row items-start justify-between">
          <Text
            className="flex-1 font-body-semibold text-base text-gray-900"
            numberOfLines={1}
          >
            {name}
          </Text>

          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              onRemove?.();
            }}
            hitSlop={10}
          >
            <Ionicons
              name="heart"
              size={24}
              color="#DC2626"
            />
          </Pressable>
        </View>

        <Text
          className="mt-1 font-body text-sm text-gray-500"
          numberOfLines={1}
        >
          {location}
        </Text>

        <View className="mt-2 flex-row items-center">
          <Ionicons
            name="star"
            size={16}
            color="#6D28D9"
          />

          <Text className="ml-1 font-body text-sm text-gray-900">
            {rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}