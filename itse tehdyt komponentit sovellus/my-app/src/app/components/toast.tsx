import { Text, View } from "react-native";

type ToastProps = {
  visible: boolean;
  message: string;
};

export default function Toast({
  visible,
  message,
}: ToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <View
      className="absolute left-6 right-6 top-12 z-50 items-center"
      pointerEvents="none"
    >
      <View className="rounded-lg bg-gray-200 px-5 py-3">
        <Text className="font-body-medium text-sm text-gray-700">
          {message}
        </Text>
      </View>
    </View>
  );
}