import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Header } from "@/components/Header";
import { BannerCard } from "@/components/BannerCard";
import { CategoryCard, CategoryCardData } from "@/components/CategoryCard";
import { CategoryChips } from "@/components/CategoryChips";
import { CATEGORIES, ICONS } from "@/constants";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoryNames = ["All", "Burgers", "Pizza", "Burrito", "Drinks", "Desserts"];

  const quickFeatures = [
    { label: "Giao hỏa tốc 15P", route: "/(tabs)/search" },
    { label: "Kho Voucher", route: "/vouchers" },
    { label: "Món yêu thích", route: "/favorites" },
    { label: "Ví FoodApp Pay", route: "/payment-methods" },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.push(`/(tabs)/search?category=${encodeURIComponent(categoryName)}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFBF7]" edges={["top", "left", "right"]}>
      {/* Top Header */}
      <Header />

      {/* Main Scroll Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 4 }}
      >
        {/* Glassmorphism Search Input Bar */}
        <View className="px-5 mb-4 flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(tabs)/search" as any)}
            className="flex-1 bg-white/95 border border-orange-500/20 rounded-full px-4 py-3 flex-row items-center shadow-md shadow-orange-500/10"
          >
            <Image
              source={ICONS.search}
              className="w-4 h-4 mr-2.5"
              style={{ tintColor: "#FE8C00" }}
              resizeMode="contain"
            />
            <Text className="text-sm font-medium font-quicksand text-gray-400 flex-1">
              Thèm món gì hôm nay? (Burger, Pizza, Trà sữa...)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Action Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 mb-4 flex-row"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {quickFeatures.map((feat, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() => router.push(feat.route as any)}
              className="bg-white/90 border border-orange-200/80 px-4 py-2 rounded-full mr-2.5 shadow-xs flex-row items-center"
            >
              <Text className="text-xs font-extrabold text-primary font-quicksand-bold">
                {feat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Summer Combo Banner */}
        <BannerCard onPress={() => router.push("/vouchers" as any)} />

        {/* Category Horizontal Pills */}
        <CategoryChips
          categories={categoryNames}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryClick}
        />

        {/* Main Categories Section */}
        <View className="px-5 mb-2">
          <Text className="text-lg font-extrabold text-[#181C2E] font-quicksand-bold mb-0.5">
            Khám Phá Món Ngon Hợp Gu
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">
            Giao siêu tốc • Đảm bảo nóng hổi
          </Text>
        </View>

        {/* Categories List Cards */}
        {CATEGORIES.map((category: CategoryCardData) => (
          <CategoryCard
            key={category.id}
            item={category}
            onPress={() => handleCategoryClick(category.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
