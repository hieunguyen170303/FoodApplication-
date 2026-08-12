import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICONS, IMAGES } from "@/constants";

export default function CartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-3" edges={["top", "left", "right"]}>
      <Text className="text-2xl font-bold text-dark-100 font-quicksand-bold mb-4">
        Your Cart (2 items)
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Cart Item 1 */}
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4">
          <Image source={IMAGES.burgerOne} className="w-16 h-16 mr-3" resizeMode="contain" />
          <View className="flex-1">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">Summer Burger Combo</Text>
            <Text className="text-primary font-bold font-quicksand-bold mt-1">$10.88</Text>
          </View>
          <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-2 py-1">
            <TouchableOpacity className="p-1"><Image source={ICONS.minus} className="w-3.5 h-3.5" style={{ tintColor: "#181C2E" }} /></TouchableOpacity>
            <Text className="mx-2 font-bold font-quicksand-bold text-dark-100">1</Text>
            <TouchableOpacity className="p-1"><Image source={ICONS.plus} className="w-3.5 h-3.5" style={{ tintColor: "#181C2E" }} /></TouchableOpacity>
          </View>
        </View>

        {/* Cart Item 2 */}
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
          <Image source={IMAGES.burrito} className="w-16 h-16 mr-3" resizeMode="contain" />
          <View className="flex-1">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">Beef Loaded Burrito</Text>
            <Text className="text-primary font-bold font-quicksand-bold mt-1">$7.50</Text>
          </View>
          <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-2 py-1">
            <TouchableOpacity className="p-1"><Image source={ICONS.minus} className="w-3.5 h-3.5" style={{ tintColor: "#181C2E" }} /></TouchableOpacity>
            <Text className="mx-2 font-bold font-quicksand-bold text-dark-100">1</Text>
            <TouchableOpacity className="p-1"><Image source={ICONS.plus} className="w-3.5 h-3.5" style={{ tintColor: "#181C2E" }} /></TouchableOpacity>
          </View>
        </View>

        {/* Summary Card */}
        <View className="bg-dark-100 p-5 rounded-3xl mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400 font-quicksand">Subtotal</Text>
            <Text className="text-white font-bold font-quicksand-bold">$18.38</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400 font-quicksand">Delivery Fee</Text>
            <Text className="text-white font-bold font-quicksand-bold">$2.00</Text>
          </View>
          <View className="h-[1px] bg-gray-700 my-3" />
          <View className="flex-row justify-between">
            <Text className="text-white text-lg font-bold font-quicksand-bold">Total</Text>
            <Text className="text-primary text-xl font-bold font-quicksand-bold">$20.38</Text>
          </View>

          <TouchableOpacity className="bg-primary py-3.5 rounded-full items-center mt-5">
            <Text className="text-white text-base font-bold font-quicksand-bold">Checkout ($20.38)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
