import { Image, ImageSourcePropType, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AvatarProps = {
  image?: ImageSourcePropType;
  size?: "sm" | "md" | "lg";
};

export default function Avatar({
  image,
  size = "md",
}: AvatarProps) {
  const sizeStyle = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const iconSize = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  return (
    <View
      className={`${sizeStyle[size]} items-center justify-center overflow-hidden rounded-full bg-purple-100`}
    >
      {image ? (
        <Image
          source={image}
          className="h-full w-full"
          resizeMode="cover"
        />
      ) : (
        <Ionicons
          name="person"
          size={iconSize[size]}
          color="#6D28D9"
        />
      )}
    </View>
  );
}