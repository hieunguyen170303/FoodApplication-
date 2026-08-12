import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { HERO_PROMO } from "@/constants";

interface BannerCardProps {
  onPress?: () => void;
}

export const BannerCard: React.FC<BannerCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{ backgroundColor: HERO_PROMO.bgColor }}
      className="relative mx-5 rounded-[28px] overflow-hidden p-6 mb-4 flex-row items-center justify-between min-h-[170px]"
    >
      {/* Left Content */}
      <View className="z-10 flex-1 justify-center pr-2">
        <Text className="text-white font-extrabold text-[28px] leading-[32px] tracking-wide font-quicksand-bold uppercase">
          {"SUMMER\nCOMBO"}
        </Text>
        <Text className="text-white font-bold text-2xl mt-3 font-quicksand-bold">
          {HERO_PROMO.price}
        </Text>
      </View>

      {/* Right Image */}
      <View className="w-[165px] h-[155px] justify-center items-end">
        <Image
          source={HERO_PROMO.image}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};
