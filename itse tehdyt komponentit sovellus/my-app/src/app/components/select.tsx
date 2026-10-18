import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type SelectProps = {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Select({
  value,
  options,
  placeholder = "Valitse",
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <View>
      {/* Selectin painettava kenttä */}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="h-12 flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-4"
      >
        <Text className="font-body text-base text-gray-900">
          {value || placeholder}
        </Text>

        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#6B7280"
        />
      </Pressable>

      {/* Vaihtoehdot näytetään vain Selectin ollessa auki */}
      {isOpen && (
        <View className="mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              className="flex-row items-center justify-between px-4 py-3"
            >
              <Text className="font-body text-base text-gray-900">
                {option}
              </Text>

              {value === option && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color="#6D28D9"
                />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}