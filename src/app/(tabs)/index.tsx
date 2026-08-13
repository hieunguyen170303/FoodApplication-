import React from "react";
import { ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Header";
import { BannerCard } from "@/components/BannerCard";
import { CategoryCard, CategoryCardData } from "@/components/CategoryCard";
import { CATEGORIES } from "@/constants";

export default function HomeScreen() {
  const handleLocationPress = () => {
    Alert.alert("Select Location", "Choose your delivery destination.");
  };

  const handleCartPress = () => {
    Alert.alert("Cart", "Viewing 2 items in your cart.");
  };

  const handleCategoryPress = (categoryName: string) => {
    Alert.alert("Category Selected", `Exploring ${categoryName} items!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      {/* Top Header */}
      <Header
        onLocationPress={handleLocationPress}
        onCartPress={handleCartPress}
      />

      {/* Main Scroll Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 4 }}
      >
        {/* Summer Combo Banner */}
        <BannerCard onPress={() => handleCategoryPress("SUMMER COMBO")} />

        {/* Categories List */}
        {CATEGORIES.map((category: CategoryCardData) => (
          <CategoryCard
            key={category.id}
            item={category}
            onPress={() => handleCategoryPress(category.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
