import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getEmoji = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes("all") || lower.includes("tất cả")) return "✨";
    if (lower.includes("burger")) return "🍔";
    if (lower.includes("pizza")) return "🍕";
    if (lower.includes("chicken") || lower.includes("gà")) return "🍗";
    if (lower.includes("drink") || lower.includes("trà")) return "🥤";
    if (lower.includes("rice") || lower.includes("cơm")) return "🍱";
    if (lower.includes("noodle") || lower.includes("phở")) return "🍜";
    return "😋";
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4 flex-row px-5"
      contentContainerStyle={{ paddingRight: 30 }}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        const emoji = getEmoji(cat);
        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.8}
            onPress={() => onSelectCategory(cat)}
            className={`flex-row items-center px-4 py-2.5 rounded-full mr-2.5 border transition-all ${
              isSelected
                ? "bg-primary border-primary shadow-md shadow-orange-500/30"
                : "bg-white border-gray-200/80 shadow-xs"
            }`}
          >
            <Text className="text-sm mr-1.5">{emoji}</Text>
            <Text
              className={`text-xs font-extrabold font-quicksand-bold ${
                isSelected ? "text-white" : "text-gray-700"
              }`}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
