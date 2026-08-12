import React from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICONS, IMAGES } from "@/constants";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-3" edges={["top", "left", "right"]}>
      <Text className="text-2xl font-bold text-dark-100 font-quicksand-bold mb-4">
        Search Foods
      </Text>

      {/* Search Input */}
      <View className="flex-row items-center bg-gray-100/15 rounded-2xl px-4 py-3 border border-gray-200/50 mb-6">
        <Image source={ICONS.search} className="w-5 h-5 mr-3" style={{ tintColor: "#878787" }} resizeMode="contain" />
        <TextInput
          placeholder="Search burger, pizza, burrito..."
          placeholderTextColor="#878787"
          className="flex-1 text-base font-quicksand text-dark-100 p-0"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <Text className="text-lg font-bold text-dark-100 font-quicksand-bold mb-3">Popular Searches</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {["Cheeseburger", "Pepperoni Pizza", "Beef Burrito", "Fries", "Crispy Chicken"].map((tag, idx) => (
            <View key={idx} className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Text className="text-primary font-bold font-quicksand-bold text-sm">{tag}</Text>
            </View>
          ))}
        </View>

        <Text className="text-lg font-bold text-dark-100 font-quicksand-bold mb-3">Recommended for You</Text>
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-3">
          <Image source={IMAGES.burgerOne} className="w-16 h-16 mr-4" resizeMode="contain" />
          <View className="flex-1">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">Double Beef Burger</Text>
            <Text className="text-sm text-gray-100 font-quicksand">Juicy beef patty with extra cheese</Text>
            <Text className="text-primary font-bold font-quicksand-bold mt-1">$8.99</Text>
          </View>
        </View>
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <Image source={IMAGES.pizzaOne} className="w-16 h-16 mr-4" resizeMode="contain" />
          <View className="flex-1">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">Supreme Feast Pizza</Text>
            <Text className="text-sm text-gray-100 font-quicksand">Loaded with toppings & mozzarella</Text>
            <Text className="text-primary font-bold font-quicksand-bold mt-1">$12.50</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
