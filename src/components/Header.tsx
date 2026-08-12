import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS, USER_LOCATION } from "@/constants";

interface HeaderProps {
  location?: string;
  cartCount?: number;
  onLocationPress?: () => void;
  onCartPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location = USER_LOCATION,
  cartCount = 2,
  onLocationPress,
  onCartPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
      {/* Location Section */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onLocationPress}
        className="flex-col"
      >
        <Text className="text-[11px] font-bold tracking-wider text-primary uppercase font-quicksand-bold">
          DELIVER TO
        </Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-base font-bold text-dark-100 font-quicksand-bold mr-1.5">
            {location}
          </Text>
          <Image
            source={ICONS.arrowDown}
            className="w-3.5 h-3.5 tint-dark-100"
            style={{ tintColor: "#181C2E" }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* Cart Button with Badge */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onCartPress}
        className="relative w-11 h-11 bg-dark-100 rounded-full items-center justify-center shadow-sm"
      >
        <Image
          source={ICONS.bag}
          className="w-5 h-5"
          style={{ tintColor: "#FFFFFF" }}
          resizeMode="contain"
        />
        {cartCount > 0 && (
          <View className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full items-center justify-center border-2 border-white">
            <Text className="text-[10px] font-bold text-white font-quicksand-bold">
              {cartCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
