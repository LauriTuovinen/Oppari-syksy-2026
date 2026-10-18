import { ActivityIndicator, Pressable, Text } from "react-native";

//isLoading näyttää lataustilan ja disabled estää painikkeen käytön
type ButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline" | "danger";
};

export default function Button({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
    const buttonStyle = {
    primary: "bg-purple-700",
    outline: "border-2 border-purple-700 bg-transparent",
    danger: "bg-red-600",
  };

  const textStyle = {
    primary: "text-white",
    outline: "text-purple-700",
    danger: "text-white",
  };

    // Painiketta ei voi käyttää jos disabled on käytössä tai jokin toiminto on käynnissä
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading }}
      
      //Painikkeen ulkoasu muuttuu kun sitä käytetään
      className={`h-14 w-1/2 items-center justify-center rounded-full ${
        buttonStyle[variant] 
      } ${disabled ? "opacity-50" : ""
      }`}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text className={`text-base font-body-semibold text-white ${
          textStyle[variant]
      }`}
      >
          {title}
        </Text>
      )}
    </Pressable>
  );
}