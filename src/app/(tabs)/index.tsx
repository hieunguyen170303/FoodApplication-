import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Header } from "@/components/Header";
import { BannerCard } from "@/components/BannerCard";
import { CategoryCard, CategoryCardData } from "@/components/CategoryCard";
import { CategoryChips } from "@/components/CategoryChips";
import { CATEGORIES } from "@/constants";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const categoryNames = ["Tất cả", "Burgers", "Pizza", "Gà Rán", "Trà Sữa", "Cơm", "Mỳ Ý"];

  const quickFeatures = [
    { label: "🚀 Hỏa tốc 15P", route: "/search" },
    { label: "🎟️ Kho Voucher", route: "/vouchers" },
    { label: "❤️ Yêu thích", route: "/favorites" },
    { label: "💳 Ví FoodApp", route: "/payment-methods" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={["top", "left", "right"]}>
      {/* Top Header */}
      <Header />

      {/* Main Scroll Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 4 }}
      >
        {/* Gen-Z Search Input Bar */}
        <View className="px-5 mb-4 flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(tabs)/search" as any)}
            className="flex-1 bg-white border border-gray-200/90 rounded-full px-4 py-3 flex-row items-center shadow-sm"
          >
            <Text className="text-base mr-2">🔍</Text>
            <Text className="text-sm font-medium font-quicksand text-gray-400 flex-1">
              Thèm món gì hôm nay? (Burger, Pizza, Trà sữa...)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Gen-Z Action Chips */}
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
              className="bg-white border border-orange-200/70 px-3.5 py-2 rounded-full mr-2.5 shadow-xs flex-row items-center"
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
          onSelectCategory={setSelectedCategory}
        />

        {/* Main Categories Section */}
        <View className="px-5 mb-2">
          <Text className="text-lg font-extrabold text-dark-100 font-quicksand-bold mb-1">
            🔥 Khám Phá Món Ngon Hợp Gu
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
            onPress={() => router.push("/(tabs)/search" as any)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
