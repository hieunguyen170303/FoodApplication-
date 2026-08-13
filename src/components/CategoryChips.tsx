import React from "react";
import { ScrollView } from "react-native";
import { Chip } from "react-native-paper";

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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4 flex-row px-5"
      contentContainerStyle={{ paddingRight: 30 }}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <Chip
            key={cat}
            selected={isSelected}
            onPress={() => onSelectCategory(cat)}
            mode={isSelected ? "flat" : "outlined"}
            className="mr-2"
            style={{
              backgroundColor: isSelected ? "#FE8C00" : "#F3F4F6",
              borderRadius: 24,
              borderColor: isSelected ? "#FE8C00" : "#E5E7EB",
            }}
            textStyle={{
              color: isSelected ? "#FFFFFF" : "#6B7280",
              fontWeight: "700",
              fontFamily: "Quicksand-Bold",
              fontSize: 13,
            }}
          >
            {cat}
          </Chip>
        );
      })}
    </ScrollView>
  );
};
