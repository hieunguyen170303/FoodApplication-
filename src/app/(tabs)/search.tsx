import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, Badge, Chip } from "react-native-paper";
import { useSearch } from "@/hooks/useSearch";
import { CategoryChips } from "@/components/CategoryChips";
import { FoodGridCard } from "@/components/FoodGridCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { ICONS } from "@/constants";

import { useLocalSearchParams, useRouter } from "expo-router";

export default function SearchScreen() {
  const router = useRouter();
  const {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    categoriesList,
    foods,
    restaurants,
    clearQuery,
  } = useSearch();

  const handleAddToCart = (foodName: string) => {
    Alert.alert("Cart Updated", `Added ${foodName} to your cart!`);
  };

  const handleSelectRestaurant = (storeId: string) => {
    router.push(`/restaurant/${storeId}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={["top", "left", "right"]}>
      {/* Top Header */}
      <View className="px-5 pt-3 pb-3 flex-row items-center justify-between">
        {viewMode === "results" ? (
          /* Back Button when viewing search results */
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={clearQuery}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200/60 mr-2"
          >
            <Image
              source={ICONS.arrowBack}
              className="w-5 h-5"
              style={{ tintColor: "#181C2E" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          /* Default Header Title (Image 1) */
          <View>
            <Text className="text-[11px] font-bold tracking-wider text-primary uppercase font-quicksand-bold">
              SEARCH
            </Text>
            <View className="flex-row items-center mt-0.5">
              <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold mr-1.5">
                Find your Favorite Food
              </Text>
              <Image
                source={ICONS.arrowDown}
                className="w-3.5 h-3.5"
                style={{ tintColor: "#181C2E" }}
                resizeMode="contain"
              />
            </View>
          </View>
        )}

        {/* Cart Icon Button with Paper Badge */}
        <View className="relative">
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-11 h-11 bg-dark-100 rounded-full items-center justify-center shadow-sm"
          >
            <Image
              source={ICONS.bag}
              className="w-5 h-5"
              style={{ tintColor: "#FFFFFF" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Badge
            size={20}
            className="absolute -top-1 -right-1 bg-primary text-white font-bold border-2 border-white"
            style={{ backgroundColor: "#FE8C00" }}
          >
            2
          </Badge>
        </View>
      </View>

      {/* React Native Paper Searchbar */}
      <View className="px-5 mb-4">
        <Searchbar
          placeholder="Search for any food or store..."
          onChangeText={(text) => {
            setQuery(text);
            if (text.length > 0) setViewMode("results");
          }}
          value={query}
          onClearIconPress={clearQuery}
          elevation={1}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 28,
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
          inputStyle={{
            fontFamily: "Quicksand-Regular",
            fontSize: 15,
            color: "#181C2E",
          }}
          iconColor="#878787"
        />
      </View>

      {/* Mode Switcher / Categories Filter */}
      {viewMode === "categories" ? (
        <CategoryChips
          categories={categoriesList}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
          }}
        />
      ) : (
        /* Image 2 Paper Filter Chips */
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 flex-row px-5"
          contentContainerStyle={{ paddingRight: 30 }}
        >
          <Chip
            compact
            className="mr-2"
            style={{ backgroundColor: "#FFFFFF", borderRadius: 20, borderColor: "#E5E7EB", borderWidth: 1 }}
            textStyle={{ color: "#181C2E", fontWeight: "700", fontFamily: "Quicksand-Bold", fontSize: 12 }}
          >
            ⚙ Filter
          </Chip>
          {["Lọc theo ▼", "Dưới 18.000đ", "Dưới 30.000đ", "Freeship"].map((f, i) => (
            <Chip
              key={i}
              compact
              className="mr-2"
              style={{ backgroundColor: "#FFFFFF", borderRadius: 20, borderColor: "#E5E7EB", borderWidth: 1 }}
              textStyle={{ color: "#4B5563", fontWeight: "600", fontFamily: "Quicksand-SemiBold", fontSize: 12 }}
            >
              {f}
            </Chip>
          ))}
        </ScrollView>
      )}

      {/* Main Content Scroll View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
      >
        {viewMode === "categories" ? (
          /* View Mode 1: 2-Column Food Grid (Image 1) */
          <View className="flex-row flex-wrap justify-between">
            {foods.map((food) => (
              <FoodGridCard
                key={food.id}
                item={food}
                onPress={() => Alert.alert("Food Details", food.name)}
                onAddToCart={() => handleAddToCart(food.name)}
              />
            ))}
          </View>
        ) : (
          /* View Mode 2: Store / Restaurant List (Image 2) */
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-bold text-gray-500 font-quicksand-bold">
                Hiển thị kết quả tìm kiếm trong{" "}
                <Text className="text-primary font-bold">Giao hàng ▼</Text>
              </Text>
            </View>

            {restaurants.length > 0 ? (
              restaurants.map((store) => (
                <RestaurantCard
                  key={store.id}
                  item={store}
                  onPress={() => handleSelectRestaurant(store.id)}
                />
              ))
            ) : (
              <View className="items-center justify-center py-10">
                <Text className="text-gray-400 font-quicksand text-base">
                  Không tìm thấy nhà hàng phù hợp
                </Text>
              </View>
            )}

            <TouchableOpacity className="py-3 items-center">
              <Text className="text-sm text-gray-400 font-bold font-quicksand-bold">
                Xem tất cả {restaurants.length * 3} quán
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
