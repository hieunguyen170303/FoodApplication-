import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ICONS } from "@/constants";

export interface CategoryCardData {
  id: string;
  title: string;
  bgColor: string;
  image: any;
  imagePosition?: "left" | "right";
}

interface CategoryCardProps {
  item: CategoryCardData;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  const isImageLeft = item.imagePosition === "left";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{ backgroundColor: item.bgColor }}
      className="relative mx-5 rounded-[28px] overflow-hidden px-6 py-5 mb-4 flex-row items-center justify-between min-h-[150px]"
    >
      {/* If Image is on Left */}
      {isImageLeft && (
        <View className="w-[150px] h-[130px] justify-center items-center -ml-2">
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      )}

      {/* Text & Button Container */}
      <View className={`flex-1 justify-center ${isImageLeft ? "items-start pl-4" : "items-start pr-4"}`}>
        <Text className="text-white font-extrabold text-2xl tracking-wide font-quicksand-bold uppercase mb-3">
          {item.title}
        </Text>
        <View className="border-2 border-white/90 rounded-full px-4 py-1 flex-row items-center justify-center bg-white/10">
          <Image
            source={ICONS.arrowRight}
            className="w-4 h-3.5"
            style={{ tintColor: "#FFFFFF" }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* If Image is on Right */}
      {!isImageLeft && (
        <View className="w-[155px] h-[135px] justify-center items-center -mr-2">
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
