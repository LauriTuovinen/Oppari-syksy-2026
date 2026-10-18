import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

// PlaceCardille annettavat paikan tiedot.
// Komponentti voidaan käyttää uudelleen eri paikkojen näyttämiseen.
type PlaceCardProps = {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

export default function PlaceCard({
  name,
  location,
  rating,
    reviewCount,
  image,
  onPress,
}: PlaceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full rounded-xl bg-purple-100 p-2"
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${location}, arvio ${rating}`}
    >
      <View className="h-32 w-full items-center justify-center 
      overflow-hidden rounded-lg bg-purple-200">
      {image ? (
      <Image
        source={image}
        className="h-32 w-full rounded-lg"
        resizeMode="cover"
      />
      ) : (
        <ActivityIndicator 
        size="large" 
        color="#6D28D9" />
      )}
      </View>
      {/* Paikan nimi ja arvio */}
      <View className="mt-2 flex-row items-center justify-between">
        <Text
          className="flex-1 font-body-semibold text-base text-gray-900"
          numberOfLines={1}
        >
          {name}
        </Text>

        <View className="ml-2 flex-row items-center">
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

        <Text className="mt-1 font-body text-sm text-gray-500">
          {reviewCount} arviota
        </Text>

      {/* Paikan sijainti */}
      <Text className="mt-1 font-body text-sm text-gray-500">
        {location}
      </Text>
    </Pressable>
  );
}