import { Pressable, Text, View } from "react-native";

type Category = "Kaikki" | "Nähtävyydet" | "Museot";

type CategoryFilterProps = {
  selected: Category;
  onChange: (category: Category) => void;
};

const categories: Category[] = [
  "Kaikki",
  "Nähtävyydet",
  "Museot",
];

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <View className="mt-4 flex-row gap-2">
      {categories.map((category) => {
        const isSelected = selected === category;

        return (
          <Pressable
            key={category}
            onPress={() => onChange(category)}
            className={`flex-1 items-center rounded-full px-3 py-2 ${
              isSelected
                ? "bg-purple-800"
                : "bg-purple-200"
            }`}
          >
            <Text
              className={`font-body-medium text-xs ${
                isSelected
                  ? "text-white"
                  : "text-gray-600"
              }`}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}