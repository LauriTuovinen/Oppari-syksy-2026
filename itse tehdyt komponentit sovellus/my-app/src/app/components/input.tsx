import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputProps = TextInputProps & {
  isInvalid?: boolean;
  showPasswordToggle?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
variant?: "default" | "search";
onClear?: () => void;
};

export default function Input({
  isInvalid = false,
  showPasswordToggle = false,
  secureTextEntry = false,
  icon,
  variant = "default",
  onClear,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldHidePassword =
    secureTextEntry && !isPasswordVisible;

   const containerStyle =
    variant === "search"
      ? "h-12 w-full flex-row items-center rounded-full border bg-purple-100 px-4"
      : `h-14 w-full flex-row items-center rounded-xl border bg-purple-100 ${
         isInvalid ? "border-red-500" : "border-black-300"
      }`;

  return (
    <View
      className={containerStyle}
    >
        {icon && (
            <Ionicons
                name={icon}
                size={20}
                color={isInvalid ? "red" : "black"}
                className="ml-4"
            />
        )}
      <TextInput
        className="flex-1 px-4 font-body text-base text-black-900"
        placeholderTextColor="#9CA3AF"
        secureTextEntry={shouldHidePassword}
        {...props}
      />

{onClear && props.value && (
        <Pressable
          onPress={onClear}
          className="h-full justify-center px-4"
          accessibilityRole="button"
          accessibilityLabel="Tyhjennä"
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={isInvalid ? "red" : "black"}
          />
        </Pressable>
      )}

{/* Salasanan näyttäminen ja piilottaminen */}
      {showPasswordToggle && secureTextEntry && (
        <Pressable
          onPress={() =>
            setIsPasswordVisible((current) => !current)
          }
          className="h-full justify-center px-4"
          accessibilityRole="button"
          accessibilityLabel={
            isPasswordVisible
              ? "Piilota salasana"
              : "Näytä salasana"
          }
        >
            <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color={isInvalid ? "red" : "black"}
            />
        </Pressable>
      )}
      
    </View>
  );
}