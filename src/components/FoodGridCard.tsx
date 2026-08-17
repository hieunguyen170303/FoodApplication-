import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GridFoodItem } from "@/types";

interface FoodGridCardProps {
  item: GridFoodItem;
  onPress?: () => void;
  onAddToCart?: () => void;
}

export const FoodGridCard: React.FC<FoodGridCardProps> = ({
  item,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-white p-3.5 rounded-[28px] mb-4 border border-gray-100 shadow-md shadow-orange-500/5 items-center relative overflow-hidden"
      style={{ width: "48%" }}
    >
      {/* Floating Image */}
      <View className="w-28 h-28 my-1 items-center justify-center relative">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text
        numberOfLines={1}
        className="text-sm font-extrabold text-dark-100 font-quicksand-bold text-center mt-1"
      >
        {item.name}
      </Text>

      {/* Price Pill */}
      <View className="bg-orange-50/80 border border-orange-200 px-3 py-1 rounded-full mt-1.5 mb-2">
        <Text className="text-xs font-extrabold text-primary font-quicksand-bold text-center">
          {item.startingPriceText}
        </Text>
      </View>

      {/* Floating (+) Add to Cart Pill Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onAddToCart}
        className="w-full bg-primary py-2 rounded-full items-center justify-center shadow-sm shadow-orange-500/30 flex-row space-x-1"
      >
        <Text className="text-white text-xs font-extrabold font-quicksand-bold">
          + Thêm vào giỏ
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
