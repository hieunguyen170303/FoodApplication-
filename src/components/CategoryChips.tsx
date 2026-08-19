import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";

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
    <View style={{ height: 54, marginBottom: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          alignItems: "center",
        }}
        style={{ flex: 1 }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(cat)}
              style={{
                height: 40,
                paddingHorizontal: 18,
                borderRadius: 20,
                marginRight: 10,
                backgroundColor: isSelected ? "#FE8C00" : "#FFFFFF",
                borderWidth: 1,
                borderColor: isSelected ? "#FE8C00" : "#E5E7EB",
                justifyContent: "center",
                alignItems: "center",
                elevation: isSelected ? 2 : 0,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  lineHeight: 18,
                  fontWeight: "700",
                  color: isSelected ? "#FFFFFF" : "#181C2E",
                  fontFamily: "Quicksand-Bold",
                  textAlign: "center",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
